const fs = require('fs');
const path = require('path');

// exports.getCartDetailsFromFiles=(callback)=>{
//     const cartPath = path.join(__dirname,'../', 'data', 'cart.json');
//     fs.readFile(cartPath,(error,cartContent)=>{

//         let cart ={ products: [] };
//         if(!error){
//             cart = JSON.parse(cartContent); 
// }
// return callback(cart);
//     });
// };



exports.getCartDetailsFromFiles = (callback) => {
    const cartPath = path.join(__dirname, '../', 'data', 'cart.json');
    fs.readFile(cartPath, 'utf8', (error, cartContent) => {
        let cart = { Products: [], totalPrice: 0 };
        if (!error && cartContent) {
            try {
                cart = JSON.parse(cartContent);
            } catch (e) {
                console.error('Error parsing cart JSON data', e);
            }
        } else {
            console.error('Error reading cart file:', error);
        }
        console.log('Parsed Cart:', cart); // Add this line
        return callback(cart);
    });
};


exports.addProductToCart=(productId, productPrice)=>{
    const cartPath = path.join(__dirname, '../','data', 'cart.json');

    this.getCartDetailsFromFiles(cart=>{
        //if product is already in cart
        let existingProductIndex = cart.products.findIndex((prod) => prod.id.toString() == productId.toString());
        //update the quantity
        let updatedProduct;
        if(existingProductIndex!=-1){   
            updatedProduct = {...cart.products[existingProductIndex]};
            updatedProduct.quantity += 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        }else{
            updatedProduct={id:productId,quantity:1};
            cart.products= [...cart.products, updatedProduct];
        }
        //update the total price
         cart.totalPrice+=+productPrice;
        fs.writeFile(cartPath,JSON.stringify(cart),(error)=>{
            console.log(error);
});
    });
};

exports.deleteProductFromCart=(productId)=>{
    const cartPath = path.join(__dirname,'../', 'data', 'cart.json');
    this.getCartDetailsFromFiles(cart=>{
        let cartProducts =cart.products;
        let updatedCartProduct = cartProducts. filter((prod) => prod.id.toString() !== productId.toString());

        fs.writeFile(cartPath,JSON.stringify(updatedCartProduct),(error)=>{
            console.log(error);
        });
    });
};