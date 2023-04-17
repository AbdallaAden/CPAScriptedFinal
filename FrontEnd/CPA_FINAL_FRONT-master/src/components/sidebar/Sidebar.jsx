import "./sidebar.css"
import {
    RssFeed,
    Chat,
    AccountBox,
    Group,
    Build,
    Book,
  } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData"
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import Online from "../online/Online"

export default function Sidebar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);


  
    // useEffect(() => {
    //     const getFriends = async () => {
    //       try {
    //         const friendList = await axios.get("/users/friends/" + user._id);
    //         setFriends(friendList.data);
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     };
    //     getFriends();
    //   }, [user]);
    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get(`http://localhost:8800/api/users/friends/${user._id}`);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, []);

      console.log("thisi the firend list on sibar" + friends)


    return(
        <div className="sidebar">
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                            <AccountBox className="sidebarIcon"/>
                                <span className="sidebarListItemText">Account Profile</span>
                        </Link>    
                        </li>
                        <li className="sidebarListItem">
                        <Link to={`/coursepage`} style={{textDecoration:"none"}}>
                            <Book className="sidebarIcon"/>
                                <span className="sidebarListItemText">Courses</span>
                        </Link>    

                        </li>
                        <li className="sidebarListItem">
                        <Link to="/messenger" style={{textDecoration:"none"}}>
                            <Chat className="sidebarIcon"/>
                                <span className="sidebarListItemText">Chat</span>
                        </Link>    
                        </li>                  
                    </ul>

                    <hr className="sidebarHr"/>
                    <h4 className="sidebarTitle">FRIENDS LISTS</h4>
                    <ul className="sidebarFriendList">
                    <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "like.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>

                    </ul>
                </div>
            </div>
        </div>
    )
}