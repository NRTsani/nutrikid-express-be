const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
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
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        user: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
    },
);
// Index filter (uncomment if needed)
// eventSchema.index({ email: 1 }, { name: "event_email_idx" });
// eventSchema.index({ status: 1 }, { name: "event_status_idx" });

// Export the model
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
