const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');


const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
require('dotenv').config();


app.get('/', (req, res) => {
    // shows data and time in json format
    res.json({
        message: 'Hello World!',
        date: new Date()
    });
});

app.get('/weather/:location', async (req, res) => {
     // fetches weather data from openweathermap.org
    const location = req.params.location;
    console.log(location);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`;
    const response = fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
    },
    });
    const weatherData = await (await response).json();
    console.log(weatherData)
    res.json(weatherData);

});




app.get('*', (req, res) => {
    res.status(404).json({
        message: '404 - Not Found',
        date: new Date()
    });
    res.send('404 - Not Found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
