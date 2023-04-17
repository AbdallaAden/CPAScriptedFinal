import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
//import {Posts} from "../../dummyData"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";  ///

export default function Feed({ username, user }) {
  const [posts, setPosts] = useState([]);
  // const {user} = useContext(AuthContext);
  const [cas, setCas] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [following, setFollowing] = useState([]);
  if(following.includes(user?._id)){
    console.log("dyesssss include");
  }
  else{
    console.log("not include")
  }
  
  const [followed, setFollowed] = useState([]);
  // useEffect(() =>{
  //   const getFollow = async () => {
  //     try {
  //       const friendList = await axios.get("/users/Following/" + currentUser._id);
  //       setFollowing(friendList.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFollow();
  //  }, [currentUser]);  ///////// commond here
     const res = following.includes(user?._id)
  useEffect(() =>{

    const getFollow = async () => {// updated 0412
      try {
        const friendList = await axios.get("/users/Following/" + currentUser._id);
        setFollowing(friendList.data);
      } catch (err) {
        console.log(following.includes(user?._id));
      }
    };
    getFollow();// updated 0412
    setFollowed(res)

      ///////// commond here
   }, [currentUser._id, user?._id]);  ///////// commond here
  
    console.log("zzzzzzzzzzzzzzz: " + following)
    console.log("--------mmmmmmmm: " + currentUser.followers)
    console.log("FFFFFED PAGE current ID: " + currentUser._id)
    console.log("FFFFFFFFFED PAGE user ID: " + user._id)
    console.log("FFFFFFFFFED fffffolw true: " + following.includes(user?._id))
    console.log("AAAdddddddddddddD fffffolw true: " + followed)
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        console.log("````````````DDDDDDDDDD```````````` fffffolw ? : " + currentUser.followings.includes(user?._id))
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(following.includes(user?._id))// updated 0412
      setFollowed(!followed);
      
      //document.location.reload();
    } catch (err) {
    }
  };      

  useEffect(() =>{
     const fetchPosts = async () => {
     const res = //username 
                 //?
                  await axios.get("/posts/profile/" + user.username)
                 //: await axios.get("/posts/" + cas.CaName + "/" + user._id)
                  
                 setPosts(
                  res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                  })
                );
     };
      fetchPosts();             ///////// commond here
    }, [user, user._id]);  ///////// commond here
  //});
  return (
    <>
            {user.username !== currentUser.username &&(
              <div className="rightbarFD">
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
          </div>
        )}
   

    <div className="feed">
      
       <div className="feedWrapper">
          {/* <Share/> */}
          {
           //Posts.map((p) => (//
           // <Post key={p.id} post={p}/>//
          // ))//
             posts.map((p) => (
             <Post key={p._id} post={p}/>
           ))

          }
          
          
        </div>
    </div>
    </>
  )
}
