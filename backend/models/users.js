// Write your code here
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    trips: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }], required: false, default: [] },
    cart: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }], required: false, default: [] }
});

const User = mongoose.model('users', userSchema);

module.exports = User;