const express = require('express');
const route = express.Router();
const {register, login, announcements, getDashboard, assignQuestions, getAllStudents, getStudentResult, getStudentSubject} = require('../../controllers/user/teacher');
const verify = require('../../controllers/verify');

route.post('/teacher/register', register);
route.post('/teacher/login', login);
route.post('/teacher/announcement', announcements);
route.get('/teacher/dashboard', getDashboard);
route.put('/teacher/assign', assignQuestions);
route.get('/teacher/allstudent', getAllStudents);
route.get('/teacher/student/result', getStudentResult);
route.get('/teacher/student/subject', getStudentSubject);
module.exports = route; 