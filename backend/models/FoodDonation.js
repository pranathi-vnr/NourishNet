const mongoose = require('mongoose');

const foodDonationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  foodType: {
    type: String,
    required: [true, 'Food type is required'],
    enum: ['cooked', 'raw', 'packaged', 'bakery', 'fruits_vegetables', 'dairy', 'beverages', 'other']
  },
  quantity: {
    amount: { type: Number, required: true },
    unit: { type: String, enum: ['kg', 'litres', 'servings', 'packets', 'pieces'], default: 'kg' }
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  pickupAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  pickupTimeSlot: {
    from: String,
    to: String
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'completed', 'expired'],
    default: 'available'
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  claimedAt: Date,
  completedAt: Date,
  isVegetarian: {
    type: Boolean,
    default: true
  },
  allergensInfo: String,
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

foodDonationSchema.index({ status: 1, createdAt: -1 });
foodDonationSchema.index({ 'pickupAddress.city': 1 });

module.exports = mongoose.model('FoodDonation', foodDonationSchema);
