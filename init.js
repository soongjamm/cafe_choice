import app from "./app"

const PORT = 4000;

const handleListening = () =>
    console.log("✔️EXPRESS WORKING.");

app.listen(PORT, handleListening);
