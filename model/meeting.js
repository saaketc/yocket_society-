const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    agenda: { type: String, required: true },
    dateOfMeeting: Date,
    time: String,
    venue: String,
    minutes: String,
    conclusion: String, 
    status: { type: String, default: 'active' }, // or mark as completed when done
    schedulingMember: { type: mongoose.Schema.Types.ObjectId },
    presentMembers: [{ type: mongoose.Schema.Types.ObjectId }],  // To mark attendance
    participatingMembers: { type: String, default: 'everyone'} // everyone or only committee members

});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;