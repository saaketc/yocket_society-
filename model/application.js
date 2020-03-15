const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    subject: String,
    content: String,
    status: { type: String, default: 'pending' },
    applyingMemberId: { type: mongoose.Schema.Types.ObjectId }

});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;