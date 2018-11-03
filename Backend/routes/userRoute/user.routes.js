const route = require('express').Router();

const activity = require('../../controllers/activity/activity.controller.js');
const users = require('../../controllers/users/user.controller.js');

route.get('/', users.getAllUsers);
route.get('/:id', users.getUser);
route.post('/', users.signUp);
route.put('/:id', users.updateUser);
route.delete('/:id', users.removeUser);
route.post('/login', users.signIn);

route.get('/activities/all', activity.getAllActivities);
route.get('/:id/activities', activity.getActivities);
route.post('/:id', activity.postActivity);
route.delete('/:id/activities', activity.removeActivity);
route.put('/:id/activities', activity.updateActivity);
route.get('/:id/activities/:activityId', activity.getActivity);


module.exports = route; 