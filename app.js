const express = require('express');
const app = express(); 
const port = 3000;  

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/newdatabase', { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
});

mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.once("open", () => console.log("Mongoose conectado"));

const productSchema = mongoose.Schema({      
    product: String,  
    price: Number      
});

const Product = mongoose.model("Product", productSchema);
app.get("/products",   async (req, res) => {
   
    const products = await Product.find();
    console.log(products);
    res.setHeader('Content-Type', 'application/json');
    res.json(products);
   
  });

  app.listen(port, () => console.log("Listening on port 3000 ..."));