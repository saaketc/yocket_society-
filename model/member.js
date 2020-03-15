const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const memberSchema = mongoose.Schema({
    fullName: String,
    society: String,
    houseNo: String,
    ownershipType: String,
    maintenanceStatus: { type: String, default: 'pending'},
    maintenanceAmount: { type: Number, min:0, default: 0 },
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    memberType: String,
    isCommitteeMember: { type: Boolean, default: false }

});

memberSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, fullName: this.fullName, society: this.society, memberType: this.memberType, isCommitteeMember: this.isCommitteeMember }, 'secretKeyForTheApplication');
    return token;
}  
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;