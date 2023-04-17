const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcrypt")
const Ca = require("../models/Ca")

//update
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt .hash(req.body.password, salt);

            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("account updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("Your account has been updated")
    }
})


//delete user
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){

        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("acc deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("you can delete only your acc")
    }
})
//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get course
router.get("/CoursesFollows/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      let CourseList = [];
      const Courses = await Promise.all(
        user.CoursesFollows.map((coursename) => {
            CourseList.push(coursename);
        })
      );
      

      res.status(200).json(CourseList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get friends ----------------------------------------------------------------
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      //console.log(user, ' user in getFriends request')
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      console.log(friendList, ' friendList in getFriends request')
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json({
        message:err
      });
    }
  });

//follow a user

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        console.log("---------abc body userID : " + req.body.userId)
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });
  
  //unfollow a user
  
  router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });
  

// follow a course -------------------------------------------------------------------------------------------------
router.put("/:id/sub", async (req,res)=>{
    //if(req.body.userId !== req.params.id){  //used to check this user is yourself or not
        try{
            const user = await User.findById(req.params.id);
            const currentCourse = await Ca.findById(req.body._id);
            if(!user.Courses.includes(req.body._id)){
                await user.updateOne({$push:{Courses:req.body._id}});
                await currentCourse.updateOne({$push:{Suber:req.params.id}});
                res.status(200).json("user followed")
            }else{
                res.status(403).json("already foloow")
            }
        }catch(err){
            res.status(500).json(err);
        }
    //}else{
    //    res.status(403).json("can not follow")
    //}
})

//unfollow a course
router.put("/:id/unsub", async (req,res)=>{
    //if(req.body.userId !== req.params.id){  //used to check this user is yourself or not
        try{
            const user = await User.findById(req.params.id);
            const currentCourse = await Ca.findById(req.body._id);
            if(user.Courses.includes(req.body._id)){
                await user.updateOne({$pull:{Courses:req.body._id}});
                await currentCourse.updateOne({$pull:{Suber:req.params.id}});
                res.status(200).json("user unfollowed")
            }else{
                res.status(403).json("already unfoloow")
            }
        }catch(err){
            res.status(500).json(err);
        }
    //}else{
    //    res.status(403).json("can not unfollow")
    //}
})

//get all course
router.get("/cas/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    //console.log(user, ' user sent')
    const cas = await Promise.all(
      user.Courses.map((CaId) => {
        return Ca.findById(CaId);
      })
    );
    let courseList = [];
   
    cas.map((course) => {
      const { _id, CaName, CaDesc } = course;
      courseList.push({ _id, CaName, CaDesc });
    });
     console.log(courseList, ' courseList')
    res.status(200).json(courseList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//search user from DB
router.get("/search/:partial", async(req, res)=>{
  const part = req.params.partial
  try{
    const ur = await User.find();
    const ur1 = ur.filter((f)=>f.username.includes(part))
    let urList = [];
    ur1.map((course) => {
      const { _id, username, email } = course;
      urList.push({ _id, username, email });
    });
    res.status(200).json(urList);

  }catch(err){
    res.status(500).json(err);
  }
})


// get all user from DB
router.get("/all", async (req, res)=>{
  try{
      const uc = await User.find();
      res.status(200).json(uc);
  }catch(err){
      res.status(500).json(err);
  }
})

//get following
router.get("/Following/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    let FollowingList = [];
    
      user.followings.map((fIng) => {
        FollowingList.push(fIng);
      })
    

    res.status(200).json(FollowingList)
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router