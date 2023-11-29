const mongoose = require('mongoose');

const ProgramSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        organizer: {
            type: String,
            required: true,
        },
        description_1: {
            type: String,
            required: true,
        },
        description_2: {
            type: String,
            required: true,
        },
        description_3: {
            type: String,
        },
        short_desc: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        duration: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        module: [
            {
                id: Number,
                title: String,
                description: String,
            },
        ],
        user: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',  
            },
          ],
        programs: [
            {
                program_id: String,
                status: {
                    type: String,
                    enum: ['active', 'inactive'],
                    default: 'active',
                }
            },
        ],
    },
    {timestamps: true},
);
// Index filter (uncomment if needed)
// ProgramSchema.index({ email: 1 }, { name: "Program_email_idx" });
// ProgramSchema.index({ status: 1 }, { name: "Program_status_idx" });

// Export the model
const Program = mongoose.model("Program", ProgramSchema);
module.exports = Program;
