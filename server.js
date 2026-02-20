// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Tell the server to parse incoming JSON data and serve the 'public' folder
app.use(express.json()); 
app.use(express.static('public')); 

// This variable temporarily holds the latest data from the ESP32
let sensorData = {
    alcohol: 0,
    humidity: 0,
    temp: 0,
    status: "Idle"
};

// --- ENDPOINT 1: ESP32 sends data here ---
app.post('/api/update', (req, res) => {
    sensorData = req.body;
    console.log("New data from ESP32:", sensorData);
    res.send("Data Received");
});

// --- ENDPOINT 2: The Dashboard fetches data from here ---
app.get('/api/data', (req, res) => {
    res.json(sensorData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});