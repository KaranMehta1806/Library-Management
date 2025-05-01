const {model} = require("mongoose");
const {OtpSchema} = require("../schemas/OtpSchema");

const OtpModel = new model("Otp",OtpSchema);

module.exports = {OtpModel};