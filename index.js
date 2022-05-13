// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'yourDB-name',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to yourDB-name database'));
  
// Schema for users of app
const UserSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientAddress: {
        type: String,
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    invoiceDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        default: Date.now,
    },
    list: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    word: {
        type: String,
        required: true
    }

});

const User = mongoose.model('users', UserSchema);
User.createIndexes();
  
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  
    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
      
    // If you see App is working means
    // backend working properly
});
  
app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        resp.send(req.body);
        console.log(result);
    }
    catch (e) {
        resp.send("Something Went Wrong");
    }
});
app.listen(5000);