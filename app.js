//declared all our imports
const express = require ("express");
const app = express();
const fs = require("fs");
const multer = require ("multer");
const createWorker = require("tesseract.js");

//storage
const storage= multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null,"./uploads");
    },
    filename: (req,res,cb) => {
        cb(null,req.file);
    }
});
const upload = multer({storage: storage}).single("bruh");

//view engine
app.set("view engine", "ejs");
//routes
app.get("/", (req,res) => {
    res.render("index");
})

//start up our server
const PORT= 5000 || process.env.PORT;
app.listen(PORT, ()=>console.log(`running on port ${PORT}`));