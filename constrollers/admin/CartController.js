const { getProductById,fetchAllProducts }= require('../../models/Product');
const{ addProductToCart,getCartDetailsFromFiles, deleteProductFromCart }= require('../../models/cart');


exports.postCartPage = (req, res) => {
    const productId = req.body.productId;
    console.log('Received productId:', productId); // Debug: Check if productId is received correctly

   getProductById(productId, (product) => {
        if (product) {
            console.log('Found product:', product); // Debug: Check if product is found
           addProductToCart(productId, product.price);
        } else {
            console.error('Product not found for productId:', productId); // Debug: Log if product is not found
        }
        res.redirect('/');
    });
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


exports.deleteCartItem=(req,res)=>{
    const productId = req.params.productId;
    deleteProductFromCart(productId, ()=>{
        res.redirect('/cart');
    });
};
