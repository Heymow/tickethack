var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');

/* GET trips listing. */
router.get('/', async function (req, res, next) {
    const allTrips = await Trip.find();
    res.json({ result: true, allTrips });
});

router.get('/search', async (req, res) => {
    if (req.query.departure && req.query.arrival && req.query.date) {
        const formattedDate = new Date(req.query.date)//.toISOString().slice(0, 10);
        //intl
        const dateDay = formattedDate.getDate();
        const dateMonth = formattedDate.getMonth() + 1;
        const dateYear = formattedDate.getFullYear();
        console.log(`${dateDay} ${dateMonth} ${dateYear}`);
        const foundTrip = await Trip.find({

            departure: req.query.departure, arrival: req.query.arrival, date:
                { $regex: '^' + formattedDate.toISOString().slice(0, 10) }
        })
        res.json({ result: true, foundTrip })
    } else if (req.query.departure && req.query.arrival && !req.query.date) {
        const foundTrip = await Trip.find({ departure: req.query.departure, arrival: req.query.arrival })
        res.json({ result: true, foundTrip })
    } else {
        res.json({ result: false, error: "Missing parameter" })
    }
})

module.exports = router;
