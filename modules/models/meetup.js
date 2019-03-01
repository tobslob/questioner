import mongoose from 'mongoose';
const meetupSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    topic: {type: String, unique: true},
    createdOn: {type: Date, default: Date.now},
    location: String,
    body: String,
    happeningOn: Date,
    Tags: Array,
    meetupImage: { type: String, required: false}
});

module.exports = mongoose.model('Meetup', meetupSchema);