const mongoose = require('mongoose');

const monetaryDonationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Minimum donation is ₹1']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  purpose: {
    type: String,
    enum: ['general', 'food_distribution', 'logistics', 'infrastructure'],
    default: 'general'
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  paymentMethod: {
    type: String,
    enum: ['upi', 'card', 'netbanking', 'wallet'],
    default: 'upi'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  receipt: String
}, { timestamps: true });

module.exports = mongoose.model('MonetaryDonation', monetaryDonationSchema);
