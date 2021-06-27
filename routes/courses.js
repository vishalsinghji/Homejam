const {Course} = require('../models/course');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//  To get all courses
router.get(`/`, async (req, res) =>{
    const courseList = await Course.find();

    if(!courseList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(courseList);
})

// To get course with Id 
router.get('/:id', async(req,res)=>{
    const course = await Course.findById(req.params.id);

    if(!course) {
        res.status(500).json({message: 'The course with the given ID was not found.'})
    } 
    res.status(200).send(course);
})


// To  create a new course
router.post('/', async (req,res)=>{
    let course = new Course({
        courseName: req.body.courseName,
        instructorName: req.body.instructorName,
        description: req.body.description ,
        price: req.body.price,
        category: req.body.category,
    })
    course = await course.save();

    if(!course)
    return res.status(400).send('the course cannot be created!')
    res.send(course);
})

// To update any course
router.put('/:id',async (req, res)=> {
    const course = await Course.findByIdAndUpdate(
        req.params.id,
        {
        courseName: req.body.courseName,
        instructorName: req.body.instructorName,
        description: req.body.description ,
        price: req.body.price,
        category: req.body.category,
            
        },
        { new: true}
    )

    if(!course)
    return res.status(400).send('the course cannot be created!')

    res.send(course);
})

// To delete a course
router.delete('/:id', (req, res)=>{
    Course.findByIdAndRemove(req.params.id).then(course =>{
        if(course) {
            return res.status(200).json({success: true, message: 'the course is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "course not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;