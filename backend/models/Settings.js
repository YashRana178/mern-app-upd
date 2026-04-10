const mongoose = require('mongoose');
const settingsSchemema = new mongoose.Schema({
    title: String,
    isActive: Boolean,
    image: String });
    module.exports = mongoose.model("Settings", settingsSchemema);
    

    