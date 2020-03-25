var express = require('express');
var router = express.Router();
var authenticate= require('../../models/admin/authentication');



    router.post('/', function(req,res,next){
        if(req.query){
            authenticate.validateUser(req.body.UserName,req.body.Password, function(err,rows){
                if(err){
                    console.log(err);
                    res.json(err);
                }else{
                    // console.log(rows);
                    res.json(rows);
                }
            });
        }
    });
    
    
    router.get('/', function(req,res,next){
        if(req.query.email){
            // console.log(req.query.email, 'email data');
            authenticate.checkLoginEmail(req.query.email, function(err,rows,next){
                if(err){
                    console.log(err);
                    res.json(err);
                } else {
                    // console.log(rows, 'rows');
                    res.json(rows);
                }
            });
        }

    });
    
    
    module.exports = router;