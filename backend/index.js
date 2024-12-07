const express = require('express');
const employeeRoutes = require('./Routes/employees');
const statisticsRoutes = require('./Routes/statistics');
const departmentRoutes = require('./Routes/department');

const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/employee', employeeRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/department',departmentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});