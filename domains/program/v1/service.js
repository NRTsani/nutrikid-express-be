const Program = require('../program');

const addProgram = async (programs) => {
  try {
    // Clear existing data
    await Program.deleteMany();

    // Insert new data
    const seededPrograms = await Program.insertMany(programs);

    return seededPrograms;
  } catch (error) {
    console.error('Error seeding programs:', error);
    throw new Error('Error seeding programs');
  }
};

const allProgram = async () => {
  try {
    // Retrieve all programs from the database
    const programs = await Program.find();

    return programs;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw new Error('Error fetching programs');
  }
};

const searchProgram = async (query) => {
  try {
    // Perform a search based on the title or ObjectId
    const programs = await Program.find({
      ...(query
        ? {
            $or: [
              { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
            ],
          }
        : {}),
    });

    return programs;
  } catch (error) {
    console.error('Error searching programs:', error);
    throw new Error('Error searching programs');
  }
};

const getProgramById = async (programId) => {
  try {
    // Retrieve program by ID
    const program = await Program.findById(programId).populate("user");


    return program;
  } catch (error) {
    console.error('Error fetching program by ID:', error);
    throw new Error('Error fetching program by ID');
  }
};

const OtherProgram = async (programId) => {
  try {
    // Retrieve all programs from the database
    const programs = await Program.find();

    // Filter out the program with programId
    const filteredPrograms = programs.filter(program => program._id != programId);

    // Send the modified programs to the frontend
    return filteredPrograms;
    
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw new Error('Error fetching programs');
  }
};

module.exports = {
  addProgram,
  allProgram,
  searchProgram,
  getProgramById,
  OtherProgram,
};
