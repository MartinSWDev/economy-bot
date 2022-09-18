const { Schema, model } = require("mongoose");

const userAccountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    guildId: String,
    mines: Schema.Types.Mixed,
    wallet: Number,
    bank: Number,
    storage: Schema.Types.Mixed
},{
    timestamps:true
});

module.exports = model("userAccount", userAccountSchema);