const router = require('express').Router();
const auth = require('../middleware/auth');
const committeeMember = require('../middleware/committeeMember');
const _ = require('lodash');
const Complaint = require('../model/complaint');

// To make a complaint
router.post('/', auth, async (req, res) => {
    try {
        complaint = new Complaint(_.pick(req.body,
            ['subject', 'complaint']));
        
        complaint.complainingMemberId = req.user._id;  // getting userId from auth middleware
        await complaint.save();
        res.status(201).send(complaint);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// to fetch complaints by complaining member
router.get('/currentUser', auth, async (req, res) => {
    try {
        const complaints = await Complaint.find({ complainingMemberId: req.user._id });
       

        return res.status(200).send(complaints);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To fetch all complaints by committee members
// Using middlewares to prevent unauthorised access
router.get('/', auth, committeeMember, async (req, res) => {
    try {
        const complaints = await Complaint.find({ status: 'pending' });
        return res.status(200).send(complaints);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To deal with an complaint (approve or reject)
router.get('/handle', auth, committeeMember, async (req, res) => {
    try {
        const { complaintId, action } = req.query; // to access url query parameters
        const complaintStatus = Number(action) ? 'resolved' : 'in progress';
        let complaint = await Complaint.findById(complaintId);

        if (!complaint)
            return res.status(404).send("Complaint not found");

        complaint.status = complaintStatus;
        complaint.save();
        return res.status(200).send(complaint);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To send a response about the complaint
router.post('/response', auth, committeeMember, async (req, res) => {
    try {
        const { complaintId, response } = req.body;
        const complaint = await Complaint.findById(complaintId);
        complaint.response = response;
        complaint.save();
        return res.status(200).send(complaint);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

module.exports = router;
