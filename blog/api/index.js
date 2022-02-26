const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

dotenv.config();
const config=require('./configurations/config');

// routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
//route localhost:3000/api/auth/register
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.listen(config.port, () => {
  console.log("Backend is running."+config.port);
});


mongoose.connect(config.connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err)); 

  // app.listen("5000", () => {
  //   console.log("Backend is running  in 5000");
  // });

  //const postModule=require('./models/postModule');

  // app.post('/',async(req,res)=>{ 
  //   const {title,content}=req.body; 
  //       try{
  //           const newPost=await postModule.create({title,content});
  //           res.json(newPost);

  //       }catch(error){
  //           res.status(500).send(error);
  //       }
  // });

