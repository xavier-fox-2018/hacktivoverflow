const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Achievement name must not be empty']
    }
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;