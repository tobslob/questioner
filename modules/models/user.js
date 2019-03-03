import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userImage: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    otherName: { type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    createdOn: {type: Date, default: Date.now},
    phoneNumber: {type: Number, default: Date.now},
    isAdmin: {type: String, default: false}
});

module.exports = mongoose.model('User', userSchema);