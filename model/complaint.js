const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    subject: String,
    complaint: String,
    complainingMemberId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, default: 'pending' },
    response: { type: String, default: 'We regret about the issue. The committee will look into it soon.' },

});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;