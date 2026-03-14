const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const { protect, authorize } = require('../middleware/auth');

// GET all clubs
router.get('/', async (req, res) => {
  try {
    const { city, state } = req.query;
    const filter = { isActive: true };
    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (state) filter['address.state'] = new RegExp(state, 'i');
    const clubs = await Club.find(filter).sort({ totalDonationsReceived: -1 });
    res.json({ success: true, data: clubs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single club
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate('manager', 'name email phone');
    if (!club) return res.status(404).json({ success: false, message: 'Club not found.' });
    res.json({ success: true, data: club });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create club (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const club = await Club.create({ ...req.body, manager: req.user._id });
    res.status(201).json({ success: true, data: club });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Seed clubs endpoint (for development)
router.post('/seed', protect, authorize('admin'), async (req, res) => {
  try {
    await Club.deleteMany({});
    const clubs = await Club.insertMany(seedClubs);
    res.json({ success: true, data: clubs, message: `${clubs.length} clubs seeded.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const seedClubs = [
  { name: 'NourishNet Hyderabad Central', description: 'Main hub for Hyderabad food distribution', address: { street: 'HITEC City', city: 'Hyderabad', state: 'Telangana', pincode: '500081' }, coordinates: { lat: 17.4474, lng: 78.3762 }, contact: { phone: '+91-9876543210', email: 'hyderabad@nourishnet.in' }, operatingHours: { weekdays: '8am - 8pm', weekends: '9am - 5pm' }, acceptedTypes: ['cooked', 'packaged', 'fruits_vegetables'], isActive: true },
  { name: 'NourishNet Banjara Hills', description: 'Serving Banjara Hills and surrounding areas', address: { street: 'Road No. 12', city: 'Hyderabad', state: 'Telangana', pincode: '500034' }, coordinates: { lat: 17.4151, lng: 78.4482 }, contact: { phone: '+91-9876543211', email: 'banjarahills@nourishnet.in' }, operatingHours: { weekdays: '9am - 7pm', weekends: '10am - 4pm' }, acceptedTypes: ['cooked', 'raw', 'packaged'], isActive: true },
  { name: 'NourishNet Secunderabad', description: 'Covering Secunderabad and Malkajgiri', address: { street: 'MG Road', city: 'Secunderabad', state: 'Telangana', pincode: '500003' }, coordinates: { lat: 17.4399, lng: 78.4983 }, contact: { phone: '+91-9876543212', email: 'secunderabad@nourishnet.in' }, operatingHours: { weekdays: '7am - 9pm', weekends: '8am - 6pm' }, acceptedTypes: ['cooked', 'packaged', 'dairy', 'bakery'], isActive: true },
  { name: 'NourishNet Mumbai North', description: 'North Mumbai collection point', address: { street: 'Andheri West', city: 'Mumbai', state: 'Maharashtra', pincode: '400058' }, coordinates: { lat: 19.1136, lng: 72.8697 }, contact: { phone: '+91-9876543213', email: 'mumbainorth@nourishnet.in' }, operatingHours: { weekdays: '8am - 8pm', weekends: '9am - 5pm' }, acceptedTypes: ['cooked', 'packaged', 'fruits_vegetables'], isActive: true },
  { name: 'NourishNet Bangalore Tech Hub', description: 'Serving Whitefield and Electronic City', address: { street: 'Whitefield', city: 'Bangalore', state: 'Karnataka', pincode: '560066' }, coordinates: { lat: 12.9698, lng: 77.7499 }, contact: { phone: '+91-9876543214', email: 'bangalore@nourishnet.in' }, operatingHours: { weekdays: '8am - 8pm', weekends: '9am - 5pm' }, acceptedTypes: ['cooked', 'raw', 'packaged', 'bakery'], isActive: true },
  { name: 'NourishNet Chennai Central', description: 'Chennai\'s main food redistribution hub', address: { street: 'Anna Nagar', city: 'Chennai', state: 'Tamil Nadu', pincode: '600040' }, coordinates: { lat: 13.0827, lng: 80.2707 }, contact: { phone: '+91-9876543215', email: 'chennai@nourishnet.in' }, operatingHours: { weekdays: '7am - 9pm', weekends: '8am - 6pm' }, acceptedTypes: ['cooked', 'packaged', 'fruits_vegetables', 'dairy'], isActive: true },
];

module.exports = router;
