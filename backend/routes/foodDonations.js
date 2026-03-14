const express = require('express');
const router = express.Router();
const FoodDonation = require('../models/FoodDonation');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// GET all available food donations (public)
router.get('/', async (req, res) => {
  try {
    const { status, city, foodType, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    else filter.status = 'available';
    if (city) filter['pickupAddress.city'] = new RegExp(city, 'i');
    if (foodType) filter.foodType = foodType;

    const skip = (page - 1) * limit;
    const donations = await FoodDonation.find(filter)
      .populate('donor', 'name organization phone')
      .populate('claimedBy', 'name organization')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await FoodDonation.countDocuments(filter);
    res.json({ success: true, data: donations, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single donation
router.get('/:id', async (req, res) => {
  try {
    const donation = await FoodDonation.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('donor', 'name organization phone email').populate('claimedBy', 'name organization');
    
    if (!donation) return res.status(404).json({ success: false, message: 'Donation not found.' });
    res.json({ success: true, data: donation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create donation (auth required)
router.post('/', protect, async (req, res) => {
  try {
    const donation = await FoodDonation.create({ ...req.body, donor: req.user._id });
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalDonations: 1 } });
    res.status(201).json({ success: true, data: donation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT claim a donation (recipient only)
router.put('/:id/claim', protect, async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id);
    if (!donation) return res.status(404).json({ success: false, message: 'Donation not found.' });
    if (donation.status !== 'available') return res.status(400).json({ success: false, message: 'This donation is no longer available.' });
    if (donation.donor.toString() === req.user._id.toString()) return res.status(400).json({ success: false, message: 'You cannot claim your own donation.' });

    donation.status = 'claimed';
    donation.claimedBy = req.user._id;
    donation.claimedAt = new Date();
    await donation.save();
    await donation.populate('donor', 'name phone email organization');
    res.json({ success: true, data: donation, message: 'Donation claimed successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT mark completed
router.put('/:id/complete', protect, async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id);
    if (!donation) return res.status(404).json({ success: false, message: 'Donation not found.' });
    if (donation.donor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }
    donation.status = 'completed';
    donation.completedAt = new Date();
    await donation.save();
    res.json({ success: true, data: donation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE donation
router.delete('/:id', protect, async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id);
    if (!donation) return res.status(404).json({ success: false, message: 'Donation not found.' });
    if (donation.donor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }
    await donation.deleteOne();
    res.json({ success: true, message: 'Donation deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET my donations
router.get('/user/my-donations', protect, async (req, res) => {
  try {
    const donations = await FoodDonation.find({ donor: req.user._id })
      .populate('claimedBy', 'name organization phone')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: donations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET my claimed donations
router.get('/user/my-claims', protect, async (req, res) => {
  try {
    const donations = await FoodDonation.find({ claimedBy: req.user._id })
      .populate('donor', 'name organization phone email')
      .sort({ claimedAt: -1 });
    res.json({ success: true, data: donations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
