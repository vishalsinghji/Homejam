const mongoose = require('mongoose');

// Course Modal  
const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    instructorName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required:false
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

courseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

courseSchema.set('toJSON', {
    virtuals: true,
});


exports.Course = mongoose.model('Course', courseSchema);