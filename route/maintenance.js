const router = require('express').Router();
const auth = require('../middleware/auth');
const committeeMember = require('../middleware/committeeMember');
const _ = require('lodash');
const Maintenance = require('../model/maintenanceService');
const { getTotalMaintenance } = require('../services/maintenanceServices');

// To add a maintenance service
router.post('/', auth, committeeMember, async (req, res) => {
    try {
        maintenance = new Maintenance(_.pick(req.body,
            ['maintenanceType', 'status', 'costPerMonth']));
        maintenance.status = maintenance.status.toLowerCase();
        await maintenance.save();
        const total = getTotalMaintenance();

        res.status(201).send({ maintenance, total });
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To get all maintenance services
router.get('/', auth, async (req, res) => {
    try {
        const services = await Maintenance.find({});
       
        
        return res.status(200).send(services);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

module.exports = router;