const Event = require('../event');
const User = require('../../users/user')

const addEvent = async (events) => {
  try {
    // Clear existing data
    await Event.deleteMany();

    // Insert new data
    const seededEvents = await Event.insertMany(events);

    return seededEvents;
  } catch (error) {
    console.error('Error seeding events:', error);
    throw new Error('Error seeding events');
  }
};

const allEvent = async () => {
  try {
    // Retrieve all events from the database
    const events = await Event.find();

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Error fetching events');
  }
};

const searchEvents = async (query) => {
  try {
    // Perform a search based on the title or ObjectId
    const events = await Event.find({
      ...(query
        ? {
            $or: [
              { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
            ],
          }
        : {}),
    });

    return events;
  } catch (error) {
    console.error('Error searching events:', error);
    throw new Error('Error searching events');
  }
};

const getEventById = async (eventId) => {
  try {
    // Retrieve event by ID
    const event = await Event.findById(eventId).populate("user");


    return event;
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw new Error('Error fetching event by ID');
  }
};

const OtherEvent = async (eventId) => {
  try {
    // Retrieve all events from the database
    const events = await Event.find();

    // Filter out the event with eventId
    const filteredEvents = events.filter(event => event._id != eventId);

    // Send the modified events to the frontend
    return filteredEvents;
    
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Error fetching events');
  }
};

module.exports = {
  addEvent,
  allEvent,
  searchEvents,
  getEventById,
  OtherEvent,
};
