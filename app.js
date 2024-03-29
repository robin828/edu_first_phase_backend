const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const schoolDataRoutes = require('./routes/schoolDataRoutes')
const questionRoutes = require('./routes/questionRoutes')
const studentRoutes = require('./routes/user/studentRoutes');
const teacherRoutes = require('./routes/user/teacherRoutes');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth_token');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS,PUT');
    next()
})
app.get('/', (req, res) => res.send("chalgya mja aa gya"));
app.use("/api", schoolDataRoutes)
app.use("/api", questionRoutes)
app.use("/api", studentRoutes)
app.use("/api", teacherRoutes)
const port = process.env.port || 9000;
try {
    app.listen(port, () => {
        mongoose
            .connect("mongodb+srv://upscQB:upscQB@cluster0.5wupqoz.mongodb.net/", {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
            .then(console.log(`cononected to ${9000}`))
            .catch((err) => console.log(err));
    })
    
} catch (error) {
    console.log(error)
}

exports = module.exports = app;
