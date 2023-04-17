import Forgot from "./pages/Forgot/Forgot";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Messenger from "./pages/messenger/Messenger"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import Course from "./pages/coursePage/CoursePage";
import Testpage from "./pages/testPage/Testpage";
import SinglePost from "./pages/singlePost/singlePost"

function App() {
  const {user} = useContext(AuthContext);
  return (

       <Router>
        <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/register">
          {<Register />}
        </Route>
        <Route path="/messenger">
        {!user ? <Redirect to="/login" /> : <Messenger />}
        </Route>
          <Route path="/forgot">
            <Forgot />
          </Route>
          <Route path="/profile/:username">
            
            {user ? <Profile /> : <Login />}
          </Route>
          <Route path="/coursepage">
            <Course />
          </Route>
          <Route path="/posts/:id">
            <SinglePost/>
          </Route>
          <Route path="/testpage/:key">
            <Testpage />
          </Route>
        </Switch>
       </Router>
    
  );
}

export default App;
