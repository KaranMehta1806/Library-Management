const {Schema} = require("mongoose");

const BorrowSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date, default: null },
  fineAmount: { type: Number, default: 0 },
  status: { type: String, enum: ["Requested","Issued","Requested Return", "Returned"], default: "Requested" },
  approvedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }

},{ timestamps: true })

module.exports = {BorrowSchema};



// const BorrowSchema = new Schema({
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
//     borrowDate: { type: Date, default: Date.now },
//     returnDate: { type: Date },
//     status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
// })