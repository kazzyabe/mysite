var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var spawn = require('child_process').spawn;
    py = spawn('python', ["./public/python/test.py", 'hello']);
    // ls = spawn('ls')
    var dataToSend = 'woooo';

    py.stdout.on('data', function(data){
        console.log("data =", data);
        dataToSend = data.toString();
    });
    py.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.render('pos', { mes: dataToSend})
    });
});

module.exports = router;
