const mongodb = require('mongoose');
const encrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user/user.model.js');


// //User Functions


exports.signIn = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length === 0) {
                return res.status(401).json({ message: "email or password is incorrect or empty." });
            } else {
                encrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: "email or password is incorrect or empty." });
                    }

                    if (result) {
                        const token = jwt.sign(
                            { userId: user[0]._id, email: user[0].email, firstname: user[0].firstname, lastname: user[0].lastname },
                            process.env.PRIVATE_SECRET_KEY,
                            { expiresIn: "72h" });

                        return res.status(200).json({ message: "Authentication was successful", userId: user[0]._id, email: req.body.email, token: token });
                    }

                    res.status(401).json({ message: "email or password is incorrect or empty." });
                });
            }
        })
        .catch(() => res.status(500).json({ errorcode: "500", message: "Something went wrong while signing in the user. Please contact the System Administrator." }));
}


exports.signUp = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(400).json({ message: `User: ${req.body.email} already exist.` });
            } else {
                encrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err && err != {}) {
                        return res.status(500).json({ error: err });
                    } else {
                        let user = new User({
                            _id: new mongodb.Types.ObjectId,
                            email: req.body.email,
                            password: hash,
                            organisation: req.body.organisation,
                            phone: req.body.phone,
                            website: req.body.website
                        });

                        user.save()
                            .then(() => res.status(201).json({ message: `The user ${req.body.email} was successfully created. Please login to access the api.` }))
                            .catch((err) => res.status(500).json({ errorcode: "500", message: "Something went wrong while creating the user. Please contact the System Administrator.", err }));
                    }
                });
            }
        })
        .catch(() => res.status(500).json({ errorcode: "500", message: "Something went wrong while creating the user. Please contact the System Administrator." }));
}

exports.getAllUsers = (req, res) => {
    User.find()
        .exec()
        .then(users => res.status(200).json(users))
        .catch(() => res.status(500).json({ errorcode: "500", message: "Something went wrong while signing in the user. Please contact the System Administrator." }));
}


exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, { $set: { email: req.body.email, password: req.body.password, organisation: req.body.organisation, phone: req.body.phone, website: req.body.website } }, { new: true }, function (err, doc) {

        if (err) {
            console.log("Something wrong when updating data!");
        }
        err ? res.status(500).json({ error: err }) : res.status(200).json(doc)
    });
}

exports.removeUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .exec()
        .then(() => res.status(200).json({ message: `The user ${req.params.id} was successfully removed.` }))
        .catch(() => res.status(500).json({ errorcode: "500", message: "Something went wrong while signing in the user. Please contact the System Administrator." }));
}
exports.getUser = (req, res) => {
    console.log("getUser", req.params.id)
    User.findById({ _id: req.params.id })
        .select("_id email organisation phone website activities")
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: "The selected user was not found." });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};


