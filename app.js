//declared all our imports
const express = require ("express");
const app = express();
const fs = require("fs");
const multer = require ("multer");
const createWorker = require("tesseract.js");

//storage
const storage= multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./uploads");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage}).single("bruh");

//view engine
app.set("view engine", "ejs");

//routes
app.get("/", (req,res) => {
    res.render("index");
});

app.post("/uploads", (req,res) =>{
    upload(req,res,err=>{
        console.log(req.file);
    })
});

//start up our server
const PORT= 5000 || process.env.PORT;
app.listen(PORT, ()=>console.log(`running on port ${PORT}`));