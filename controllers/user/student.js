const studentModel = require("../../models/studentModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var generator = require("generate-password");
const JWT = require("jsonwebtoken");
const schoolModel = require("../../models/schoolModel");
const resultModel = require("../../models/resultModel");
const teacherQuestionsModel = require("../../models/teacherQuestionsModel");
const testModel = require("../../models/testModel");
const questionModel = require("../../models/questionModel");
var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "schooledu72@gmail.com",
    pass: "Moni@1234",
  },
  secure: true,
});

const register = async (req, res, next) => {
  console.log("Working");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const {
    firstName,
    lastName,
    phoneNumber,
    standard,
    schoolName,
    rollNumber,
    gender,
    stream,
    subjects,
    email,
  } = req.body;
  let userName;
  try {
    userName =
      "1" +
      standard.split("-")[0] +
      standard.split("-")[1] +
      rollNumber +
      ".edu";
  } catch (err) {
    console.log(err);
    res.status(400).send("Could not create student try again later");
  }

  let password;
  try {
    var pass = generator.generate({
      length: 8,
      numbers: true,
    });
    password = pass;
  } catch (err) {
    console.log(err);
    res.status(400).send("Could not create student try again later");
  }
  console.log(password, userName, "{{}}");
  try {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {
    return res
      .status(400)
      .send("Could not create user try again later due to password");
  }
  let school;
  try {
    school = await schoolModel.findOne({ schoolName });
  } catch (error) {
    console.log(error);
  }

  const student = new studentModel({
    firstName,
    lastName,
    phoneNumber,
    password: hashedPassword,
    userName: userName,
    standard,
    school: school._id,
    stream,
    gender,
    rollNumber,
    subjects,
    userName,
  });
  let existingStudent;
  try {
    existingStudent = await studentModel.findOne({ userName });
  } catch (error) {
    return res.status(400).send("something went wrong");
  }
  if (existingStudent) {
    return res.status(400).send("Student already added");
  }
  console.log(userName, password, ":::{{}}}}}");
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    checkSchool = await schoolModel.findOne({ _id: school._id });
    console.log(checkSchool);
    if (checkSchool) {
      await student.save({ session: session });
      checkSchool.students.push(student._id);
      await checkSchool.save({ session: session });
      await session.commitTransaction();
      // res.send("success")
    } else {
      res.send("Exam Not Found");
    }
    // await student.save();
    const mailData = {
      from: "schooledu72@gmail.com",
      to: email,
      subject: "Your credentials for website",
      text: `userName - ${userName}
				   password - ${password}
				   please do not share and misplace your your email and passord with anyone`,
      // html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    // transporter.sendMail(mailData, (error, info) => {
    // 	if (error) {
    // 		console.log("^^&^&^&")
    // 		return console.log(error);
    // 	}
    // 	console.log("^^))))")
    // 	res.status(200).send({ message: "Mail send", message_id: info.messageId });
    // });
  } catch (error) {
    console.log(error);
    const err = new Error("could not sign up try again");
    return next(err);
  }
  res.json({
    student: student.userName,
    password: student.password
  });
};

const login = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  // 	return res.status(400).json({ errors: errors.array()[0].msg });
  // }
  const { userName, password } = req.body;

  let existingStudent;
  try {
    existingStudent = await studentModel.findOne(
      { userName },
      { _id: 0, created: 0 }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send("something went wrong");
  }
  if (!existingStudent) {
    return res
      .status(400)
      .send("Done does not exist please talk your School/Coaching staff");
  }
  const validPassword = await bcrypt.compare(
    password,
    existingStudent.password
  );
  if (!validPassword) {
    return res.status(400).send("Invalid Password");
  }
  //creating token
  let token;
  try {
    token = JWT.sign({ _id: existingStudent._id }, "shjvshfu");
    res.header("auth-token", token);
  } catch (error) {
    console.log(error);
    return res.status(400).send("something went wrong1");
  }
  res.json({
    userName: existingStudent.userName,
    token,
    schoolName: existingStudent.schoolName,
  });
};

const getAnnouncement = async (re, res, next) => {
  const {} = req.query;
};

const getSubjects = async (req, res, next) => {
  const { userName } = req.body;
  console.log(userName);
  let user;
  try {
    user = await studentModel.findOne({ userName });
    // console.log(user);
    // subjects = user.subjects;
    // console.log(user.subjects)
  } catch (error) {
    console.log(error);
  }
  console.log(user.subjects);
  res.json({ subjects: user.subjects });
};

const saveResult = (req, res, next) => {
  const {
    subject,
    chapter,
    correctAnswer,
    incorrectAnswer,
    marks,
    userName,
    selectedAnswer,
    inCorrectQuestions,
    leftQuestions,
    correctQuestions,
    type,
    exam,
    unattempted,
  } = req.body;
  // const date = new Date();
  // const newDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  let result;
  try {
    result = new resultModel({
      userName,
      subject,
      chapter,
      correct: correctAnswer,
      inCorrect: incorrectAnswer,
      Date: Date(),
      marks,
      selectedAnswer,
      inCorrectQuestions,
      leftQuestions,
      correctQuestions,
      unattempted,
      type,
      exam,
    });
    result.save();
  } catch (error) {
    console.log(error);
  }
};

const getResult = async (req, res, next) => {
  const { userName } = req.query;
  let results;
  try {
    results = await resultModel.find({ userName });
  } catch (error) {
    console.log(error);
  }
  res.send({
    results,
  });
};
const getChapterWisePerformance = async (req, res, next) => {
  const { exam, subject, chapter, userName } = req.query;
  console.log(exam, subject, chapter, userName, "%%%%%%%");
  let performance;
  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;
  try {
    if (userName) {
      if (chapter) {
        performance = await resultModel.find({
          $and: [{ userName }, { exam }, { chapter }, { subject }],
        });
        console.log(performance, "%%%%%%%");
      } else if (subject && !chapter) {
        performance = await resultModel.find({
          $and: [{ userName: userName }, { exam }, { subject }],
        });
      } else {
        performance = await resultModel.find({
          $and: [{ userName: userName }, { exam }],
        });
      }
    } else {
      if (chapter) {
        performance = await resultModel.find({
          $and: [{ exam }, { chapter }, { subject }],
        });
        console.log(performance, "%%%%%%%");
      } else if (subject && !chapter) {
        performance = await resultModel.find({ $and: [{ exam }, { subject }] });
      } else {
        performance = await resultModel.find({ $and: [{ exam }] });
      }
    }
  } catch (error) {
    console.log(error);
  }
  performance.forEach((per) => {
    correct = correct + per.correct;
    incorrect = incorrect + per.inCorrect;
    unattempted = unattempted + per.unattempted;
  });
  console.log(correct, incorrect, "*****");
  res.send({
    correct,
    incorrect,
    unattempted,
  });
};

let binarySearch = function (arr, x, start, end) {
  if (start > end) return false;
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === x) return true;
  if (arr[mid] > x) return recursiveFunction(arr, x, start, mid - 1);
  else return recursiveFunction(arr, x, mid + 1, end);
};

