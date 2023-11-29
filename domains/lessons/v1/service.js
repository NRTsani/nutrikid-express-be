const Lesson = require('../lesson');

const addLesson = async (Lessons) => {
  try {
    // Clear existing data
    await Lesson.deleteMany();

    // Insert new data
    const seededLessons = await Lesson.insertMany(Lessons);

    return seededLessons;
  } catch (error) {
    console.error('Error seeding Lessons:', error);
    throw new Error('Error seeding Lessons');
  }
};

const allLesson = async () => {
  try {
    // Retrieve all Lessons from the database
    const Lessons = await Lesson.find();

    return Lessons;
  } catch (error) {
    console.error('Error fetching Lessons:', error);
    throw new Error('Error fetching Lessons');
  }
};

const searchLessons = async (query) => {
  try {
    // Perform a search based on the title or ObjectId
    const Lessons = await Lesson.find({
      ...(query
        ? {
            $or: [
              { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
            ],
          }
        : {}),
    });

    return Lessons;
  } catch (error) {
    console.error('Error searching Lessons:', error);
    throw new Error('Error searching Lessons');
  }
};

const getLessonById = async (LessonId) => {
  try {
    // Retrieve Lesson by ID
    const Lesson = await Lesson.findById(LessonId);

    return Lesson;
  } catch (error) {
    console.error('Error fetching Lesson by ID:', error);
    throw new Error('Error fetching Lesson by ID');
  }
};

const searchLessonsByModuleId = async (moduleId) => {
  try {
    // Convert the moduleId to a number
    const moduleIdNumber = parseInt(moduleId, 10);

    // Perform a search based on the module_id
    const lessons = await Lesson.find({
      ...(moduleIdNumber
        ? { module_id: moduleIdNumber }
        : {}),
    });

    return lessons;
  } catch (error) {
    console.error('Error searching Lessons by module_id:', error);
    throw new Error('Error searching Lessons by module_id');
  }
};


module.exports = {
  addLesson,
  allLesson,
  searchLessons,
  getLessonById,
  searchLessonsByModuleId,
};
