const path = require('path');
const router=require('express').Router();
router.get('/',async(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/index.html"))
})
router.get('/about',async(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/about.html"))
})

router.get('/projects',async(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/projects.html"))
})

router.get('/contact',async(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/contactme.html"))
})
module.exports=router