const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const crossDomain = require('./middleware/crossDomain');

const app = express();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const startDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/yocket', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to DB');
    }
    catch (e) {
        console.log(e.message);
    }
}
startDB();
const userRoute = require('./route/user');
const applicationRoute = require('./route/application');
const complaintRoute = require('./route/complaint');
const neighbourhoodRoute = require('./route/neighbourhoodService');
const meetingRoute = require('./route/meeting');
const feedRoute = require('./route/feed');
const maintenanceRoute = require('./route/maintenance');


// routes

app.use(crossDomain); // To set response headers for cross domain talks
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/application', applicationRoute);
app.use('/api/complaint', complaintRoute);
app.use('/api/neighbourhood', neighbourhoodRoute);
app.use('/api/meeting', meetingRoute);
app.use('/api/feed', feedRoute);
app.use('/api/maintenance', maintenanceRoute);
app.use(cors());

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));