const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    ip_address: { type: String }
}, { timestamps: true });

const Schema = mongoose.model('users', UserSchema);
module.exports = { Schema };