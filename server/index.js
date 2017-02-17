var express = require('express');
var multer = require('multer');
var path = require('path');

var app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/uploads/');
    },
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split(".");
        fileFormat = fileFormat[fileFormat.length - 1];
        var filename = "" + Date.now() + Math.floor(Math.random() * 100);
        if (fileFormat.length > 1 && fileFormat) {
            filename += ("." + fileFormat);
        }
        cb(null, filename);
    }
});

var upload = multer({
    storage: storage
});

app.use(express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'))
});

app.post('/upload', upload.single('file'), function (req, res, next) {
   res.send({path: "http://localhost:3002/uploads/" + req.file.filename});
});

app.listen(3002, 'localhost', function (error) {
    if (error) {
        console.error(error);
        return;
    }
    console.log('listen at http://localhost:3002');
});
