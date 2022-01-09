const express = require('express');
const route = express.Router();
const {register, login, saveResult, getResult, getChapterWisePerformance, getSubjects, getAssignedQuestionByTeacher, getDashboard, getTopCard, getTestResult, getLeaderBoardRanking} = require('../../controllers/user/student');
route.post('/student/register', register);
route.post('/student/login', login);
route.post('/student/saveresult', saveResult);
route.get('/student/getresults', getResult);
route.get('/student/result', getTestResult);
route.get('/student/performance/chapterwise', getChapterWisePerformance);
route.get('/student/teacher/question', getAssignedQuestionByTeacher);
route.get('/student/dashboard', getDashboard);
route.post('/student/subject', getSubjects);
route.get('/student/gettopcard', getTopCard);
route.get('/student/peers', getLeaderBoardRanking)
module.exports = route;