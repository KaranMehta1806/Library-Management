const {model} = require("mongoose");
const {ContactSchema} = require("../schemas/ContactSchema");

const ContactModel = new model("Contact",ContactSchema);

module.exports = {ContactModel};