const fs = require('fs');
const path = require('path');
const { deleteProductFromCart }=require('./cart');


const getProductFromFile=(callback)=>{
    const productPath = path.join(__dirname, '../', 'data', 'products.json');

    fs.readFile(productPath, (error, productsData)=>{
        if(error){
            return callback([]);
        }

        return callback(JSON.parse(productsData));
    });
    };




exports.saveProduct = (product) =>{
    const productPath = path.join(__dirname, '../', 'data', 'products.json');

    getProductFromFile((productsData)=>{
        productsData.push(product);

        fs.writeFile(productPath, JSON.stringify(productsData), (error)=>{
            console.log(error); 
    // fs.readFile(productPath, (error, productsData)=>{
    //     let products =[];
    //     if(!error){
    //         products=JSON.parse(productsData);
    //     }
        // products.push(product);
    //     fs.writeFile(productPath, JSON.stringify(products), (error)=>{
    //     console.log(error); 
    });
});
};

exports.fetchAllProducts=(callback)=>{
//    const productPath = path.join(__dirname, '../', 'data', 'products.json');
//     fs.readFile(productPath, (error, productsData)=>{
//     const products = JSON.parse(productsData);
//     callback(products);
//     })

getProductFromFile(callback);
};

exports.getProductById=(productId,callback)=>{
    getProductFromFile(products =>{
        const product = products.find((p)=>p.id.toString() === productId);
        console.log(product);
        callback(product);
        });
};

// const fs = require('fs');
// const path = require('path');

// const productPath = path.join(__dirname, '../', 'data', 'products.json');

  // Save Product Function
// exports.saveProduct = (product, callback) => {
//     fs.readFile(productPath, 'utf8', (error, productsData) => {
//         let products = [];
//         if (!error && productsData) {
//             try {
//                 products = JSON.parse(productsData);
//             } catch (e) {
//                 return callback(new Error('Error parsing JSON data'));
//             }
//         } else if (error && error.code !== 'ENOENT') {
//             return callback(error);
//         }

//         products.push(product);
//         fs.writeFile(productPath, JSON.stringify(products), (error) => {
//             if (error) {
//                 return callback(error);
//             }
//             callback(null);
//         });
//     });
// };

// // Fetch All Products Function
// exports.fetchAllProducts = (callback) => {
//     fs.readFile(productPath, 'utf8', (error, productsData) => {
//         if (error) {
//             if (error.code === 'ENOENT') {
//                 return callback(null, []);
//             } else {
//                 return callback(error);
//             }
//         }

//         let products = [];
//         if (productsData) {
//             try {
//                 products = JSON.parse(productsData);
//             } catch (e) {
//                 return callback(new Error('Error parsing JSON data'));
//             }
//         }
//         callback(null, products);
//     });
// };

exports.updateProductById=(updatedProduct,productId)=>{
    const productPath = path.join(__dirname, '../', 'data', 'products.json');
    getProductFromFile(products=>{
        const existingProductIndex=products.findIndex(prod=>prod.id.toString()==productId.toString());
        const updatedProducts =  [...products];
        updatedProducts[existingProductIndex]=updatedProduct;
        fs.writeFile(productPath,JSON.stringify(updatedProducts),(error)=>{
            console.log(error);
        });
    });
}


exports.deleteProductById=(productId, callback)=>{
    const productPath = path.join(__dirname, '../', 'data', 'products.json');
    getProductFromFile(products=>{
        let updatedProducts=products.filter(product=>product.id.toString()!=productId.toString());
        deleteProductFromCart(productId);
        fs.writeFile(productPath,JSON.stringify(updatedProducts),(error)=>{
            console.log( error);
        });
        callback();
    })
}