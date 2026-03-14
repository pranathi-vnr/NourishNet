const express = require('express');
const router = express.Router();
const FoodDonation = require('../models/FoodDonation');
const MonetaryDonation = require('../models/MonetaryDonation');
const User = require('../models/User');
const Club = require('../models/Club');

router.get('/', async (req, res) => {
  try {
    const [totalUsers, totalFoodDonations, activeDonations, completedDonations, monetaryStats, totalClubs] = await Promise.all([
      User.countDocuments(),
      FoodDonation.countDocuments(),
      FoodDonation.countDocuments({ status: 'available' }),
      FoodDonation.countDocuments({ status: 'completed' }),
      MonetaryDonation.aggregate([{ $match: { status: 'completed' } }, { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }]),
      Club.countDocuments({ isActive: true })
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalFoodDonations,
        activeDonations,
        completedDonations,
        totalMonetaryAmount: monetaryStats[0]?.total || 0,
        totalMonetaryDonations: monetaryStats[0]?.count || 0,
        totalClubs,
        mealsServed: completedDonations * 10 // approximate
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
