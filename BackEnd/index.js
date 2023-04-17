const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const caRoute = require("./routes/ca")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const courseRoute = require("./routes/course")
const multer = require("multer");
const path = require("path");
const router = express.Router();
const cors = require('cors')
const commentsRoute = require("./routes/comment")

dotenv.config();

const url = process.env.MONGO_URL;
async function connect(){
    try{
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected");
    }
    catch(error){
        console.error(error);
    }
}

connect();
app.use("/images/person", express.static(path.join(__dirname, "public/images/person")));
app.use(cors()) 
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
// try asset http://localhost:8800/images/person/like.png
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/ca", caRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/message", messageRoute)
app.use("/api/courses", courseRoute)
app.use("/api/comments", commentsRoute)

app.listen(8800,()=>{
    console.log("backend server is yes running")
});