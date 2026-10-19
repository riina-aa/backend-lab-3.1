const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5468;

app.use(cors());
app.use(express.json());

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
        required: [true, "Företagsnamn får inte vara tomt"],
        trim: true
    },
    jobTitle: {
        type: String,
        required: [true, "Jobtitel får inte vara tomt"],
        trim: true
    },
    location: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: [true, "Du måste ange ett startdatum"]
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

    } catch (error) {

        return res.status(500).json(error);
    }

});

app.post("/workexperience", async (req, res) => {

    try {

        let result = await Workexperience.create(req.body);
        return res.status(201).json(result);

    } catch (error) {

        return res.status(400).json(error);

    }
});

app.put("/workexperience/:id", async (req, res) => {

    const { companyName, jobTitle, location, startDate, endDate, description } = req.body;

    try {
        await Workexperience.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    companyName: companyName,
                    jobTitle: jobTitle,
                    location: location,
                    startDate: startDate,
                    endDate: endDate,
                    description: description
                }
            }, 
            { runValidators: true }
        );

        res.status(200).json({message: "Arbetserfarenheten har uppdaterats"})

    } catch (error) {
        res.status(400).json({message: "Något gick fel: " + error})
    }

})

app.delete("/workexperience/:id", async (req, res) => {

    try {
        let result = await Workexperience.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Arbetserfarenheten borttagen" });

    } catch (error) {
        res.status(500).json({ message: "Något gick fel: " + error })
    }
})

app.listen(port, () => {
    console.log("Server is running on port: " + port);
}); 