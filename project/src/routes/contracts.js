const express = require('express');
const { check, validationResult } = require('express-validator');
const Contract = require('../models/Contract');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', [protect, [
  check('title').notEmpty().withMessage('Title is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('budget').isNumeric().withMessage('Budget must be a number')
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contract = await Contract.create({
      ...req.body,
      clientId: req.user.id
    });

    res.status(201).json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      where: {
        [req.user.role === 'client' ? 'clientId' : 'freelancerId']: req.user.id
      }
    });
    res.json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const contract = await Contract.findOne({
      where: {
        id: req.params.id,
        [req.user.role === 'client' ? 'clientId' : 'freelancerId']: req.user.id
      }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;