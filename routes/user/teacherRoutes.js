const express = require('express');
const route = express.Router();
const {register, login, announcements, getDashboard, assignQuestions} = require('../../controllers/user/teacher');
const verify = require('../../controllers/verify');

route.post('/teacher/register', register);
route.post('/teacher/login', login);
route.post('/teacher/announcement', verify, announcements);
route.get('/teacher/dashboard', verify, getDashboard);
route.put('/teacher/assign', verify, assignQuestions);
module.exports = route; 