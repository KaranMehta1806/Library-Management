const {model} = require("mongoose")
const {BookSchema} = require("../schemas/BookSchema")

const BookModel = new model("Book",BookSchema)

module.exports = {BookModel}