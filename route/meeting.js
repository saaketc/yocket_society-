const router = require('express').Router();
const auth = require('../middleware/auth');
const committeeMember = require('../middleware/committeeMember');
const _ = require('lodash');
const Meeting = require('../model/meeting');
const Feed = require('../model/newsFeed');

// To create a meeting
router.post('/', auth, committeeMember, async (req, res) => {
    try {
        meeting = new Meeting(_.pick(req.body,
            ['agenda', 'dateOfMeeting', 'time', 'venue', 'participatingMembers']));

        meeting.schedulingMember = req.user._id;  // getting userId from auth middleware
        await meeting.save();

        // to push meeting info into news feed
        const feed = new Feed();
        feed.notificationType = 'Meeting';
        feed.content =
       `Agenda: ${meeting.agenda} 
        Date: ${meeting.dateOfMeeting}
        Time: ${ meeting.time}
        Venue: ${meeting.venue}`;
        feed.isUrgent = true;
        feed.postingMemberId = req.user._id;
        await feed.save();

        res.status(201).send(meeting);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

/* 
Post meeting handling routes 
to ensure successful completion of the meeting
*/

// To add minutes, conclusion of the meeting
router.post('/minutes/:meetingId', auth, committeeMember, async (req, res) => {
    try {
        const meetingId = req.params.meetingId;
        const { minutes, conclusion } = req.body;
        let meeting = await Meeting.findById(meetingId);

        if (!meeting)
            return res.status(404).send('No meeting found');

        meeting.minutes = minutes;
        meeting.conclusion = conclusion;
        meeting.status = 'completed';
        await meeting.save();

        res.status(201).send(meeting);
   }

     catch (e) {
        return res.status(500).send(e.message);
    }
})

// To mark attendance 
router.post('/attendance/:meetingId', auth, committeeMember, async (req, res) => { 
    try {
        const meetingId = req.params.meetingId;
        const { presentMembers } = req.body;
        let meeting = await Meeting.findById(meetingId);

        if (!meeting)
            return res.status(404).send('No meeting found');
        
        meeting.presentMembers = presentMembers;
        await meeting.save();

        res.status(201).send(meeting);
    }
     
    catch (e) {
        return res.status(500).send(e.message);
    }
})

/*
Meetings information fetching
routes
*/

// To fetch all meetings for all members
router.get('/', auth, async (req, res) => {
    try {
        const meetings = await Meeting.find({}).sort('dateOfMeeting');
        return res.status(200).send(meetings);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

module.exports = router;