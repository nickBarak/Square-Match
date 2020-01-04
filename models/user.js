const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ 
    name: String,
    times: Array,
    record: Number
});

module.exports = mongoose.model("User", userSchema);

