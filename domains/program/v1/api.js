const express = require('express');
const Program = require('../program'); // Adjust the path accordingly
const ProgramService = require('../v1/service')

const routes = express.Router();

// Middleware to parse JSON requests
routes.use(express.json());

// Route to seed Programs
routes.post('/', async (req, res) => {
  try {
    // Clear existing data
    await Program.deleteMany();

    // Insert new data
    const seededPrograms = await Program.insertMany(req.body);

    res.status(201).json(seededPrograms);
  } catch (error) {
    console.error('Error seeding Programs:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to fetch Programs
routes.get('/', async (req, res) => {
  try {
    // Retrieve Programs from the database
    const Programs = await Program.find();

    // Respond with the Programs as JSON
    res.json(Programs);
  } catch (error) {
    console.error('Error fetching Programs:', error);
    res.status(500).send('Internal Server Error');
  }
});

routes.get('/search', async (req, res) => {
  try {
    const query = req.query.q; // Assuming the search query is passed as a query parameter
    const Programs = await ProgramService.searchPrograms(query);
    res.json(Programs);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Route to get an program by ID
routes.get('/:programId', async (req, res) => {
  try {
    const programId = req.params.programId;
    // Get program by ID using programService
    const program = await ProgramService.getProgramById(programId);

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    res.json(program);
  } catch (error) {
    console.error('Error fetching program by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

routes.get('/exclude/:programId', async (req, res) => {
  try {
    const programId = req.params.programId;

    // Use Otherprogram function to get all programs excluding the specified programId
    const programs = await ProgramService.OtherProgram(programId);

    // Find the specific program by ID in the filtered programs

    if (!programs) {
      return res.status(404).json({ error: 'Program not found' });
    }

    res.json(programs);
  } catch (error) {
    console.error('Error fetching program by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = routes