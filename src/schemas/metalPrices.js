const { Schema, model } = require("mongoose");

const metalPricesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    priceTimeStamp: Number,
    base: String,
    date: String,
    rates: Schema.Types.Mixed,
    unit: String
},{
    timestamps:true
});

module.exports = model("MetalPrices", metalPricesSchema);