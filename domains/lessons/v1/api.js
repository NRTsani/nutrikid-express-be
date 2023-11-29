const express = require('express');
const Lesson = require('../lesson'); // Adjust the path accordingly
const LessonService = require('../v1/service')

const routes = express.Router();

// Middleware to parse JSON requests
routes.use(express.json());

// Route to seed Lessons
routes.post('/', async (req, res) => {
  try {
    // Clear existing data
    await Lesson.deleteMany();

    // Insert new data
    const seededLesson = await Lesson.insertMany(req.body);

    res.status(201).json(seededLesson);
  } catch (error) {
    console.error('Error seeding Lesson:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to fetch Lessons
routes.get('/', async (req, res) => {
  try {
    // Retrieve Lessons from the database
    const Lessons = await Lesson.find();

    // Respond with the Lessons as JSON
    res.json(Lessons);
  } catch (error) {
    console.error('Error fetching Lesson:', error);
    res.status(500).send('Internal Server Error');
  }
});

routes.get('/search', async (req, res) => {
  try {
    const query = req.query.q; // Assuming the search query is passed as a query parameter
    const Lesson = await LessonService.searchLessons(query);
    res.json(Lesson);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

routes.get('/:moduleId', async (req, res) => {
  try {
    const moduleId = req.params.moduleId; // Extract the moduleId from the URL parameter
    const lessons = await LessonService.searchLessonsByModuleId(moduleId);

    res.json(lessons);
  } catch (error) {
    console.error('Error in moduleId endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = routes