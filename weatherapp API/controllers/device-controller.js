const express = require('express');
const router = express.Router();
const https = require("https");
const deviceService = require('../helpers/device-auth');
const config = require('../config.json');

//Set APIKEY and URL
var apikey = config.apikey;
var url = new URL(config.url);

/* Register device */
exports.registerDevice =  function registerDevice(req, res, next) {
  deviceService.register(req.query.deviceid)
        .then(() => res.json({}))
        .catch(err => next(err));
};

/* List devices */
exports.devices = function devices(req, res, next) {
    deviceService.getAll(req)
         .then(devices => res.json(devices))
         .catch(err => next(err));
};

/* List devices user */
exports.getdevice = function devices(req, res, next) {
    deviceService.getById(req.params.deviceid)
         .then(devices => res.json(devices))
         .catch(err => next(err));
};

/* List devices user */
exports.configureDevice = function configureDevice(req, res, next) {
    deviceService.update(req)
      .then(devices => res.json(devices))
      .catch(err => next(err));
};

/* Get weather info */
exports.weather = async function weather(req, res, next) {
  deviceService.getById(req.params.deviceid)
         .then(async device => {
              //Check for configurationupdate
              if(device.configurationUpdate){
                await deviceService.setupdated(device.deviceId)
                res.json(device)
              } 
              //Check for location
              else if(!device.location) {
               res.json("Configure device!")
              } else {
                console.log(device.location);
               res.json((await getWeatherData(device.location)));
              }
            })
         .catch(err => next(err));
};

/* Get weather info from Open Weather */
function getWeatherData(city) {
	return new Promise((resolve, reject) => {
		url.searchParams.delete('q');
		url.searchParams.append('q', city);
		url.searchParams.delete('appid');
		url.searchParams.append('appid', apikey);

	https.get(url, res => {
		res.setEncoding("utf8");
  		let body = "";
  		res.on("data", data => {
    		body += data;
  		});
  		res.on("end", () => {
    		body = JSON.parse(body);
    		console.log(body);
    		resolve(body);
  		});
	})
})
}
