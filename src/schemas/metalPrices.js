const { Schema, model } = require("mongoose");

const metalPricesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    priceTimeStamp: Number,
    base: String,
    date: String,
    rates: {
        gold: Number,
        silver: Number,
        platinum: Number,
        palladium: Number,
        rhodium: Number,
        ruthenium: Number,
        copper: Number,
        nickel: Number,
        aluminium: Number,
        zinc: Number,
        tin: Number,
        cobalt: Number,
        iridium: Number,
        lead: Number,
        iron: Number,
},
    unit: String
},{
    timestamps:true
});

module.exports = model("MetalPrices", metalPricesSchema);