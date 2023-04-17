import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/message"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { useContext, useState, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useEffect } from "react"
import axios from "axios"
import {io} from "socket.io-client"

export default function Messenger() {
  const[conversations, setConversations] = useState([]);
  const[currentChat, setcurrentChat] = useState([]);
  const[messages, setmessages] = useState([]);
  const[newMessages, setNewMessages] = useState("");
  const[arrivalMessages, setArrivalMessages] = useState(null);
  const[onlineUsers, setonlineUser] = useState([]);
  const{user} = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef()

  useEffect(()=>{
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) =>{
      setArrivalMessages({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now(),
      })
    })
  },[])

  useEffect(()=>{
    arrivalMessages&&currentChat?.members.includes(arrivalMessages.sender)&&setmessages((prev)=>[...prev,arrivalMessages])
  },[arrivalMessages, currentChat])

  useEffect(()=>{
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users)=>{
      setonlineUser(user.followings.filter(f=>users.some(u=>u.userId === f)));
    })
  },[user])


  useEffect(()=>{
    const getConversations = async() =>{
      try{
        const res = await axios.get("conversation/" + user._id) // :
        setConversations(res.data);
      }
      catch(err){
        console.log(err)
      }
    };
    getConversations();
  },[user])
  console.log(currentChat);

//   router.get("/:userId", async(req, res)=>{
//     try{
//         const conversation = await Conversation.find({
//             members:{$in:[req.params.userId]},
//         })
//         res.status(200).json(conversation);
//     }catch(err){
//         res.status(500).json(err);
//     }
// })

  useEffect(()=>{
    const getMessages = async() =>{
      try{
        const res = await axios.get("/message/"+currentChat?._id) // :
        setmessages(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    getMessages()
  }, [currentChat]);
  
//   router.get("/:conversationId", async (req, res)=>{
//     try{
//         const messages = await Message.find({
//             conversationId:req.params.conversationId,
//         })
//         res.status(200).json(messages)
//     }catch(err){
//         res.status(500).json(err);
//     }
// })


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const message = {
      sender:user._id,
      text: newMessages,
      conversationId : currentChat._id
    }

    const receiverId = currentChat.members.find(member=>member !==user._id)
    socket.current.emit("sendMessage", {
      senderId:user._id,
      receiverId,
      text: newMessages
    })
    try{
      const res = await axios.post("/message", message);  // :
      setmessages([...messages, res.data]);
      setNewMessages("")
    }catch(err){
      console.log(err);
    }
  }

//   router.post("/", async(req, res)=>{
//     const newMessage = new Message(req.body);
//     try{
//         const savedMessage = await newMessage.save()
//         res.status(200).json(savedMessage);
//     }catch(err){
//         res.status(500).json(err);
//     }
// })

  useEffect(()=>{
    socket.current.on("getMessage", data =>{

    })
  }, [])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  console.log("messages in messsenger!!! : " + user._id)
  return (
    <>    <Topbar/>
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput"/>
            {conversations.map((c)=>(
              <div onClick={()=>setcurrentChat(c)}>
                <Conversation conversation = {c} currentUser={user}/>
                </div>
            ))}
            
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {
            currentChat ? (
           <>
            <div className="chatBoxTop">
                {messages.map((m)=>(
                  <div ref={scrollRef}>
                  <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatMessageInput" onChange={(e)=>setNewMessages(e.target.value)} value={newMessages} placeholder="witer soth"></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>send</button>
            </div></> ): (<span className="noConversationText">open  to stact a chat</span>)}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setcurrentChat={setcurrentChat}/>
        </div>
      </div>
    </div>
    </>

  )
}
