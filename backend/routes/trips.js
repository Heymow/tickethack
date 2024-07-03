//intl
var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');

/* GET trips listing. */
router.get('/', async function (req, res, next) {
    const allTrips = await Trip.find();
    res.json({ result: true, allTrips });
});

//GET trips by departure, arrival, date
router.post('/search', async (req, res) => {

    const { departure, arrival, date } = req.body;

    const formattedDate = new Date(req.body.date);

    // const dateDay = formattedDate.getDate();
    // const dateMonth = formattedDate.getMonth() + 1;
    // const dateYear = formattedDate.getFullYear();

    const departureArrivalTrips = await Trip.find({ departure, arrival });
    foundTrips = [];

    if (req.body.departure && req.body.arrival && req.body.date) {
        for (let trip of departureArrivalTrips) {
            let tripdate = new Date(trip.date);
            if (tripdate.toISOString().slice(0, 10) === formattedDate.toISOString().slice(0, 10)) {
                foundTrips.push(trip);
            }
        }
        res.json({ result: true, foundTrips });

    } else if (req.body.departure && req.body.arrival && !req.body.date) {
        const foundTrips = await Trip.find({ departure, arrival })
        res.json({ result: true, foundTrips })
    } else {
        res.json({ result: false, error: "Missing parameter" })
    }
})

module.exports = router;
