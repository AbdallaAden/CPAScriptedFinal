import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import { Class } from "@material-ui/icons"
import { useEffect, useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ currentCaName, setcurrentCa}) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [courses, setCourses] = useState([]);

  if(user){
    console.log("this is the user in rightbar" + user.Courses);
  }else{
    console.log("no user???????????");
  }

  useEffect(() => {
    const getCas = async () => {
      try {
        const courseList = await axios.get(`http://localhost:8800/api/users/cas/${user._id}`);
        setCourses(courseList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCas();
  }, [user]);

  const handleClick = async (course) => {
    try {
      const res = await axios.get(
        `/ca/${course._id}` // the get i need in backend router is:
      );
      setcurrentCa(res.data);

      console.log("CCCCCCCourse ID: " + res.data.CaName)
    } catch (err) {
      console.log(err);
    }
    console.log("get me the ressssssssspoond in right bar course select: " + course.CaName)
  };

  const ProfileRightbar = () =>{
    return(
      <>

      <h4 className="rightbarTitle">SUB COURSES</h4>
      <div className="rightbarCourses">
        {courses.map((course) =>(
          <div key={course._id} className="rightbarCourse" onClick={() => handleClick(course)}>
            <Class className="rightbarCourseImg"/>
            <span className="rightbarCourseName">{course.CaName}</span>
          </div>
        ))}

      </div>
      </>
    )
  }
  
  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
          <ProfileRightbar />
        </div>
    </div>
  )
}