const getAssignedQuestionByTeacher = async (req, res, next) => {
  const { userName } = req.query;
  let student;
  let school;
  let testPapers;
  let className;
  // let allTeachers;
  // let questions;
  // let teacherQuestions = [];
  // try {
  // 	student = await studentModel.findOne({userName})
  // 	school = student.school
  // 	className = student.standard
  // 	allTeachers = await teacherQuestionsModel.find({$and: [{school}, {className}, {Date: {$lt: Date()}}]});
  // 	for (const teacher of allTeachers){
  // 		let obj = {}
  // 		questions = await questionModel.find({_id: {$in: teacher.questions}})
  // 		obj.questions = questions;
  // 		obj.chapter = teacher.chapter;
  // 		obj.subject = teacher.subject;
  // 		obj.date = teacher.Date;
  // 		teacherQuestions.push(obj);
  // 	}
  // } catch (error) {
  // 	console.log(error)
  // }
  // res.send({
  // 	teacherQuestions
  // })

  try {
    student = await studentModel.findOne({ userName });
    school = student.school;

    className = student.standard.split("-")[0];
	console.log(className)
    testPapers = await testModel.find({className});
    // for (const teacher of allTeachers) {
    //   let obj = {};
    //   questions = await questionModel.find({ _id: { $in: teacher.questions } });
    //   obj.questions = questions;
    //   obj.chapter = teacher.chapter;
    //   obj.subject = teacher.subject;
    //   obj.date = teacher.Date;
    //   teacherQuestions.push(obj);
    // }
  } catch (error) {
    console.log(error);
  }
  console.log(testPapers)
  res.json({testPapers})
};

const getTopCard = async (req, res, next) => {
  const { userName } = req.query;
  let student;

  try {
    student = await studentModel.findOne({ userName });
  } catch (error) {
    console.log(error);
  }
  res.json({
    standard: student.standard,
    rollNumber: student.rollNumber,
    name: student.firstName,
  });
};
const getDashboard = async (req, res, next) => {
  const { userName } = req.query;
  let student;

  try {
    student = await studentModel.find({ userName });
  } catch (error) {
    console.log(error);
  }
};

const getTestResult = async (req, res, next) => {
  const { userName, testId } = req.query;
  let result;
  try {
    result = await resultModel.findOne({
      $and: [{ userName }, { _id: testId }],
    });
  } catch (error) {
    console.log(error);
  }
  res.json({ result });
};

const getLeaderBoardRanking = async (req, res, next) => {
  const { userName } = req.query;
  let school;
  try {
    school = await resultModel.findOne({ userName }).school;
  } catch (error) {
    console.log(error);
  }
};

exports.register = register;
exports.login = login;
exports.saveResult = saveResult;
exports.getResult = getResult;
exports.getChapterWisePerformance = getChapterWisePerformance;
exports.getAssignedQuestionByTeacher = getAssignedQuestionByTeacher;
exports.getTopCard = getTopCard;
exports.getDashboard = getDashboard;
exports.getSubjects = getSubjects;
exports.getTestResult = getTestResult;
exports.getLeaderBoardRanking = getLeaderBoardRanking;
