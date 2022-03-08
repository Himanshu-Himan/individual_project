const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({
    LightID: String,
    name: String,
    sensorData: Array,
    temp: Number
}, { collection: 'topic' }));