const express = require('express');
const database = require('../Config/database');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// multer for storing image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const fileExtenstion = path.extname(file.originalname);
        cb(null, Date.now() + fileExtenstion);
    }
})

const upload = multer({ storage: storage })

//get all employee 
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;

    const query = `SELECT * FROM employee LIMIT ${pageSize} offset ${offset}`;
    database.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching Employees' })
        } else {
            res.json(result)
        }
    })
});

//add new employee
router.post('/', upload.single('photo'), (req, res) => {
    try {
        const { department_id, name, dob, phone, email, salary, status } = req.body;
        const photo = req.file ? `uploads/${req.file.filename}` : null;
        const query = `INSERT INTO employee (department_id, name, dob, phone, email, salary, status, photo)
        values (?, ?, ?, ?, ?, ?, ?, ?)`;
        database.query(query, [department_id, name, dob, phone, email, salary, status, photo], (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Error Adding Employee' });
            } else {
                res.status(201).json({ message: 'Employee Added Succesfully' });
            }
        })
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
})

//update employee details
router.put('/:id', upload.single('photo'), (req, res) => {
    try {
        const { department_id, name, dob, phone, email, salary, status } = req.body;
        const { id } = req.params;
        const photo = req.file ? `uploads/${req.file.filename}` : null;

        const query = `update employee set department_id = ?, name = ?, dob = ?, phone = ?, email = ?, salary = ?, status = ?, photo = ? WHERE id = ?`;
        database.query(
            query,
            [department_id, name, dob, phone, email, salary, status, photo, id], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ message: 'Error while updating Employee' });
                } else {
                    res.status(201).json({ message: 'Employee details updated successfully' });
                }
            }
        );
    } catch (error) {
        console.error('Unexpected server error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.stack });
    }
});

//delete employee
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `delete from employee where id = ?`;
    database.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error Deleting Employee' })
        } else {
            res.status(201).json({ message: 'Employee deleted!' })
        }
    })
})

module.exports = router;