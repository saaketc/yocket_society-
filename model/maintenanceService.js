const mongoose = require('mongoose');

const maintenanceSchema = mongoose.Schema({
    maintenanceType: String,
    status: { type: String, default: 'active' },  // Active or not
    costPerMonth: { type: Number, min: 0 },

});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;