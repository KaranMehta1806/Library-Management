const {Schema} = require("mongoose");

const OtpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

module.exports = {OtpSchema};