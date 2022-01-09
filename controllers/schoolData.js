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

    const { schoolName, address, ownerName, ownerNumber, ownerEmailId } = req.body;
    let school;
    try {
        school = await schoolModel.findOne({ownerEmailId});
        console.log(school)
        if(!school) {
            school = new schoolModel({schoolName, address, ownerName, ownerNumber, ownerEmailId});
            await school.save();
            res.send("School added successfully");
        }else {
            res.send('school already exist')
        }
    } catch (error) {
        console.log(error)
    }
}

const checkSchool = async(req, res, next) => {
    const { schoolName } = req.body;
    let school;
    try {
        school = await schoolModel.find({schoolName});
    } catch (error) {
        console.log(error)
    }
    if(school.length>0) res.send(true);
    else res.send(false);
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
    const {subjectName, examName} = req.query;
    console.log("45")
    if(subjectName==='Science')  {
        res.send({
            chaptersName: [
                "Chemical Reactions and Equations",
                "Acids Bases and Salts",
                "Metals and Non-metals",
                "Life Process",
                " Light – Reflection and Refraction",
                "The Human Eye and the Colourful World",
            ],
            subjectName: "Science",
            className: 'X'
        })
    }
    if(subjectName==='Maths')  {
        res.send({
            chaptersName: [
                "Real Numbers",
                "Polynominal",
                "Pair Of Linear Equations In Two Variables",
                "Cordinate Geometry",
                "Periodic Classification of Elements",
                "Triangles",
                "introdiction To Trignometry ",
                "Areas Related To Circles",
                "Probability"
            ],
            subjectName: "Maths",
            className: 'X'
        })
    }
    if(subjectName==='Social Science')  {
        res.send({
            chaptersName: [
                "The Rise of Nationalism in Europe",
                "Resources and Development",
                "Agriculture",
                "Power Sharing",
                "Federalism",
                "Development",
                "Sectors of the Indian Economy",
            ],
            subjectName: "Social Science",
            className: 'X'
        })
    }
    if(subjectName==='Physics'&&examName==='JEE Mains')  {
        res.send({
            chaptersName: [
                "Physics and Measurement",
                "Kinematics",
                "Laws of Motion",
                "Work, Energy and Power",
                "Rotational Motion",
                "Gravitation",
                "Properties of Solids and Liquids",
                "Thermodynamics",
                "Kinetic Theory of Gases",
                "Oscillations and Waves",,
                "Electrostatics",
                "Current Electricity",
                "Magnetic Effects of Current and Magnetism",
                "Electromagnetic Induction and Alternating Currents",
                "Electromagnetic Waves",
                "Optics",
                "Dual Nature of Matter and Radiation",
                "Atoms and Nuclei",
                "Electronic Devices",
                "Communication Systems",
            ],
            subjectName: "Physics",
            className: 'XI'
        })
    }
    if(subjectName==='Chemistry'&&examName==='JEE Mains')  {
        res.send({
            chaptersName: [
                "Some Basic Concepts in Chemistry",
                "Atomic Structure",
                "Chemical Bonding and Molecular Structure",
                "Chemical Thermodynamics",
                "Solutions",
                "Equilibrium",
                "Redox Reactions and Electro-chemistry",
                "Thermodynamics",
                "Chemical Kinetics",
                "Surface Chemistry",
                "Classification of Elements and Periodicity in Properties",
                "General Principles and Processes of Isolation of Metals",
                "Hydrogen",
                "S - Block Elements (Alkali and Alkaline Earth Metals)",
                "p- Block Elements",
                "d - and f - Block Elements",
                "Co-Ordination Compounds",
                "Environmental Chemistry",
                "Some Basic Principles of Organic Chemistry",
                "Hydrocarbons",
                "Organic Compounds Containing Oxygen",
                "Organic Compounds Containing Halogens",
                "Organic Compounds Containing Nitrogen",
                "Polymers",
                "Biomolecules",
                "Chemistry In Everyday Life",

            ],
            subjectName: "Chemistry",
            className: 'XI'
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
exports.checkSchool = checkSchool;

