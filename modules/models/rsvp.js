import mongoose from 'mongoose';
const rsvpSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    meetup: { type: mongoose.Schema.Types.ObjectId, ref: 'Meetup', required: true},
    response: {type: String, default: 'yes', required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Rsvp', rsvpSchema);
