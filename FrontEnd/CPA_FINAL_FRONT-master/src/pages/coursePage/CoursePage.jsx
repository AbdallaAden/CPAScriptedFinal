import { useEffect, useState,useContext } from "react";
import axios from "axios";
import "./CoursePage.css";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar"

export default function CoursePage() {     // all page
  const {user} = useContext(AuthContext);
  const [semesterOneCourses, setSemesterOneCourses] = useState([]);
  const [semesterTwoCourses, setSemesterTwoCourses] = useState([]);
  const [semesterThreeCourses, setSemesterThreeCourses] = useState([]);
  const [semesterFourCourses, setSemesterFourCourses] = useState([]);
  const [semesterFiveCourses, setSemesterFiveCourses] = useState([]);
  const [semesterSixCourses, setSemesterSixCourses] = useState([]);
  const [semesterSevenCourses, setSemesterSevenCourses] = useState([]);
  var subUser;
  const [allcourse, setAllcourse] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [userCa, setuserCa] = useState([]);
  console.log(user._id, ' current user ID')
  

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("http://localhost:8800/api/ca");
      setAllcourse(res.data);
      console.log(res);
      // const courses = Object.keys(res.data).map(function (key) {
      //   return res.data[key];
      // });
      //console.log(courses[1][1].semesterId)

      // Filter courses by semesterId

      //const semesterOne = (courses[1]).filter(course => { return course.semesterId === 1});
      const semesterOne = allcourse.filter(
        (course) => course.semesterId === 1
      );
      const semesterTwo = allcourse.filter(
        (course) => course.semesterId === 2
      );
      const semesterThree = allcourse.filter(
        (course) => course.semesterId === 3
      );
      const semesterFour = allcourse.filter(
        (course) => course.semesterId === 4
      );
      const semesterFive = allcourse.filter(
        (course) => course.semesterId === 5
      );
      const semesterSix = allcourse.filter(
        (course) => course.semesterId === 6
      );
      const semesterSeven = allcourse.filter(
        (course) => course.semesterId === 7
      );

      setSemesterOneCourses(semesterOne);
      setSemesterTwoCourses(semesterTwo);
      setSemesterThreeCourses(semesterThree);
      setSemesterFourCourses(semesterFour);
      setSemesterFiveCourses(semesterFive);
      setSemesterSixCourses(semesterSix);
      setSemesterSevenCourses(semesterSeven);
    };

    fetchCourses();
    //window.subbedUser= getUser();
  }, []);
   


  const handleCheckboxChange = (event) => {
    const courseId = event.target.value;
    console.log("the course ID :" + courseId)
    if (event.target.checked) {
      setSelectedCourses(courseId);
    } else {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    }
  };

  const handleSubscribeClick = async () => {
    console.log("the user ID in CPPPPPPPPPPPPPPP: " + user._id);
    console.log("the user ID in handleSubscribeClick in CoursePage: " + selectedCourses);
    // Make API call to add selected courses to user
    // const ABC = await axios.get("/users/cas/" + user._id)
    // setuserCa(ABC.data)
    // if(userCa.map((ca)=>(
    //   ca._id === (selectedCourses)
    // ))){
    //   alert("repppppppppppppppppppp")
    //   setSelectedCourses([]);
    // }
    // // if(userCa.includes(selectedCourses)){
    // //   alert("repppppppppppppppppppp")
    // // }
    // else{
      try {      

        const res = await axios.put(`http://localhost:8800/api/users/` + user._id + "/sub", {
          _id: selectedCourses,
          user:user,
        });
        console.log("nbnbnbnbnbnbnbn: " + selectedCourses.CaName);
        subUser = res.data.user;
        //console.log(subUser)
        setSelectedCourses([]);
        alert("Courses subscribed successfully!");
      } catch (err) {
        console.log(err);
        alert("you have selected this course");
      }
    }
   

    const handleunSubscribeClick = async () => {
      console.log("the user ID in PPPPPPPPPC: " + user._id);
      console.log("the user ID in PPAAAAAAAAAA: " + selectedCourses);

        try {      
  
          const res = await axios.put("http://localhost:8800/api/users/" + user._id + "/unsub", {
            _id: selectedCourses,
            user:user,
          });
          console.log("naddddddddddbnbn: " + selectedCourses.CaName);
          subUser = res.data.user;
          //console.log(subUser)
          setSelectedCourses([]);
          alert("Courses unsubscribed successfully!");
        } catch (err) {
          console.log(err);
          alert("you do not selected this course");
        }
      }

//  };
  //console.log(semesterOneCourses + ' Semester one courses')
  const semesters = [
    { title: "Semester 1", courses: allcourse.filter(
      (course) => course.semesterId === 1
    ) },
    { title: "Semester 2", courses: allcourse.filter(
      (course) => course.semesterId === 2
    ) },
    { title: "Semester 3", courses: allcourse.filter(
      (course) => course.semesterId === 3
    ) },
    { title: "Semester 4", courses: allcourse.filter(
      (course) => course.semesterId === 4
    ) },
    { title: "Semester 5", courses: allcourse.filter(
      (course) => course.semesterId === 5
    ) },
    { title: "Semester 6", courses: allcourse.filter(
      (course) => course.semesterId === 6
    ) },
    { title: "Pro Options", courses: allcourse.filter(
      (course) => course.semesterId === 7
    ) }
  ];
  return (
    
      <>           
      <Topbar/>
    {semesters.map((semester) => (      
      <div key={semester.title} className="semester-container">
        <div className="semester">
          <span className="Title">{semester.title}</span>
          <div className="select-all">
            <label>
              {/* <input
                type="checkbox"
                checked={
                  selectedCourses.length === semester.courses.length &&
                  semester.courses.length !== 0
                }
                onChange={(event) => {
                  if (event.target.checked) {
                    setSelectedCourses([
                      ...selectedCourses,
                      ...semester.courses.map((c) => c._id)
                    ]);
                  } else {
                    setSelectedCourses(
                      selectedCourses.filter(
                        (id) => !semester.courses.map((c) => c._id).includes(id)
                      )
                    );
                  }
                }}
              /> */}
              {/* <p className="SelectAll">Select all</p> */}
            </label>
          </div>
          {semester.courses.map((course) => (
            <div key={course.CaName} className="course-container">
              <div className="course">
                <div className="course-info">
                  <div className="course-name">{course.CaName}</div>
                  <div className="course-code">{course.CaDesc}</div>
                </div>
                <label className="course-select">
                  <input
                    type="checkbox"
                    value={course._id}
                    checked={selectedCourses.includes(course._id)}
                    onChange={handleCheckboxChange}
                  />
                  Select
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
   <button className="sub-button" onClick={handleSubscribeClick}
   >
            Subscribe to selected courses
          </button>
          <button className="unsub-button" onClick={handleunSubscribeClick}
   >
            unSubscribe to selected courses
          </button>

      </>    
  );
}
