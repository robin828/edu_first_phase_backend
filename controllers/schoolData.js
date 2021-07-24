const classModel = require('../models/classModel');
const mongoose = require('mongoose');
const examModel = require('../models/examModel');
const schoolModel = require('../models/schoolModel');
const questionModel = require('../models/questionModel');

const addClass = async (req, res, next) => {
    const { className, subject } = req.body;
    console.log(className)
	try {
		await new classModel({className}).save();
	} catch (error) {
		console.log(error)
	}
	res.send("success")
}

const addExam = async (req, res, next) => {
    const {examName, subjects, className} = req.body;
    // const examSubjects = [];
    // for (const sub of subjects) {
    //     let subId = await subjectModel.aggregate([
    //         { $match: { subject: sub } },
    //         { $project: { _id: 1 } }
    //     ])
    //     examSubjects.push(subId[0]);
    // }
    const newExam = new examModel({
        examName, subjects, className
    })
    let standard;
    try {
        standard = await classModel.findOne({className})
    } catch (error) {
        console.log(error)
    }
    // if(!standard){
    //     return res.status(404).send('Class Not Found while adding exam')
    // }

    const isCheck = await examModel.findOne({examName});
    console.log(isCheck)
    if(!isCheck) {
        await newExam.save();
    }
    
	// const session = await mongoose.startSession();
    // session.startTransaction(); 

    // const isCheck = await examModel.findOne({examName});
    // console.log(isCheck)
    // if(!isCheck) {
    //     await newExam.save();
    // }
        
    // standard.exams.push(newExam);
    // await standard.save({ session });
    // await session.commitTransaction();
    res.send("successfully added Exan");
}

const updateExam = async (req, res, next) => {
    const { examName, subjects } = req.body;
    console.log(examName, subjects);
    let exam;
    try {
        examModel.findByIdAndUpdate(examName,
            { "$push": { "subjects": subjects[0] } },
            { "new": true, "upsert": true }
        );
        // exam = await examModel.find({examName});
        // exam.subjects.push(subjects[0]);
        // exam.save();
        // res.send("successfully added 0th element of subjects array")
    } catch (error) {
        console.log(error)
    }
}

const addSchool = async (req, res, next) => {

    const { schoolName } = req.body;
    let school;
    try {
        school = await schoolModel.findOne({schoolName});
        console.log(school)
        if(!school) {
            school = new schoolModel({schoolName});
            await school.save();
            res.send("School added successfully");
        }else {
            res.send('school already exist')
        }
    } catch (error) {
        console.log(error)
    }
}

const getExam = async (req, res, next) => {
    const { className } = req.query;
    let exams;

    try {
        exams = await examModel.find({className})
    } catch (error) {
        console.log(error);
    }

    res.json({exams})
}

const getSubjects = async (req, res, next) => {
    const { examName } = req.query;
    // console.log(className, '23456789')
    let subjects;

    try {
        subjects = await examModel.find({examName})
        console.log(exams)
    } catch (error) {
        console.log(error);
    }

    res.json({subjects})
}

const getChapter = async (req, res,next) => {
    const {subjectName} = req.query;
    console.log("45")
    if(subjectName==='Science')  {
        res.send({
            chaptersName: [
                "Chemical Reactions and Equations",
                "Acids Bases and Salts",
                "Metals and Non-metals",
                "Carbon and its Compounds",
                "Periodic Classification of Elements",
                "Life Process",
                "Control and Coordination",
                "How do Organisms Reproduce",
                "Heredity and Evolution",
                " Light – Reflection and Refraction",
                "The Human Eye and the Colourful World",
                "Electricity",
                "Magnetic Effects of Electric Current",
                "Sources of Energy",
                "Our Environment",
                "Sustainable Management of Natural Resources"
            ],
            subjectName: "Science",
            className: 'X'
        })
    }
    if(subjectName==='Maths')  {
        res.send({
            chaptersName: [
                "Real Numbers",
                "Acids Bases and Salts",
                "Metals and Non-metals",
                "Carbon and its Compounds",
                "Periodic Classification of Elements",
                "Life Process",
                "Control and Coordination",
                "How do Organisms Reproduce",
                "Heredity and Evolution",
                " Light – Reflection and Refraction",
                "The Human Eye and the Colourful World",
                "Electricity",
                "Magnetic Effects of Electric Current",
                "Sources of Energy",
                "Our Environment",
                "Sustainable Management of Natural Resources"
            ],
            subjectName: "Science",
            className: 'X'
        })
    }
}

// exports.addSubject = addSubject;
exports.addClass = addClass;
exports.addExam = addExam;
exports.addSchool = addSchool;
exports.updateExam = updateExam;
exports.getExam = getExam;
exports.getSubjects = getSubjects;
exports.getChapter = getChapter;
