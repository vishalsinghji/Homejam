const {Student} = require('../models/student');
const express = require('express');
const {Course } = require('../models/course');
const router = express.Router();
const mongoose = require('mongoose');

// To get all student list with courseId
router.get(`/`, async (req, res) =>{
    let filter = {};
    if(req.query.courses)
    {
         filter = {course: req.query.courses.split(',')}
    }

    const courseList = await Student.find(filter).populate('course');

    if(!courseList) {
        res.status(500).json({success: false})
    } 
    res.send(courseList);
})

// To get specific student with  subject Id
router.get(`/:id`, async (req, res) =>{
    const student = await Student.findById(req.params.id).populate('course');

    if(!student) {
        res.status(500).json({success: false})
    } 
    res.send(student);
})

// Add a new Student with course . If course has not been created it will give message as invalid  Course
router.post(`/`, async (req, res) =>{
    const course = await Course.findById(req.body.courses);
    if(!course) return res.status(400).send('Invalid Course')

    let student = new Student({
        studentName: req.body.studentName,
        courses: req.body.courses,
    })

    student = await student.save();

    if(!student) 
    return res.status(500).send('The product cannot be created')

    res.send(student);
})


//  To update student details of course by Instructor
router.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Student Id')
    }
    const course = await Course.findById(req.body.courses);
    if(!Course) return res.status(400).send('Invalid  Course ')

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
            studentName: req.body.studentName,
            courses: req.body.courses,
        },
        { new: true}
    )

    if(!student)
    return res.status(500).send('the Student details cannot be updated!')

    res.send(student);
})

//  To delete student Details by id
router.delete('/:id', (req, res)=>{
    Student.findByIdAndRemove(req.params.id).then(student =>{
        if(student) {
            return res.status(200).json({success: true, message: 'the student detail has been deleted!'})
        } else {
            return res.status(404).json({success: false , message: "student Detail not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;