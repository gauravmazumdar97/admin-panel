const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
    {
        name: { type: String, trim: true, required:true },
        brand: { type: String,  required:true },
        price: { type: String,  required:true },
        star: { type: Number, required:true, default:0 },
    },
    {
        timeStamps:true,
    });




const Product = mongoose.model("Product", productModel);
module.exports = Product;