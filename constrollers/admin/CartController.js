const { getProductById,fetchAllProducts }= require('../../models/Product');
const{ addProductToCart,getCartDetailsFromFiles }= require('../../models/cart');


exports.postCartPage=(req,res)=>{
const productId= req.body.productId;
    getProductById (productId,(product)=>{
    addProductToCart(productId, product.price);
    res.redirect('/');
})

};


exports.getCartPage = (req, res) => {
    
    getCartDetailsFromFiles(cart => {
        const cartProducts = cart. products;
        console.log('Cart:', cart);
        console.log('Cart Products:', cartProducts);

        if (!Array.isArray(cartProducts)) {
            return res.status(404).redirect('/PageNotFound');
        }

        fetchAllProducts((products) => {
            const productsData = [];
            let totalPrice = 0;

            for (let cartItem of cartProducts) {
                let singleProduct = products.find((prod) => prod.id.toString() == cartItem.id.toString());

                if (singleProduct) {
                    let cartProductPrice = +cartItem.quantity*+singleProduct.price;
                    totalPrice += cartProductPrice;
                    productsData.push({ ...singleProduct, quantity: cartItem.quantity, cartPrice: cartProductPrice });
                }
            }

            const viewsData = {
                pageTitle: 'Cart Details',
                cartProducts: productsData,
                totalPrice
            };
            res.render('cartDetails', viewsData);
        });
    });
};
