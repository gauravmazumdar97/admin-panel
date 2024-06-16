const mongoose = require("mongoose");
const Product = require("./products");
const Customer = require("./customer");

const purchaseModel = new mongoose.Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, required:true, ref:'Customer'},
        quantity: { type: Number,  required:true },
        productId: [{ type: mongoose.Schema.Types.ObjectId, required:true, ref:Product}],
        total: { type: Number, required:true},
        status: { type: Number, required:true},
    },
    {
        timeStamps:true,
    });

const Purchase = mongoose.model("purchase", purchaseModel);
module.exports = Purchase;

