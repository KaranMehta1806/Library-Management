const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const mongoose = require("mongoose");
require('dotenv').config();
const users = require("./routes/user.js") 
const books = require("./routes/books.js")
const admin = require("./routes/admin.js")
// const seedAdmin = require("./controller/admin.js");

// const indexController  = require("./controller/indexController");
// const {adminAuthMiddleware} = require("./middlewares/authMiddleware");
// const {serviceProviderMiddleware} = require("./middlewares/serviceProviderMiddleware");
// const {userAuthMiddleware} = require("./middlewares/userAuthMiddleware ");
// const providerController = require('./controller/serviceProviderController');
// const userController = require('./controller/userController');
// const fileUpload = require("express-fileupload")


app.use(express.json()); // Parse JSON
app.use(cors());
app.use("/users",users);
app.use("/books",books);
app.use("/admin",admin);

app.get("/", (req, res) => {
    res.send("API is running...");
  });
  
  const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
     mongoose.connect(uri);
     
     console.log("DB Connected")
  });