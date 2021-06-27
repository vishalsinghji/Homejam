const mongoose = require('mongoose');

// Student Modal with student Name and  courses refering from course defined.

const studentSchema = mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required:true
    },
})

studentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

studentSchema.set('toJSON', {
    virtuals: true,
});


exports.Student = mongoose.model('Student', studentSchema);