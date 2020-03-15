const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
    notificationType: String,
    content: { type: String, maxlength: 300},
    isUrgent: { type: Boolean, default: false},
    postingMemberId: { type: mongoose.Schema.Types.ObjectId }

});

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;
