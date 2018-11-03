const mongodb = require('mongoose');


//MongoDB Schemas
const User = require('../../models/user/user.model.js');
const Activity = require('../../models/activity/activity.model.js');

// GET ALL ACTIVITIES
exports.getAllActivities = (req, res) => {
    User.find()
        .select("activities")
        .exec()
        .then(users => {
            if (users) {
                console.log('Backend log: ' + users);
                res.status(200).json(users);
            } else {
                res.status(400).json({ message: "No activities found." });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

//TRY IN FRONTEND: for each user log user.activities





//GET USER ACTIVITIES
exports.getActivities = (req, res, ) => {
    User.findOne({ _id: req.params.id }, function (err, user) {
        console.log(user);
        res.status(200).json(user.activities)
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
    })
};



//GET SPECIFIC ACTIVITY
exports.getActivity = (req, res) => {
    //pass in the user param (the unique ID), and use that to do our diary lookup
    User.findOne({
        /* query */
        _id: req.params.id,
        'activities._id': req.params.activityId
    },
        {  /* projection */
            "activities.$": 1,
            "_id": 0
        },
        function (err, data) {

            if (err) return console.log(err);
            res.json(data)
        });
};

/************************************** */

// POST ACTIVITY
exports.postActivity = (req, res, next) => {

    let id = new mongodb.Types.ObjectId;

    // let activity = new Activity({
    //     _id: id,
    //     image: req.body.image,
    //     title: req.body.title,
    //     text: req.body.text,
    //     organisation: req.body.organisation,
    //     location: req.body.location
    // });

    // activity.save()
    //     .then((result) => console.log(result))
    //     .catch((err) => console.log(err));

    // res.status(201).json({
    //     activity: activity
    // });

    User.findOne({ _id: req.params.id }, function (err, user) {

        console.log(user),
            user.activities.push({
                _id: id,
                image: req.body.image,
                title: req.body.title,
                text: req.body.text,
                organisation: req.body.organisation,
                location: req.body.location
            })
        user.save()
            .then((result) => console.log(result))
            .catch((err) => console.log(err));

        res.status(201).json({
            user: user
        })
    });
}

//UPDATING ACTIVITY
exports.updateActivity = (req, res) => {

    User.update({ 'activities._id': req.body._id }, {
        '$set': {
            'activities.$.title': req.body.title,
            'activities.$.text': req.body.text,
            'activities.$.organisation': req.body.organisation
        }
    },
        function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            return res.status(200).json({ model: model });
        }
    );
}



//REMOVE ACTIVITY
exports.removeActivity = (req, res) => {

    User.findOne({ _id: req.params.id }, function (err, user) {
        user.activities.pull({
            _id: req.body._id
        })

        user.save()
            .then((result) => console.log(result))
            .catch((err) => console.log(err));

        res.status(200).json({
            user: user
        })
    });
}
