const router = require("express").Router();
const Comment = require("../models/Comment")
const Post = require('../models/Post')

//create a comment
router.post("/", async (req,res)=>{
    console.log('made to create comment route')
    const newComment = new Comment(req.body);
    console.log(newComment)
    try{
        const post = await Post.findById(req.body.postId);
        const savedComment = await newComment.save();
        post.comments.push(newComment);
        const savedPost = await post.save();
        res.status(200).json({ comment: savedComment, post: savedPost });
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/", async (req, res) => {
    console.log(req.query.postId, ' log of post id get query')
    try {
      const post = await Post.findOne({ _id: req.query.postId });
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/:id", async (req, res)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id", async (req,res)=>{
     Comment.findByIdAndRemove(req.params.id)
        .then(RemovedComment => {
            if (RemovedComment) {
                try {
                    const postId = removedComment.postId; // assuming each Comment document has a `postId` field
                    const updatedPost = Post.findByIdAndUpdate(
                      postId,
                      { $pull: { comments: commentId } },
                      { new: true } // return the updated Post document
                    );
                    if (!updatedPost) {
                      return res.status(404).json({ message: `No post with id ${postId} found` });
                    }
                    res.json({ message: `Comment with id ${commentId} successfully deleted`, data: removedComment });
                  } catch (err) {
                    return res.status(500).json({ message: err });
                  }
                res.json({
                    message: `comment with id ${req.params.id} successfully deleted`,
                    data: RemovedComment
                })
            } else {
                res.status(404).json({
                    message: `No comment with id ${req.params.id} found`
                })
            }
            
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })

})

module.exports = router;