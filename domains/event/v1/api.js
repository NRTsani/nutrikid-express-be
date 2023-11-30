const express = require('express');
const EventService = require('../v1/service');
const User = require('../../users/user')

const routes = express.Router();

// Middleware to parse JSON requests
routes.use(express.json());

// Route to seed events
routes.post('/', async (req, res) => {
  try {
    // Seed events using EventService
    const seededEvents = await EventService.addEvent(req.body);

    res.status(201).json(seededEvents);
  } catch (error) {
    console.error('Error seeding events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch all events
routes.get('/', async (req, res) => {
  try {
    // Fetch all events using EventService
    const events = await EventService.allEvent();

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to search events by query
routes.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    // Search events using EventService
    const events = await EventService.searchEvents(query);

    res.json(events);
  } catch (error) {
    console.error('Error searching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get an event by ID
routes.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    // Get event by ID using EventService
    const event = await EventService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

routes.get('/exclude/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Use OtherEvent function to get all events excluding the specified eventId
    const events = await EventService.OtherEvent(eventId);

    // Find the specific event by ID in the filtered events

    if (!events) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(events);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = routes;
