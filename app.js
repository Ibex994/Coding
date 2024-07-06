        const path = require('path');
        const express = require('express'); //import express
        const Body =  require('body-parser'); //import body-parser

        const Admin=require('./routes/admin.js'); //import admin.js
        const Home= require('./routes/home.js');

        const app = express(); //create express app

        //EJS 
        app.set( 'view engine', 'ejs'); //set view engine to ejs
        app.set( 'views', 'View'); //set views folder to views

//static files
    app.use(express.static(path.join(__dirname,'public')));
    app.use('/css',express.static(path.join(__dirname,'node_modules','bootstrap','dist','css')));
        app.use(Body.urlencoded({extended:false})); //use body-parser
        // app.use(express.static(path.join(__dirname,'public')));

// middleware
        //     app.use(function(req,res,next){
        //     console.log('Log In To Request'); //middleware 1
        //     next(); //call next middleware
        // });
            //     app.use('/users',function(req,res,next){
            //      res.send('<h1>Hello Mate</h1>');
            //     console.log('Log In To Admin'); //middleware 2
            //     next(); //call next middleware
            //  });

//Routes
        app.use(Admin);
        app.use(Home);
        app.use((req,res)=>{
            const pviews={
                pageTitle:"Page Not Found"
            }
            res.status(404).render('pageNotFound',pviews);
            // res.sendFile(path.join(__dirname,'View','pageNotFound.html'));
            
        });

        //FOR THE CSS
        // app.get('/public',(req,res)=>{
        // res.sendFile(path.join(__dirname,'public','css','main.css'));
        // });

        //    app.get('/public/css/admin.css',(req,res)=>
        //    {
        //     res.sendFile(path.join(__dirname,'public','css','admin.css'));
        //    });

//starting the server
        app.listen(300,()=>{
            console.log("Server Started Listening  on port 300");
        }); //listen on port 300