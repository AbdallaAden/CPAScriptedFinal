import "./register.css"
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();
  
    const handleClick = async (e) => {
      e.preventDefault();
      if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Passwords don't match!");
      } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        try {
          await axios.post("/auth/register", user);//may need to rewrite the path??
          //await axios.post("/controllers/registerController", user);
          history.push("/login");
        } catch (err) {
          console.log(err);
        }
      }
    };
  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">CPA SCRIPTED</h3>
                <span className="registerDesc">Register</span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                <input placeholder="UserName" required ref={username} className="registerInput" />
                    <input placeholder="Email" required type="email" ref={email}className="registerInput" />
                    <input placeholder="Password" required minLength="6" ref={password} className="registerInput" />
                    <input placeholder="Password Again" required minLength="6" ref={passwordAgain} className="registerInput" />
                    <button className="registerButton" type="submit">Sign Up</button>
                    <Link to="/login" style={{textDecoration:"none"}}>
                        <button className="loginRegisterButton">Log into account</button>
                    </Link>
                    
                </form>
            </div>
        </div>
    </div>
  )
}
