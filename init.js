import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

// import "./models/cafes";
// import "./models/users";
// import "./models/comments";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
    console.log("✔👍EXPRESS WORKING.");

app.listen(PORT, handleListening);
