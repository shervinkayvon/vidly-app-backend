const {Customer, validate} = require('../models/customer'); 
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const existingPhone = await Customer.findOne({ phone: req.body.phone });
  if (existingPhone) {
    return res.status(400).send('Phone number already exists.');
  }

  let customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  try {
    customer = await customer.save();
    res.send(customer); 
  } catch (error) {
    console.error(error);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  
  const existingPhone = await Customer.findOne({ phone: req.body.phone });
  if (existingPhone) {
    return res.status(400).send('Phone number already exists.');
  }
  
  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.get('/:id', auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router; 