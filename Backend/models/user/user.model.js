const mongodb = require('mongoose');
const activity = require('../activity/activity.model.js');

const userSchema = mongodb.Schema({
    _id: mongodb.Schema.Types.ObjectId,
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organisation: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    activities: [{ type: activity, default: [] }]

});

module.exports = mongodb.model('Users', userSchema);