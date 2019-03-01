import mongoose from 'mongoose';
const questionSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    createdOn: {type: Date, default: Date.now},
    title: {type: String, unique: true},
    votes: Number,
    body: String,
});

module.exports = mongoose.model('Question', questionSchema);
