import { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch} = useContext(AuthContext);
    // const authCtx = useContext(AuthContext);
    const handleClick = (e)=>{
        e.preventDefault();
        console.log(email.current.value, "THIS IS THE VALUE");
        loginCall({email:email.current.value, password:password.current.value}, dispatch);
    };
    console.log(user, "THIS IS THE USER");

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">CPA SCRIPTED</h3>
                <span className="loginDesc">Login</span>
                {/* <button onClick={authCtx.onLogout}>Logout</button> */}
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" required className="loginInput" ref={email}/>
                    <input placeholder="Password" required minLength="6" className="loginInput" ref={password}/>
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress size="20px"/> : "Log In"}</button>
                    
                    <button className="loginForgot">Forgot Password</button>
                    <Link to="/register" style={{textDecoration:"none"}}>
                    <button className="loginRegisterButton">{isFetching ? <CircularProgress size="20px"/> : "Create a new Account"}</button>
                    </Link>
                    
                </form>
            </div>
        </div>
    </div>
  )
}
