import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import HomeFeed from "../../components/homeFeed/HomeFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
export default function Home(){
    const { user } = useContext(AuthContext);
    const [currentCa, setcurrentCa] = useState([]);
    return(
        <>

        <Topbar/>
        <div className="homeContainer">
            <Sidebar/>
            <Rightbar setcurrentCa={setcurrentCa}/>
            <HomeFeed currentId={user._id} currentCa={currentCa}/>
            
        </div>
        
        </>
        
        
    );
}