import "./homefeed.css"
import Share from "../share/Share"
import Post from "../post/Post"
//import {Posts} from "../../dummyData"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Bot from "../Bot/Bot";

export default function HomeFeed({ currentId, currentCa }) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  const [cas, setCas] = useState([]);

  console.log("give me some res from home feeeeeeeeeeeee: " + currentId)
  console.log("AAAAAAAAAA currentCaName in home FEE: " + currentCa.CaName)
  useEffect(() =>{
     const fetchPosts = async () => {
     const res = //username 
                 //? await axios.get("/posts/profile/" + username)
                 //:
                  await axios.get("http://localhost:8800/api/posts/switch/" + currentCa.CaName + "/" + currentId)
                  
                 setPosts(
                  res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                  })
                  
                );
     };
      fetchPosts();             ///////// commond here
    }, [currentId, currentCa]);  ///////// commond here
  //});
  console.log("homeFEEEEEEEEEE: " + currentCa._id)
  return (
    <div className="feed">
      
       <div className="feedWrapper">
          <h4>{currentCa.CaName}</h4>
          <Share currentCa={currentCa}/>
          {
            // currentCa? (
            //   <h4>${currentCa._id}</h4>

            // )
            // : (<span className="noConversationText">open  to stact a chat</span>)
           posts.map((p) => (//
           <Post key={p.id} post={p}/>//
          ))//

          }
          
          
        </div>
        <Bot/>
    </div>
  )
}
