const {Schema} = require("mongoose");

const ContactSchema = new Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
})

module.exports = {ContactSchema};