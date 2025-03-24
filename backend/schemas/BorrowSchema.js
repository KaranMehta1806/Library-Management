const {Schema} = require("mongoose");

const BorrowSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
})