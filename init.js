import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

import "./models/Cafes";
import "./models/users";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
    console.log("✔👍EXPRESS WORKING.");

app.listen(PORT, handleListening);
