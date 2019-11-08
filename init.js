import app from "./app"
import "./db"
import dotenv from "dotenv";
dotenv.config();
import "./models/Cafes"

const PORT = process.env.PORT || 4000;

const handleListening = () =>
    console.log("✔👍EXPRESS WORKING.");

app.listen(PORT, handleListening);
