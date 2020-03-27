const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');
const Device = db.Device;

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll(req) {
    //User Sub/id can't be undefined
    if(!req.user.sub){
        return {}
    }

    if(req.user.role == "admin"){ //Administrator
        return await Device.find().select('-hash');
    } else { //Normal user
       return await Device.find({user: req.user.sub});
    }
    
}

async function getById(deviceid) {
    
    return await Device.findOne({ deviceId: deviceid }).select(['-hash', '-__v', '-_id']);
}

async function register(deviceId) {
    console.log(deviceId)
    // check for existing deviceId
    if (await Device.findOne({ deviceId: deviceId })) {
        throw 'DeviceID "' + deviceId + '" is already taken. Call support!';
    }
    
    var deviceObj = {
        deviceId: deviceId,
    };

    const device = new Device(deviceObj);

    // save user
    await device.save();
}

async function update(req) {
     const device = await Device.findOne({ deviceId: req.params.deviceid });

    // validate
    if (!device) throw 'Device not found';

    if(req.body.deviceid && !device.user){
        device["user"] = req.user.sub;
    }
    // copy body params properties to device
    device["location"] = req.body.Location;
    device["alarm"] = (req.body.WeatherAlarm == "true") ? true : false;
    device["weatheralarm"] = req.body.WeatherType;
    device["configurationUpdate"] = true;

    await device.save();
}

async function setupdated(deviceid) {
     const device = await Device.findOne({ deviceId: deviceid });

    // validate
    if (!device) throw 'Device not found';

    device["configurationUpdate"] = false;
    return device.save();
}


async function _delete(id) {
    await User.findByIdAndRemove(id);
}

module.exports = {
    authenticate,
    getAll,
    getById,
    register,
    update,
    setupdated,
    delete: _delete
};