const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: { type: String, required: [true, 'this field is required.'] },
  value: { type: Number, required: [true, 'this field is required.'], min: 0 },
  category: { type: String, required: [true, 'this field is required.'] },
  year: { type: Number, required: [true, 'this field is required.'] },
  month: { type: Number, required: [true, 'this field is required.'] },
  day: { type: Number, required: [true, 'this field is required.'] },
  yearMonth: {
    type: String,
    required: [true, 'this field is required. Format: yyyy-mm'],
  },
  yearMonthDay: {
    type: String,
    required: [true, 'this field is required. Format: yyyy-mm-dd'],
  },
  type: { type: String, required: [true, 'this field is required.'] },
});

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
