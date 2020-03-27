const express = require('express');
const router = express.Router();
const https = require("https");
const deviceController = require('../controllers/device-controller');
const userController = require('../controllers/user-controller');
const jwt = require('../helpers/jwt');

//Roles
const roles = {
	User: "user",
	Admin: "admin"
};

// User Routes
router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/allusers', jwt(roles.Admin), userController.getAll);

//Configure user
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController._delete);

// Device Routes
router.post('/device', deviceController.registerDevice);
router.get('/devices/alldevices', jwt([roles.User, roles.Admin]), deviceController.devices);
router.get('/devices/:deviceid', deviceController.getdevice);

// Configure Device
router.put('/devices/configure/:deviceid', jwt([roles.User, roles.Admin]), deviceController.configureDevice);

// Weather Routes
router.get('/devices/weatherinfo/:deviceid', deviceController.weather);

module.exports = router;

