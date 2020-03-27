const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  user: {
    type: String,
    required: false
  },
  alarm: {
    type: Boolean,
    required: false
  },
  weatheralarm: {
    type: String,
    required: false
  },
  lastRequest: { 
    type: Date, 
    default: Date.now 
  },
  configurationUpdate: {
    type: Boolean,
    required: false,
    default: false
  },
  location: {
    type: String,
    required: false
  }
});

DeviceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Device', DeviceSchema);