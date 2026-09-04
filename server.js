const express = require("express"); 
const cors = require("cors"); 
const mongoose = require("mongoose"); 

const app = express(); 
const port = 5468; 

app.use(cors()); 
app.use(express.json()); 

console.log("Detta är server.js");

//Ansluter till MongoDb
mongoose.connect("mongodb://localhost:27017/workexperience-lab-3").then(() => {
    console.log("Connected to MongoDb")
}).catch((error) => {
    console.log("Failed to connect to database:" + error)
}); 

//Schema
const workexperienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },  
    jobTitle: {
        type: String, 
        required: true
    }, 
    location: {
        type: String,
        required: false
    }, 
    startDate: {
        type: Date, 
        required: false
    }, 
    endDate: {
        type: Date,
        required: false
    },  
    description: {
        type: String, 
        required: false
    }
}); 

const Workexperience = mongoose.model("Workexperience", workexperienceSchema)

//Routes
app.get("/workexperience", async (req, res) => {

    try {

        let result = await Workexperience.find({});
        return res.json(result); 

    } catch(error) {

        return res.status(500).json(error); 
    }

})

app.listen(port, () => {
    console.log("Server is running on port: " + port);
}); 