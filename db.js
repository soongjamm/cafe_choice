import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
     process.env.MONGO_URL2,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;
const handleOpen = () => console.log("👍connected to mongoDB");
const handleError = (error) => console.log(`Error on connection ${error}`);
db.once("open", handleOpen);
db.on("error", handleError);