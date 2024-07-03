var express = require('express');
var router = express.Router();
const User = require('../models/users')
const Trip = require('../models/trips')

/* GET users listing. */

router.get('/:userId/viewCart', async (req, res) => {
  if (!req.params.userId) {
    res.json({ result: false, error: 'No User ID provided' });
  } else {
    if (await User.findById(req.params.userId)) {
      const foundUser = await User.findById(req.params.userId);
      if (foundUser.cart != undefined && foundUser.cart != []) {
        foundUser.populate('cart');
        res.json({ result: true, cart: await Trip.find({ _id: foundUser.cart }) });
      } else {
        res.json({ result: false, message: "Cart is empty" });
      }
    } else { res.json({ result: false, error: "User not found" }); }
  }
});


router.post('/:userId/addToCart', async (req, res) => {
  if (!req.params.userId) {
    res.json({ result: false, error: 'No User ID provided' });
  } else {
    const foundUser = await User.findById(req.params.userId);
    if (foundUser) {
      if (req.body.tripId) {


        foundUser.cart.push(req.body.tripId)
        await foundUser.save();
        res.json({ result: true, cart: foundUser.cart });
      } else {
        res.json({ result: false, error: "Missing tripId" });
      }
    } else { res.json({ result: false, error: "User not found" }); }
  }
});


router.post('/:userId/buy', async (req, res) => {
  if (!req.params.userId) {
    res.json({ result: false, error: 'No User ID provided' });
    return;
  }

  const foundUser = await User.findById(req.params.userId);
  if (foundUser) {
    const currentCart = foundUser.cart;
    if (currentCart.length > 0) {
      foundUser.trips.push(currentCart);
      foundUser.cart = [];
      await foundUser.save();
      res.json({ result: true, bookings: foundUser.trips });
    } else {
      res.json({ result: false, error: "Cart is empty" });
    }
  } else { res.json({ result: false, error: "User not found" }); }

});


router.post('/:userId/emptyCart', async (req, res) => {
  if (!req.params.userId) {
    res.json({ result: false, error: 'No User ID provided' });
  } else {
    if (await User.findById(req.params.userId)) {

      const foundUser = await User.findById(req.params.userId);
      const currentCart = foundUser.cart;
      if (currentCart.length > 0) {
        foundUser.cart = [];
      } else {
        res.json({ result: false, error: "Carti is empty" });
      }
    } else { res.json({ result: false, error: "User not found" }); }
  }
});


router.post('/addUser', (req, res) => {
  if (req.body.firstName && req.body.lastName) {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      trips: [],
      cart: []
    });
    newUser.save();
    res.json({ result: true, newUser })
  } else {
    res.json({ result: false, error: 'Missing parameter' });
  }
})

router.delete('/:userId/trips/:tripId', async (req, res) => {
  if (!req.params.userId) {
    res.json({ result: false, error: 'No User ID provided' });
    return
  }
  const searchedUser = await User.findById(req.params.userId)
  if (searchedUser) {
    searchedUser.trips.splice(searchedUser.trips.indexOf(req.params.tripId), 1)
    await searchedUser.save()
    res.json({ result: true, message: "successfully deleted" })
  }

})

module.exports = router;
