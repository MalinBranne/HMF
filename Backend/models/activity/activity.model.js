
const mongodb = require('mongoose'); // importing mongoose

const activitySchema = mongodb.Schema({
    _id: mongodb.Schema.Types.ObjectId,
    image: { type: String },
    title: { type: String, required: true },
    text: { type: String, required: true },
    organisation: { type: String },
    location: { type: String, required: true }

});
// module.exports = mongodb.model('Activity', activitySchema); // if I canna create neq db för activities only
module.exports = activitySchema; // to import to specific user activity list