const router = require('express').Router();
const auth = require('../middleware/auth');
const committeeMember = require('../middleware/committeeMember');
const _ = require('lodash');
const Feed = require('../model/newsFeed');


// To fetch the feed
router.get('/', auth, async (req, res) => {
    try { 
        const feed = await Feed.find({});
        return res.status(200).send(feed);
    }
    
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To create a news
router.post('/', auth, async (req, res) => {
    try {
        feed = new Feed(_.pick(req.body,
            ['notificationType', 'content', 'isUrgent']));

        feed.postingMemberId = req.user._id;  // getting userId from auth middleware
        await feed.save();
        res.status(201).send(feed);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})


module.exports = router;