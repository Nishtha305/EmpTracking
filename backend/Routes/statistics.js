const express = require('express');
const database = require('../Config/database');
const router = express.Router();

router.get('/', (req, res) => {
    // Department wise highest salary of employees
    const highest_salary = `SELECT department_id, MAX(salary) AS highest_salary FROM employee GROUP BY department_id`;

    // Salary range wise employee count
    const rangewise_count = `select
        case
            WHEN salary <= 50000 THEN '0-50000'
            WHEN salary BETWEEN 50001 AND 100000 THEN '50001-100000'
            ELSE '100000+'
        END AS salary_range,
        COUNT(*) AS employee_count
    FROM employee GROUP BY salary_range;`;

    // Name and age of the youngest employee of each department
    const youngestEmp = `select department_id, name, dob, TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age 
        FROM employee WHERE dob = (SELECT MAX(dob) FROM employee WHERE department_id = employee.department_id);`;

    Promise.all([
        database.promise().query(highest_salary),
        database.promise().query(rangewise_count),
        database.promise().query(youngestEmp)
    ]).then(([highest_salaryResults, rangewise_countResults, youngestEmpResults]) => {
        res.json({
            highestSalary: highest_salaryResults[0],
            salaryRangeWise: rangewise_countResults[0],
            youngestEmployee: youngestEmpResults[0]
        });
    }).catch((err) => {
        console.error('Error Fetching statistics:', err);
        res.status(500).json({ message: 'Error Fetching statistics', error: err });
    });
});

module.exports = router;
