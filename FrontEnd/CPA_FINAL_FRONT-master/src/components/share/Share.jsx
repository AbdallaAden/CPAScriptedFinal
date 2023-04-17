import "./share.css"
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";

export default function Share({ currentCa }) {

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const title = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e)=>{
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      course: currentCa.CaName,
      title:title.current.value
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);

      newPost.img = fileName;
      console.log("AAAAAAAAAAA new post from share" + newPost);
      try{
        await axios.post("/api/upload", data);
      }catch(err){
        console.log(err);
      }
    }
    try{
      await axios.post("/posts", newPost); // may use multer to allow upload picture in frontEnd
      document.location.reload();
    }catch(err){

    }
  }

  return (
    // <div className="share">
    //   <div className="shareWrapper">
    //     <div className="shareTop">
    //         <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : "/assets/person/1.jpg"} alt=""/>
    //         {/* <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePircture : PF+"person/1.jpg"} alt=""/> */}
    //         <input placeholder="waht is your input" className="shareInput" ref={desc}/>
            
    //     </div>
    //     <hr className="shareHr"/>
    //     {file && (
    //       <div className="shareImgContainer">
    //         <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
    //         <Cancel className="shareCancelImg" onClick={()=>setFile(null)} />
    //       </div>
    //     )}
    //     <form className="shareBottom" onSubmit={submitHandler}>
    //         <div className="shareOptions">
    //             <label htmlFor="file" className="shareOption">
    //                 <PermMedia htmlColor="tomato" className="shareIcon"/>
    //                 <span className="shareOptionText">Upload Photo</span>
    //                 <input style={{display: "none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
    //             </label>
    //             <div className="shareOption">
    //                 <Label htmlColor="blue" className="shareIcon"/>
    //                 <span className="shareOptionText">Tag</span>
    //             </div>
    //             <div className="shareOption">
    //                 <Room htmlColor="green" className="shareIcon"/>
    //                 <span className="shareOptionText">Location</span>
    //             </div>
    //             <div className="shareOption">
    //                 <EmojiEmotions htmlColor="yellow" className="shareIcon"/>
    //                 <span className="shareOptionText">Feeling</span>
    //             </div>
    //         </div>
    //         <button className="shareButton" type="submit">Share</button>
    //     </form>
    //   </div>
    // </div>
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="require">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              ref={title}
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="description">Content</label>
            <textarea
              rows="5"
              className="form-control"
              name="description"
              ref={desc}
            ></textarea>
          </div>
 
          <form className="shareBottom" onSubmit={submitHandler}>
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
