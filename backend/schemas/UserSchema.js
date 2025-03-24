const {Schema} = require("mongoose");

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["admin", "librarian", "user"], 
      default: "user" 
    },
    stream: { 
      type: String, 
      required: function() { return this.role === "user"; } 
  },
  year: { 
      type: Number, 
      required: function() { return this.role === "user"; } 
  }
})

module.exports = {UserSchema};