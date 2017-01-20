var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'))
});

app.listen(3002, 'localhost', function (error) {
    if (error) {
        console.error(error);
        return;
    }
    console.log('listen at http://localhost:3002');
});
