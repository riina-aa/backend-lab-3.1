const express = require("express"); 
const cors = require("cors"); 
const mongoose = require("mongoose"); 

const app = express(); 
const port = process.env.PORT || 3000; 

app.use(cors()); 
app.use(express.json()); 

//Ansluter till MongoDb
mongoose.connect("mongodb://localhost:27017/").then(() => {
    console.log("Connected to MongoDb")
}).catch((error) => {
    console.log("Failed to connect to database:" + error)
}); 

//Routes
app.get("/api", async (res, req) => {

    res.json({message: "Välkommen"});

})


app.listen(port, () => {
    console.log("Server is running on port: " + port);
}); 