import "./chatOnline.css"
import {useState, useEffect} from "react"
import axios from "axios"
export default function ChatOnline({onlineUsers, currentId, setcurrentChat}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([])
  const [onlinefriends, setOnlineFriends] = useState([])

  useEffect(()=>{
    const getFriends = async()=>{
      const res = await axios.get("/users/friends/"+currentId); // the get i need in backend router is:
      setFriends(res.data);
    }
    getFriends();
  },[currentId]);
  
  // router.get("/friends/:userId", async (req, res) => {
  //   try {
  //     const user = await User.findById(req.params.userId);
  //     const friends = await Promise.all(
  //       user.followings.map((friendId) => {
  //         return User.findById(friendId);
  //       })
  //     );
  //     let friendList = [];
  //     friends.map((friend) => {
  //       const { _id, username, profilePicture } = friend;
  //       friendList.push({ _id, username, profilePicture });
  //     });
  //     res.status(200).json(friendList)
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });


  useEffect(()=>{
    setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)))
  },[friends, onlineUsers])

  const handleClick = async (user) => {             // updated 0404
    try {
      const res = await axios.get(
        `/conversation/find/${currentId}/${user._id}` 
      );
      if(res.data != null){
        setcurrentChat(res.data);
      }
      else{
        await axios.post(
          `/conversation/`, {
            senderId : currentId,
            receiverId :  user._id
          }
        )
        const testres = await axios.get(
          `/conversation/find/${currentId}/${user._id}` 
        );
        setcurrentChat(testres.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

//   router.get("/find/:firstUserId/:secondUserId", async (req, res)=>{
//     try{
//         const conversation = await Conversation.findOne({
//             members:{$all:[req.params.firstUserId, req.params.secondUserId]},
//         })
//         res.status(200).json(conversation);
//     }catch(err){
//         res.status(500).json(err);
//     }
// })


  console.log("this is chat online frin" + friends);
  return (
    <div className="chatOnline">
      {onlinefriends.map((o)=>(
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
        <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={o?.profilePicture?PF+o.profilePicture : PF+"heart.png"} alt="" />
            <div className="chatOnlineBadge">

            </div>
        </div>
        <span className="chatOnlineName">{o.username}</span>
    </div>
      ))}

      
    </div>
  )
}
