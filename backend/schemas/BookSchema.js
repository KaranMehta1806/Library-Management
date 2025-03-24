const {Schema} = require("mongoose");

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    availableCopies: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    coverImage: { type: String },
    price: {type:Number},
    createdAt: { type: Date, default: Date.now }
}) 

module.exports = {BookSchema};