import "./topbar.css"
import { Search } from "@material-ui/icons"
import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
import { Person, Chat, Notifications } from "@material-ui/icons"
import axios from "axios"
// <img src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png"} ...
//<Link to={`/profile/${user.username}`}>
//<img src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
//</Link>
export default function Topbar({partial}){
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const authCtx = useContext(AuthContext);
    const keyword = useRef();
    const [key, setKeyword] = useState([]);
    console.log("the uid from top page: " + user._id);
    if(user.profilePicture){
        console.log(user.profilePicture)
    }
    else{
        console.log("nnnnnnnn pic")
    }

    const handleClick = async (e)=>{
        e.preventDefault();
        console.log(keyword.current.value, "THIS IS THE VALUE");
        try {
            const urList = await axios.get(
              `/users/search/` + keyword.current.value
              )
              setKeyword(urList.data)
              console.log("UUUUUUUUUser in testpage: " + urList);
        } catch (err) {
          console.log(err);
        }
    };

    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
    { 
        //        keyword ? (   <>         {key.map((ac)=>(
        //           <span className="ac">{ac.username}</span>
        // ))}</>  ):
              (  <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">CPA Scripted</span>
                </Link>)
                }
            </div>
            <div className="topbarCenter">
                <div className="searchbar" onClick={handleClick}>
                    <Search className="searchIcon"/>
                    <input placeholder="Search for anything" type="search" className="searchInput" ref={keyword}/>
                    
                    {/* <button className="searchButton" >search</button> */}
                    
                </div>
            </div>

            <div className="topbarRight">
                <div className="topbarLines">
                    <span className="topbarLink" onClick={authCtx.logout}>logout</span>
                    
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                    <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                        <Person/>
                        {/* <span className="topbarIconBadge">1</span> */}
                    </Link>
                    </div>
                    <div className="topbarIconItem">
                    <Link to="/messenger" style={{textDecoration:"none"}}>
                        <Chat/>
                        {/* <span className="topbarIconBadge">1</span> */}
                    </Link>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                </div>
                
                    {/* <img src="/assets/person/2.jpg" alt="" className="topbarImg" /> */}
                    <Link to={`/profile/${user.username}`}>
                    <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : "/assets/person/heart.jpg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
                
            </div>
        </div>
    )
}