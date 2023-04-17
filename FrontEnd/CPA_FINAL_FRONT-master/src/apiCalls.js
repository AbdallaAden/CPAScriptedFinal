import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`http://localhost:8800/api/auth/login`, userCredential);//may need to rewrite the path??
    //const res = await axios.post("/controllers/loginController", userCredential);
    console.log(res)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    alert(JSON.stringify(err.response.data.message).replace(/^["'](.+(?=["']$))["']$/, '$1'))
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};





//https://aichatbot6.azurewebsites.net/predict/



