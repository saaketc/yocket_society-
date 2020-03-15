const Maintenance = require('../model/maintenanceService');

const getTotalMaintenance = async () => {
    let sum = 0;
    let maintenance = await Maintenance.find({});

    for (let service of maintenance) {
        sum += service.costPerMonth;
    }
    return sum;
}


module.exports = {
    getTotalMaintenance
}