const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://himan:hi@cluster0.vltxm.mongodb.net/project', { useNewUrlParser: true, useUnifiedTopology: true });

const Device = require('./models/device');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 5000;

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        if (err == true) {
            return res.send(err);
        } else {
            return res.send(devices);
        }
    });
});

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

app.post('/api/devices', (req, res) => {
    const { LightID, name, sensorData, temp } = req.body;
    const newDevice = new Device({
        LightID,
        name,
        sensorData,
        temp
    });
    newDevice.save(err => {
        return err
            ? res.send(err)
            : res.send('successfully added device and data');
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});