const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Club name is required'],
    trim: true
  },
  description: String,
  address: {
    street: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: String
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  operatingHours: {
    weekdays: String,
    weekends: String
  },
  acceptedTypes: [String],
  capacity: String,
  isActive: { type: Boolean, default: true },
  image: String,
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalDonationsReceived: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
