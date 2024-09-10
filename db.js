const mongoose = require("mongoose");

const mongoUrl = "mongodb+srv://rutikal045:Rutik2428@cluster0.f3pjx.mongodb.net/foodMern?retryWrites=true&w=majority&appName=Cluster0";


const mongoDB = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        // Fetching data from the 'food_items' collection
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const data = await foodItemsCollection.find({}).toArray();

        // Fetching data from the 'foodCategory' collection
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategoryCollection.find({}).toArray();

        // Storing data globally
        global.food_items = data;
        global.foodCategory = catData;
    } catch (err) {
        console.log("---", err);
    }
};


module.exports = mongoDB;
