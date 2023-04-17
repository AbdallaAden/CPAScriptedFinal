import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import "./conversation.css"

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId = conversation.members.find((m)=> m!==currentUser._id)

    const getUser = async()=>{
      try{
        const res = await axios(`http://localhost:8800/api/users?userId=${friendId}`); // the user function need in backend get user by id
        setUser(res.data);
 
      }
      catch(err){
        console.log(err);
      }
    }
    getUser()
  },[currentUser, conversation])

  // router.get("/", async (req, res) => {
  //   const userId = req.query.userId;
  //   const username = req.query.username;
  //   try {
  //     const user = userId
  //       ? await User.findById(userId)
  //       : await User.findOne({ username: username });
  //     const { password, updatedAt, ...other } = user._doc;
  //     res.status(200).json(other);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

  return (
    <div className="conversation">
        <img className="conversationImg" src={user?.profilePicture
                ? PF + user?.profilePicture
                : "/assets/person/heart.jpg"} alt="" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}
