const router = require('express').Router();
const auth = require('../middleware/auth');
const _ = require('lodash');
const Neighbourhood = require('../model/neighbourhoodService');

// To add a neighbourhood service
router.post('/', auth, async (req, res) => {
    try {
        const service = new Neighbourhood(_.pick(req.body,
            ['serviceType', 'serviceName', 'contact']));
        await service.save();
        res.status(201).send(service);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To get all services
router.get('/', auth, async (req, res) => {
    try {
        const services = await Neighbourhood.find({});
       
        
        return res.status(200).send(services);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})


// To update a service contact
router.post('/:serviceId', auth, async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const service = await Neighbourhood.findById(serviceId);
        service.contact = req.body.contact;
        await service.save();
        res.status(201).send(service);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

module.exports = router;