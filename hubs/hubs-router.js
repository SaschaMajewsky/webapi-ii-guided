const express = require('express');

const Hubs = require('./hubs-model.js');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const hub = await Hubs.add(req.body);
    res.status(201).json(hub);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Hubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const hub = await Hubs.update(req.params.id, req.body);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  }
});

router.get('/:id/messages', async (req, res) => {
  try {
    const hubMessages = await Hubs.findHubMessages(req.params.id);
    if (hubMessages && hubMessages.length < 1) {
      res.status(404).json({ message: 'Hub not found' });
    }
    res.status(200).json(hubMessages);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving messages for the hub',
    });
  }
});

router.post('/:id/messages', async (req, res) => {
  try {
    if (!req.body.sender || !req.body.text || !req.body.hub_id) {
      res.status(400).json({ message: 'Message needs more information found' });
    }
    const newHubMessage = await Hubs.addMessage(req.body);
    if (newHubMessage && newHubMessage.length < 1) {
      res.status(404).json({ message: 'Hub not found' });
    }
    res.status(201).json(newHubMessage);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: `Error creating message for the hub + ${error}`,
    });
  }
});

module.exports = router;
