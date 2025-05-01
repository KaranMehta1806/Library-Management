const {model} = require("mongoose");
const {BorrowSchema} = require("../schemas/BorrowSchema");

const BorrowModel = new model("BorrowedBooks",BorrowSchema);

module.exports = {BorrowModel};