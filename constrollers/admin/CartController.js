const { getProductById,fetchAllProducts }= require('../../models/Product');
const{ addProductToCart,getCartDetailsFromFiles }= require('../../models/cart');


exports.postCartPage=(req,res)=>{
const productId= req.body.productId;
    getProductById (productId,(product)=>{
    addProductToCart(productId, product.price);
    res.redirect('/');
})

};

// exports.getCartPage=(req,res)=>{
//     getCartDetailsFromFiles(cart=>{
//         const cartProducts =cart.Products;
//         fetchAllProducts((products) =>
//         {
//             const productsData=[];
//             let totalPrice=0;
//         for(let cartItem of cartProducts)
//         {
//             let singleProduct=products.map((prod)=>prod.id.toString()==cartItem.id.toString());
//             cartProductPrice=+cartItem.quantity * +singleProduct.price;
//             totalPrice+=cartProductPrice;
//             productsData.push({...singleProduct, quantity:cartItem.quantity, cartPrice:cartProductPrice});
//             }
//             const viewsData={
//                 pageTitle:'Cart Details',
//                 cartProducts : productsData,
//                 totalPrice
//             };
//             res.render('cartDetails',viewsData);
//         });
//     });
// };


exports.getCartPage = (req, res) => {
    getCartDetailsFromFiles(cart => {
        const cartProducts = cart.Products;

        // Add a debugging statement
        console.log('Cart:', cart);
        console.log('Cart Products:', cartProducts);

        if (!Array.isArray(cartProducts)) {
            return res.status(500).send('Cart data is invalid');
        }

        fetchAllProducts((products) => {
            const productsData = [];
            let totalPrice = 0;

            for (let cartItem of cartProducts) {
                let singleProduct = products.find((prod) => prod.id.toString() == cartItem.id.toString());

                // Check if singleProduct is found
                if (singleProduct) {
                    let cartProductPrice = +cartItem.quantity * +singleProduct.price;
                    totalPrice += cartProductPrice;
                    productsData.push({ ...singleProduct, quantity: cartItem.quantity, cartPrice: cartProductPrice });
                }
            }

            const viewsData = {
                pageTitle: 'Cart Details',
                cartProducts: productsData, // Corrected to 'cartProducts' for consistency
                totalPrice
            };

            res.render('cartDetails', viewsData);
        });
    });
};
