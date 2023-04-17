import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Comments from "../../components/comments/comments";
import Topbar from "../../components/topbar/Topbar"
export default function SinglePost(props) {
  const { id } = useParams();
  const [post, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/${id}`);
      setPosts(res.data);
    };
    fetchPosts(); ///////// commond here
  }, [id]); ///////// commond here
  console.log(post, ' post console log');
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`http://localhost:8800/api/comments?postId=${id}`);
      setComments(res.data);
    };
    fetchComments();
  }, [id]);
  console.log(comments, ' comments console log');

  const postComments = comments
  console.log(postComments , 'post comments log')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/api/comments', {
        postId: id,
        desc: comment,
        username: user.username
      });
      setComment('');
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Topbar />
      <h1 className="post-title">{post.title}</h1>
      <p className="post-description">{post.desc}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Leave a comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
      {(Object.entries(postComments)).map((comment,i) => ( 
        <div key={i}>
          <p><Comments comments={comment}/></p>
        </div>
        ))}
    </>
  );
}