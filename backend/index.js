const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const adminAuthRoutes = require('./routes/adminRoutes');
const teacherAuthRoutes = require('./routes/teacherRoute');
const studentAuthRoutes = require('./routes/studentRoute');
const parentAuthRoutes = require('./routes/parentRoute');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminUserManagementRoutes = require('./routes/adminUserManagement');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  // .connect('mongodb+srv://electroniceducaresales:2JKOLjXblY74cd65@cluster0.t0wekh5.mongodb.net/eecmodifydb?retryWrites=true&w=majority&appName=Cluster0')
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.send("Welcome to the Electronic Educare API");
})

// Mount auth routes separately
app.use('/api/admin/users', adminUserManagementRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/teacher/auth', teacherAuthRoutes);
app.use('/api/student/auth', studentAuthRoutes);
app.use('/api/parent/auth', parentAuthRoutes);

app.use('/api/attendance', attendanceRoutes);
app.use('/api/student', require('./routes/student'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
