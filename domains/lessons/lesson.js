const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema(
    {
        program_id: {
            type: String,
            required: true,
        },
        module_id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        video_url: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        sequence: {
            type: Number,
            required: true,
        },
    },
    {timestamps: true}
);
// Index filter (uncomment if needed)
// LessonSchema.index({ email: 1 }, { name: "Lesson_email_idx" });
// LessonSchema.index({ status: 1 }, { name: "Lesson_status_idx" });

// Export the model
const Lesson = mongoose.model("Lesson", LessonSchema);
module.exports = Lesson;
