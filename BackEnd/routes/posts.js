const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/user");
const Ca = require("../models/Ca");
//create a post
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})
//update a post
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("post has updated")
        }else{
            res.status(403).json("you only can update your ")
        }
    }catch(err){
        res.status(500).json(err);
    }

})
//delete a post
router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        console.log("APPPPPPPPPI : " + req.body.userId)
        if(post.userId){ 
            //if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("post has delete")
        }else{
            res.status(403).json("you only can delete your ")
        }
    }catch(err){
        res.status(500).json(err);
    }

})

// like a post
router.put("/:id/like", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        console.log("APPPPPPPPPI : " + req.body.userId)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("the post has been liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("the post has been disliked")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//get a post
router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})
//get all posts of the course 
router.get("/switch/:CaName/:userId", async (req,res)=>{

    try{
        const posts = await Post.find({
            course:{$in:[req.params.CaName]},

        })
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

//get user's all posts

router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const posts = await Post.find()
    .populate('comments','desc createdAt')
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;