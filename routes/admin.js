const express = require('express');
const router = express.Router();
const paths= require('path');
// const productData = require( '../utiles/product');
const { 
    getAddProductPage, 
    postAddProductPage, 
    getAdminProductsPage,
    getEditProductPage,
    postEditProductPage,
    postDeleteProductPage
    } = require('../constrollers/admin/productController');

router.use('/css',express.static(paths.join(__dirname,'../','node_module','bootstrap', 'dist','css')));

router.get('/users',function(req,res){
    // res.send(`
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>users page</title>
    //     <link rel="stylesheet" href="/css/bootstrap.min.css"/>
    // </head>
    // <body>
    //     <h1>This Is The Users Page</h1>
    // </body>
    // </html>
    // `);

    //using html as templates
   // res.sendFile(paths.join(__dirname,'../','View','users.html'));
   
   //using ejs
   const rend={
    title:"Users Page",
    h1:"Hello Users Nice To Meet You",
    ashu:123456789
   };
   res.status(500).render('users',rend);

});
//router.get('/products/add',function(req,res){
    // res.send(`
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Register</title>
    //     <title>Home Page</title>
    //     <link rel="stylesheet" href="/css/bootstrap.css">
    //     <link rel="stylesheet" href="/css/main.css"/>
    // </head>
    // <body>
    //     <form method="post">
    //         <input type="text" name="name" id="name" placeholder="Enter your name"><br/><br/>
    // <input type="text" name="email" id="email" placeholder="Enter your email"><br/><br/>
    // <input type="text" name="password" id="password" placeholder="Enter your password"><br/><br/>
    // <input type="text" name="confirm_password" id="confirm_password" placeholder="Confirm your password"><br/><br/>
    // <input type="submit" value="Submit"> 
    //     </form>
    // </body>
    // </html>`
    //         );

    //using html as templates
    // res.sendFile(paths.join(__dirname,'../','View','admin.html'));
    // const viewsData={
    //     pageTitle:'Add Product'
    // }
    // res.render('AddProduct',viewsData)
   // }); 
   
   //the above code hade no controller so we need to do this,instead of writing const "viewData....." in here we will move them in to ProductController.js and make them a function
   router.get('/products/add',getAddProductPage);

// router.post('/products/add',function(req,res){
    // const product={
    //     title:req.body.title
    // };
    // productData.addProduct(product);
    // res.redirect('/');
    // console.log(req.body); 
// res.send('User Added');

// console.log("hello");
// });

router.post('/products/add',postAddProductPage);
router.get('/products',getAdminProductsPage);
router.get('/product/edit/:productId',getEditProductPage);
router.post('/product/edit',postEditProductPage);
// router.get('/product/delete',getDeleteProductPage);
router.post('/products/delete',postDeleteProductPage);
module. exports = router;
