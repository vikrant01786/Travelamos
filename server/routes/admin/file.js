var express = require('express');
var router = express.Router();
var multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null,'uploads');
    },
    filename: (req,file,callback) => {
     callback(null, Date.now()+`_${file.originalname}`)
    }
  });
  var upload = multer({storage: storage});

  router.get('/', function (req, res) {
    res.end('file catcher example');
  });

    router.post('/',upload.single('file'),function(req,res,next){
        // console.log('Iam Here', req);
        const file = req.file;
         console.log(file.filename ,'filename');
        if(!file) {
         const error = new Error('pls upload a file');
        err.httpStatusCode = 400;
    return next (error);
  }
  res.send(file);
    });

    
    
    module.exports = router;