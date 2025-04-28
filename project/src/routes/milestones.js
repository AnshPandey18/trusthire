const express = require('express');
const { check, validationResult } = require('express-validator');
const Milestone = require('../models/Milestone');
const Contract = require('../models/Contract');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', [protect, [
  check('title').notEmpty().withMessage('Title is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('amount').isNumeric().withMessage('Amount must be a number'),
  check('dueDate').isISO8601().withMessage('Invalid date format'),
  check('contractId').notEmpty().withMessage('Contract ID is required')
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contract = await Contract.findOne({
      where: {
        id: req.body.contractId,
        clientId: req.user.id
      }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    const milestone = await Milestone.create(req.body);
    res.status(201).json(milestone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/contract/:contractId', protect, async (req, res) => {
  try {
    const contract = await Contract.findOne({
      where: {
        id: req.params.contractId,
        [req.user.role === 'client' ? 'clientId' : 'freelancerId']: req.user.id
      }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    const milestones = await Milestone.findAll({
      where: { contractId: req.params.contractId }
    });

    res.json(milestones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;