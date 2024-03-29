const questionModel = require('../models/questionModel');
const mongoose =  require('mongoose');
const examModel = require('../models/examModel');
const schoolModel = require('../models/schoolModel');
const teacherModel = require('../models/teacherModel');
const testModel = require('../models/testModel');
const testQuestions = require('../models/testQuestions');


const addQuestion = async (req, res, next) => {
	const {questionText, correctAnswer, options, solution, subject, className, examName, chapter, type, topic, questionImage} = req.body;
    let question;
    console.log(examName);
    question = new questionModel({
        questionText, correctAnswer, options, solution, subject, className, chapter, exam: examName, type, questionImage, topic
    })
    let checkExam;
	try {
        const session = await mongoose.startSession();
        session.startTransaction();
        checkExam = await examModel.findOne({examName});
        console.log(checkExam)
        if(checkExam) {
            await question.save({session: session});
            checkExam.questions.push(question);
            await checkExam.save({ session: session })
            await session.commitTransaction();
            res.send("success")
        }
        else {
            res.send("Exam Not Found")
        }
	} catch (error) {
		console.log(error)
	}
}

const getQuestionForTeacher = async (req, res, next) => {
    const { subject, className, chapter } = req.query

    let questions;
    try {
        questions = await questionModel.find({$and: [{subject}, {className}, {chapter}]}).limit(15);
        res.json({
            questions
        })
    } catch (error) {
        console.log(error);
    }
}

const questionSetByTeacher = async (req, res, next) => {
    const { questions, schoolName, userName } = req.body;
    // const { userName } = req.query;
    let teacher;
    console.log(userName)
    let school;

    try {
        // school = await schoolModel.find({schoolName});
        // teacher = await teacherModel.findOne({$and: [{userName}, {schoolName: school._id}]});
        // console.log(teacher.givenQuestion, 'qweqwe')

        // questions.forEach((ques) => {
        //     console.log(ques)
        //     teacher.givenQuestion.questions.push(ques);
        // })
        // console.log(teacher,'s')
        // teacher.save();
        // teacherModel.updateOne(
        //     { userName: userName },
        //     { $push: { givenQuestion: { questions: questions }} }
        //   )
        await teacherModel.updateOne(
            {userName: userName},
            {$push: {givenQuestion:  questions }}
        )
        

    } catch (error) {
        console.log(error)
    }
}

let randomize = (arr, n, length, question) =>
{
    console.log(length)
    const randomNumbers = new Set();
    let len = 0;
    for (var i = 0; i < n; i++) {
        let x = Math.floor(Math.random()*length);
        console.log(x)
        randomNumbers.add(x);
        if(randomNumbers.size!==len) {
            arr[i] = question[x];
            len++;
        }
        else {
            i--;
        }
        // console.log([Math.floor(Math.random()*length)]);
        
    }
}

const getQuestionForStudent = async (req, res ,next) => {
    const { selectedSubject, className, selectedChapter, selectedExam, noOfQuestions } = req.body;
    console.log(selectedSubject, className, selectedChapter, selectedExam, noOfQuestions, typeof(noOfQuestions), '6351725361725367')

    // let totalQuestions = [];
    let questions = [];
    // const questions = [];
    try {
        // let exams = await examModel.find({examName});
        // questionModel.find({_id: {$in: exams.questions}}).exec(callback);
        totalQuestions = await questionModel.aggregate([
            {$match: {exam: selectedExam}},
            {$match: {className}},
            {$match: {subject: selectedSubject}},
            {$match: {chapter: selectedChapter}},
        ])
        // console
        randomize(questions, noOfQuestions, totalQuestions.length, totalQuestions)
        // console.log(questions, '4567898765')
        // console.log(questions, "{{}}}");
        res.json({
            questions
        })
    } catch (error) {
        console.log(error)
    }
}

const getResultQuestions = async (req, res, next) => {
    console.log('hi')
    console.log(req.body)
    let questions;
    try {
        questions = await questionModel.find({_id: {$in: req.body}})
        console.log(questions, '12')
    } catch (error) {
        console.log(error);
    }
    res.json({
        questions
    })
}

const getQuestionById = async (req, res, next) => {
    const {id} = req.query
    let question;
    try {
        question = await questionModel.findOne({_id: id});
    } catch (error) {
        console.log(error)
    }
    res.send(question);
}



const addTestPaper = async (req, res, next) => {
    const {exam, school, className, syllabus, testName, Date} = req.body;
    let testPaper;
    try {
        testPaper = new testModel({exam, school, className, syllabus, testName, Date});
        await testPaper.save({});
    } catch (error) {
        console.log(error)
    }
    const paper = await testModel.find({});
    console.log(paper);
    // console.log(testPaper)
    res.send("success")

    // question = new questionModel({
    //     questionText, correctAnswer, options, solution, subject, className, chapter, exam: examName, type, questionImage
    // })


}

const addTestQuestions = async (req, res, next) => {
    const {questionText, correctAnswer, options, solution, subject, className, examName, chapter, type, questionImage, testName} = req.body;
    let question;
    console.log(examName);
    question = new testQuestions({
        questionText, correctAnswer, options, solution, subject, className, chapter, exam: examName, type, questionImage
    })
    let checkTest;
	try {
        const session = await mongoose.startSession();
        session.startTransaction();
        checkTest = await testModel.findOne({testName});
        console.log(checkTest)
        if(checkTest) {
            await question.save({session: session});
            checkTest.questions.push(question);
            await checkTest.save({ session: session })
            await session.commitTransaction();
            res.send("success11")
        }
        else {
            res.send("Test Not Found")
        }
	} catch (error) {
		console.log(error)
	}
}

exports.addQuestion = addQuestion;
exports.getQuestionForTeacher = getQuestionForTeacher;
exports.questionSetByTeacher = questionSetByTeacher;
exports.getQuestionForStudent = getQuestionForStudent;
exports.getResultQuestions = getResultQuestions;
exports.getQuestionById = getQuestionById;
exports.addTestPaper = addTestPaper;
exports.addTestQuestions = addTestQuestions;

