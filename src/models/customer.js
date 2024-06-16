const mongoose = require("mongoose");
const Product = require("./products");
const Purchase = require("./purchases");

const customerModel = new mongoose.Schema(
    {
        name: { type: String, trim: true, required:true },
        email: { type: String, trim: true, required:true },
        state: { type: String, trim: true, required:true },
        pincode: { type: String, trim: true, required:true },
        purchases: [{ type: mongoose.Schema.Types.ObjectId, trim: true, required:true, ref:Purchase}],
    },
    {
        timeStamps:true,
    });

const Customer = mongoose.model("customer", customerModel);
module.exports = Customer;