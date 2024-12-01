// Import required packages
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize Express app
const app = express();

// Enable CORS for all routes (you can configure this more specifically if needed)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Example API Route
app.get('/state-api', async (req, res) => {
    try {
        const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        res.json(response.data);  // Return the data to the frontend
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ error: 'Failed to fetch states' });
    }
});

// City API Route (POST)
app.post('/city-api', async (req, res) => {
    const { state_id } = req.body;
    console.log(state_id);
    let arrray = [];
    try {
        const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Districts:', JSON.stringify(response.data.districts, null, 2));

        // Iterate and print district names
        response.data.districts.forEach(district => {
            console.log(`District ID: ${district.district_id}, District Name: ${district.district_name}`);
            arrray.push(district.district_name);
        });
        console.log(arrray);
        const data = {
            "districts" : arrray
        };
        res.json(data);  // Return the data to the frontend
    } catch (error) {
        console.error('Error fetching districts:', error);
        res.status(500).json({ error: 'Failed to fetch districts' });
    }
});

// Another example POST route
app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    console.log('Received Data:', receivedData);

    res.json({ message: 'Data received successfully', receivedData });
});

// Set up server to listen on port 3000
const PORT = process.env.PORT || 7009;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
