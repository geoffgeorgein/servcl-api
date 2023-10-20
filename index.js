import express  from "express";

import cors from "cors";
import multer from "multer";
import fs from "fs";

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
    // console.log("body",req.body);
    console.log("file",req.file);
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath = path+'.'+ext;

   
    console.log("originalname",originalname)
    fs.renameSync(path, newPath);
    const name=req.file.filename;
    console.log("name",name)
    var npath = process.cwd();
    console.log("npath",npath)
    const data= fs.readFileSync('./uploads/'+name+'.txt','utf-8', (err, data) => { 
      console.log("data",data); 

   }) 
    res.status(200).json(JSON.stringify(data));
})

app.get('/upload', async(req,res)=>{

})



app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});