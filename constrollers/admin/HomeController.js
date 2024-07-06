// const { getAllProducts } = require("../../models/Product");
const { fetchAllProducts, getProductById } = require("../../models/Product");
// const { products } = require("../../utiles/product");

exports.getHomePage=(req,res)=>{
    fetchAllProducts((products)=>{
    const viewData ={
        admin:false,
        products,
        pageTitle: 'Product List'
    };
    res.render('product-list',viewData);
    });
};

exports.getProductDetails= (req,res) =>{
    const productId=req.params.productId;
    // console.log(req.params);
    getProductById(productId,(product)=>{
        const viewsData={
            product,
            pageTitle:product.title
        };
        res.render( 'productDetails',viewsData);
    });
};