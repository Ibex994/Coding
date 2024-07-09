const fs = require('fs');
const path = require('path');

exports.getCartDetailsFromFiles = (callback) => {
    const cartPath = path.join(__dirname, '../', 'data', 'cart.json');
    fs.readFile(cartPath, (error, cartContent) => {

        let cart = { products: [] };
        if (!error) {
            cart = JSON.parse(cartContent);
        }
        return callback(cart);
    });
};
exports.addProductToCart = (productId, productPrice) => {
    const cartPath = path.join(__dirname, '../', 'data', 'cart.json');
    
    this.getCartDetailsFromFiles((cart) => {
        let existingProductIndex = cart.products.findIndex((prod) => prod.id.toString() == productId.toString());

        let updatedProduct;
        if (existingProductIndex != -1) {
            updatedProduct = { ...cart.products[existingProductIndex] };
            updatedProduct.quantity += 1;
            updatedProduct.totalPrice = updatedProduct.quantity * productPrice;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        } else {
            updatedProduct = { id: productId, quantity: 1, price: productPrice };
            cart.products = [...cart.products, updatedProduct,];
     }
        fs.writeFile(cartPath, JSON.stringify(cart), (error) => {
            console.log(error);
        });
    });
};

exports.deleteProductFromCart = (productId,callback='') => {
    const cartPath = path.join(__dirname, '../', 'data', 'cart.json');
    this.getCartDetailsFromFiles(cart => {
        let cartProducts = cart.products;
        let existingProductIndex = cart.products.findIndex((prod) => prod.id.toString() !== productId.toString());
        fs.writeFile(cartPath, JSON.stringify(updatedCartProduct), (error) => {
            console.log(error);
        });
        if(callback){
            callback();
        }
    });
};