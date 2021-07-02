//declared all our imports
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
var Tesseract = require("tesseract.js");

//storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage }).single('bruh');

//view engine
app.set("view engine", "ejs");

//routes
app.get('/', (req, res) => {
    res.render("index");
});

app.post("/uploads", (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err)
            return res.send('something went wrong');
        }

        var image = fs.readFileSync(__dirname + `/uploads/${req.file.originalname}`, {
            encoding: null
        });

        Tesseract.recognize(
            image,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            res.send(text);
        });
    });
});

//start up our server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`running on port ${PORT}`));