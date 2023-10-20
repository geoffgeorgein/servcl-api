import express  from "express";

import cors from "cors";
import multer from "multer";

const upload = multer({ dest: 'uploads/' })



const app=express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/',async(req,res)=>{
    res.json('hello world1')
})

app.post('/upload',upload.single('file'),(req,res)=>{
    console.log("body",req.body);
    console.log("file",req.file);
    res.status(200).json(req.file);
})



app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});