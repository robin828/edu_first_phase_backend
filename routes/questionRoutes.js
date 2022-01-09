const express = require('express');
const route = express.Router();
const verify = require('../controllers/verify');
const {addQuestion, getQuestionForTeacher, questionSetByTeacher,getQuestionById, getQuestionForStudent, getResultQuestions, addTestPaper, addTestQuestions} = require('../controllers/question');
route.post('/addQuestion', addQuestion);
// route.get('/teacher/question', verify, getQuestionForTeacher);
// route.post('/teacher/question', verify, questionSetByTeacher);
route.post('/student/question', getQuestionForStudent);
route.get('/student/question/single', getQuestionById);
route.post('/add/test', addTestPaper);
route.post('/add/testquestion', addTestQuestions);

route.post('/student/result/question', getResultQuestions);
module.exports = route;