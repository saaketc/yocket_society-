const router = require('express').Router();
const auth = require('../middleware/auth');
const committeeMember = require('../middleware/committeeMember');
const _ = require('lodash');
const Application = require('../model/application');


// Route for sending any application by a member
router.post('/', auth, async (req, res) => {
    try {
         application = new Application(_.pick(req.body,
            ['subject', 'content']));
        
        application.applyingMemberId = req.user._id; // getting userId from auth middleware
        await application.save();

        return res.status(201).send(application);

    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To fetch all applications by applying member
router.get('/currentUser', auth, async (req, res) => {
    try {
        const applications = await Application.find({ applyingMemberId: req.user._id });
        
        return res.status(200).send(applications);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})



// To fetch all applications by committee members
// Using middlewares to prevent unauthorised access
router.get('/', auth, committeeMember, async (req, res) => {
    try {
        const applications = await Application.find({ status: 'pending' });
        return res.status(200).send(applications);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To deal with an application (approve or reject)
router.get('/handle', auth, committeeMember, async (req, res) => {
    try {
        const { applicationId, action } = req.query; // to access url query parameters
        const applicationStatus = Number(action) ? 'approved' : 'rejected';
        let application = await Application.findById(applicationId);

        if (!application)
            return res.status(404).send("Application not found");

        application.status = applicationStatus;
        application.save();
        return res.status(200).send(application);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

module.exports = router;