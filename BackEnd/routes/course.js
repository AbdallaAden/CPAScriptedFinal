const router = require("express").Router();
const Courses = require("../models/Courses")


//create a ca
router.post("/", async (req,res)=>{
  const newCa = new Courses(req.body);
  try{
      const savedCa = await newCa.save();
      res.status(200).json(savedCa);
  }catch(err){
      res.status(500).json(err);
  }
})

//update a ca
router.put("/:id", async (req,res)=>{
  try{
      const ca = await Courses.findById(req.params.id);
      if(ca._id === req.body.id){
          await ca.updateOne({$set:req.body});
          res.status(200).json("ca has updated")
      }else{
          res.status(403).json("you only can update responding ca ")
      }
  }catch(err){
      res.status(500).json(err);
  }

})

//delete a ca
router.delete("/:CaId", async (req,res)=>{
  try{
      const ca = await Courses.findById(req.params.id);
      if(ca._Id === req.body.CaId){
          await ca.deleteOne();
          res.status(200).json("post has delete")
      }else{
          res.status(403).json("you only can delete your ")
      }
  }catch(err){
      res.status(500).json(err);
  }

})

//get course
router.get("/", async (req, res)=>{
  const coursecode = req.query.coursecode;
  try{
      const ca = await Courses.findOne({ code: coursecode });
      res.status(200).json(ca);
  }catch(err){
      res.status(500).json(err);
  }
})

//get all course
router.get("/", async (req, res)=>{
    try{
        const ca = await Courses.find();
        res.status(200).json(ca);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;