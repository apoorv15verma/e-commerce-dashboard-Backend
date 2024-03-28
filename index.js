const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
// Convert API requests into JSON data
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use the CORS middleware to handle CORS issues
app.use(cors({
  origin: '*'
}));

// Include your database connection and model here
require("./db");
const User = require('./models/users');
const Product = require('./models/products');


// jsonwebtoken

const Jwt=require(`jsonwebtoken`)
const jwtkey=`e-comm`;

app.get("/", (req, res) => {
  res.send("app is work");
  console.log("get");
});

app.post('/signup', async (req, res) => {
  try {
    // Data received from the API request
    const data = req.body;

    // Shape the data according to your schema
    const user = new User(data);

    // Store the data in the database
    const result = await user.save();

    console.log("signup");
    res.status(201).json(result);
  } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    // Data received from the API request
    const data = req.body;

    const user = await User.findOne(data)


    
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(201).json({ result: "User not found" });
    }


    console.log("login");

  } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/add-products', async (req, res) => {
  try {
    // Data received from the API request
    const data = req.body;

    // Shape the data according to your schema
    const product = new Product(data);

    // Store the data in the database
    const result = await product.save();

    console.log("add-product");
    res.status(201).json(result);
  } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      res.send(products)
    }
    else {
      res.send({ result: "no products" })
    }
    console.log("get product");

  } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If the product exists, delete it
    await Product.findByIdAndDelete(productId);
    
    res.json({ success: true, message: "Product deleted successfully" });

    console.log("Product deleted");

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId }); // Correct usage of findOne()
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
    console.log("get product by id");
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body; // Assuming that the updated data is sent in the request body

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
    console.log("Product updated successfully");
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/search/:key", async (req, res) => {
  try {
    const searchKey = req.params.key;
    const regex = new RegExp(searchKey, "i"); // Case-insensitive search regex

    const result = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } }, 
        { company: { $regex: regex } }, 
        
      ],
    });

    res.json(result);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






const PORT = process.env.PORT || 8000; // Use the PORT environment variable if available, otherwise default to 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
