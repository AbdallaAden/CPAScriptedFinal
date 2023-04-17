import "./post.css"
import { MoreVert } from "@material-ui/icons"
//import {Users} from "../../dummyData"//
import { useEffect, useState } from "react"
import axios from "axios";
import {format} from "timeago.js"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function Post({post}) {
    //const [like, setLike] = useState(post.like);//
    const [like, setLike] = useState(post.likes.length); //here is new for 0402 !!!!!
    const [islike, setIsLike] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
     const {user:currentUser} = useContext(AuthContext); //here is new for 0402 !!!!!

      useEffect(() =>{                                     //here is new for 0402 !!!!!
          setIsLike(post.likes.includes(currentUser._id))     //here is new for 0402 !!!!!
      },[currentUser._id, post.likes]);                          //here is new for 0402 !!!!!
    //✔console.log("the postuid from post page: " + post.userId);
   useEffect(() =>{
     const fetchUser = async () => {
     const res = await axios.get(`/users?userId=${post.userId}`);
     setUser(res.data);
     } 
     fetchUser();
   }, [post.userId])
   //✔console.log("the username from post page: " + user.username);
    const likeHandler = ()=>{
        try{
            axios.put("/posts/"+post._id+"/like", {userId: currentUser._id})    ////here is new for 0402 !!!!!
        }catch(err){}
        setLike(islike ? like - 1 : like + 1);
        setIsLike(!islike)
    }
    const deleteHandler = async (e)=>{
        e.preventDefault()
        try{
            console.log("PPPPPPOST the user id is : " + currentUser._id)
            console.log("PPPPPPPPPPPPOST thie post userid is :" + post.userId)
            if(currentUser._id === post.userId)
            {
                await axios.delete("/posts/" + post._id)
                document.location.reload();
            }
            else{
                alert("Your can not delete that post no belong to you!")
            }

            //document.location.reload();
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {/* <img className="postProfileImg" src={Users.filter(u=>u.id===post.userId)[0].profilePicture} alt="" /> */}
                        <img className="postProfileImg" src={user.profilePicture ? PF+user.profilePicture : "/assets/person/1.jpg"} alt="" />
                        <span className="postUsername">
                            {/* {Users.filter(u=>u.id===post.userId)[0].username} */}
                            <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                     {user.username}</Link>
                        </span>
                        {/* <span className="postDate">{post.date}</span> */}
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                <Link className ="linkContainer" to={`/posts/${post._id}`}><span className="postText">{post?.title}</span></Link>
                    {/* <img className="postImg" src={PF + post.photo} alt="" /> */}
                    <img className="postImg" src={PF  + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.jpg`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} person like it</span>
                    </div>
                    <div className="deleteBottom">
                        <button onClick={deleteHandler}>Delete</button>
                    </div>
                    <div className="postBottomRight">
                        <Link to={`/posts/${post._id}`} className="postCommentText">{post.comment} comments</Link>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}
