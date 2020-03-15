const mongoose = require('mongoose');

const neighbourhoodServiceSchema = mongoose.Schema({
    serviceType: String,
    serviceName: String,
    contact: String,

});

const neighbourhoodService = mongoose.model('neighbourhoodService', neighbourhoodServiceSchema);

module.exports = neighbourhoodService;