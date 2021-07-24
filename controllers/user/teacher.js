// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var generator = require('generate-password');
const JWT = require('jsonwebtoken');
const annnounceModel = require('../../models/annnounceModel');
const schoolModel = require('../../models/schoolModel');
const teacherModel = require('../../models/teacherModel');
const teacherQuestionsModel = require('../../models/teacherQuestionsModel');
 

const register = async (req, res, next) => {
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array()[0].msg });
	// }
	const { name, phoneNumber, schoolName, classTeacher, subjectTeacher, subject } = req.body;

	let password;
	try {
		var pass = generator.generate({
			length: 8,
			numbers: true
		});
		password = pass;
	} catch (err) {
		console.log(err);
		res.status(400).send('Could not create student try again later')
	}
	console.log(password);
	try {
		const salt = await bcrypt.genSalt(10)
		hashedPassword = await bcrypt.hash(password, salt)
	} catch (error) {
		console.log("password is not hashed")
		return res.status(400).send('Could not create user try again later')
	}
    let school;
    try {
        school = await schoolModel.findOne({schoolName});
    } catch (error) {
        console.log(error);
    }

	const teacher = new teacherModel({
		name, phoneNumber, password: hashedPassword, userName: phoneNumber, school: school._id, subject, classTeacher, subjectTeacher, subject,
	})
	let existingTeacher;
	try {
		existingTeacher = await teacherModel.findOne({ userName: phoneNumber })
	} catch (error) {
        console.log(error)
		return res.status(400).send('something went wrog')
	}
	if (existingTeacher) {
		return res.status(400).send('teacher already added')
	}
	try {
		await teacher.save()
	} catch (error) {
		console.log(error)
		const err = new Error('could not sign up try again')
		return next(err)
	}
	res.json({
		teacher: teacher.userName
	})
}

const login = async (req, res, next) => {
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array()[0].msg });
	// }
	const { userName, password } = req.body;

	let existingTeacher;
	try {
		existingTeacher = await teacherModel.findOne({userName}, { _id: 0, created: 0 })
		console.log(existingTeacher);
	} catch (error) {
		console.log(error)
		return res.status(400).send('something went wrong')
	}
	if (!existingTeacher) {
		return res.status(400).send('Done does not exist please talk your School/Coaching staff')
	}
	const validPassword = await bcrypt.compare(password, existingTeacher.password)
	if (!validPassword) {
		return res.status(400).send("Invalid Password")
	}
	//creating token
	let token;
	try {
		token = JWT.sign({ _id: existingTeacher._id }, "shjvshfu")
		res.header('auth-token', token)
	} catch (error) {
		console.log(error)
		return res.status(400).send('something went wrong1')
	}
	res.json({
		userName: existingTeacher.userName, token
	})
}

const announcements = async (req, res, next) => {
    const { announcementText, className, name, school } = req.body;
    // we can replace this by socket
    const announcement = new annnounceModel({
        announcementText, className, teacher: name, school
    })
    try {
        await announcement.save();
        res.send("Succesfuly added announcement")
    } catch (error) {
        console.log(error)
    }

}

const getDashboard = async (req, res, next) => {
	const {userName} = req.query;
	console.log(userName, 'userName')
	let dashboardData;
	try {
		dashboardData = await teacherModel.findOne({userName});
	} catch (error) {
		console.log(error)
	}
	console.log(dashboardData, 'dashboardData')
	res.json({
		subjectTeacher: dashboardData.subjectTeacher, name: dashboardData.name, subject:dashboardData.subject
	})
}

const assignQuestions = async (req, res, next) => {
	const { userName, selectedClass, selectedChapter, questions_id } = req.body
	console.log(userName, selectedClass, selectedChapter, questions_id)
	const now = new Date();
	console.log(now, 'date')
	let teacherQuestions;
	// console.log(req.query, req.body, 'testing')
	let teacher;
	try {
		teacher = await teacherModel.findOne({userName});
		teacherQuestions = teacherQuestionsModel({
			userName: userName, Date:Date(), chapter: selectedChapter, className: selectedClass, subject: teacher.subject, questions : [...questions_id], school: teacher.school 
		})
		teacherQuestions.save();
		console.log(teacherQuestions)
	} catch (error) {
		console.log(error)
	}
}

exports.register = register;
exports.login = login;
exports.announcements = announcements;
exports.getDashboard = getDashboard;
exports.assignQuestions = assignQuestions;