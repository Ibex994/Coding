const express = require('express');
const route = express.Router();
const path= require('path');
// const productsData =require('../utiles/product');
const { getHomePage,getProductDetails } = require('../constrollers/admin/HomeController');
const { postCartPage,getCartPage } = require('../constrollers/admin/CartController');

        //middleware
// route.get('/',function(req,res,next){
//     const viewData ={
//         products:productsData.products,
//         pageTitle: 'Product List'
//     };
//     res.render('home',viewData);
    // res.sendFile('C:/xampp/htdocs/coding/NodeJs/NodeExpress/View/home.html');
     //res.sendFile(path.join(__dirname,'../','View','home.html'));
// });


route.get('/',getHomePage);
route.get('/product/details/:productId', getProductDetails);

route.post('/cart',postCartPage);
route.get('/cart',getCartPage);




module.exports=route;