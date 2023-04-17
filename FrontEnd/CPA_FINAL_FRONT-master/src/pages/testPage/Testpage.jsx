import "./testpage.css"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";

export default function Testpage({partial}) {
    const { user } = useContext(AuthContext);
    const [keyword, setKeyword] = useState([]);
    const partial1 = "AA"
    useEffect(() => {
        const getkey = async () => {
            try {
                const urList = await axios.get(
                  `/users/search/` + partial1
                  )
                  setKeyword(urList.data)
                  console.log("UUUUUUUUUser in testpage: " + urList);
            } catch (err) {
              console.log(err);
            }
          };
          getkey();
      }, []);

    return(
        <>
        <h4>test page test</h4>
        {keyword.map((ac)=>(
                  <span className="ac">{ac.username}</span>
        ))}
        </>
        
    )
}