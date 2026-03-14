const express = require('express');
const router = express.Router();
const MonetaryDonation = require('../models/MonetaryDonation');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET all monetary donations (admin or public summary)
router.get('/', async (req, res) => {
  try {
    const donations = await MonetaryDonation.find({ isAnonymous: false, status: 'completed' })
      .populate('donor', 'name organization')
      .sort({ createdAt: -1 })
      .limit(20);
    const total = await MonetaryDonation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);
    res.json({ success: true, data: donations, stats: total[0] || { total: 0, count: 0 } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST make a monetary donation
router.post('/', protect, async (req, res) => {
  try {
    const { amount, purpose, message, paymentMethod, isAnonymous } = req.body;
    // Generate mock transaction ID (in production, integrate with payment gateway like Razorpay)
    const transactionId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const donation = await MonetaryDonation.create({
      donor: req.user._id,
      amount,
      purpose,
      message,
      paymentMethod: paymentMethod || 'upi',
      isAnonymous: isAnonymous || false,
      transactionId,
      status: 'completed'
    });
    
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalMonetaryDonations: amount } });
    await donation.populate('donor', 'name organization');
    res.status(201).json({ success: true, data: donation, transactionId });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET my monetary donations
router.get('/my', protect, async (req, res) => {
  try {
    const donations = await MonetaryDonation.find({ donor: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: donations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
