const router = require('express').Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const Member = require('../model/member');
    
router.post('/auth/signup', async (req, res) => {
    try {
        let user = await Member.findOne({ email: req.body.email })
                               .select('-password');
        if (user)
            return res.status(400).send('You are already registered. Please login.');

        user = new Member(_.pick(req.body,
            ['fullName', 'society', 'houseNo', 'ownershipType', 'email', 'password', 'memberType']));
        
        if (user.memberType.toLowerCase() !== 'none') {
            user.isCommitteeMember = true;
        }
            
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = user.generateToken();

        // to whitelist this header in browser and to get that at client end
        return res.header("x-auth-token", token)
                  .header("access-control-expose-headers", "x-auth-token")
                  .status(201).send(user);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// login route
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Member.findOne({ email: email });

        if (!user)
            return res.status(404).send('Email not found');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).send('Invalid credentials.');
        const token = user.generateToken();

        res.status(200).send(token);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})
// Fetch all committee members
router.get('/', auth, async (req, res) => {
    try {
        const members = await Member.find({isCommitteeMember: true});
       
        
        return res.status(200).send(members);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})
module.exports = router;