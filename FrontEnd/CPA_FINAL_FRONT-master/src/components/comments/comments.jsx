import '../comments/comments.css'
import { useState, useEffect } from "react";
import axios from "axios";
export default function Comments(props){
    console.log(props.comments, ' props in comments page')

    const comIds = props.comments[1]
    const [comments, setComments] = useState([]);
    console.log("CCCCCCCCCCCOM ID: " + comIds)
    useEffect(() => {
      const fetchComments = async () => {
        const promises = comIds?.map((id) => axios.get(`http://localhost:8800/api/comments/${id}`));
        const response = await Promise.all(promises);
        const data = response.map((res) => res.data);
        setComments(data);
      };
      fetchComments();
    }, []);
    console.log(comments, ' comments in comment page')
    const styles= {
        color: 'red',
    };
    return (
      <div>
        {comments?.map((comment) => (
          <div key={comment._id} className="feedWrapper">
            <article>{comment.desc}<span style={styles} className='commentUsername'> by:{comment.username}</span></article>
          </div>
        ))}
      </div>
    );
}