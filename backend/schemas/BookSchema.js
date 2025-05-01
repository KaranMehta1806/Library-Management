const {Schema} = require("mongoose");

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    availableCopies: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    coverImage: { type: String },
    cloudinaryId: { type: String, required: true },
    price: {type:Number},
    createdAt: { type: Date, default: Date.now }
}) 

module.exports = {BookSchema};