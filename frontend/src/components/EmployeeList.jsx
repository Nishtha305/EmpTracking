import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getEmployee, deleteEmployee, fetchDepartments } from '../api'
import EmployeeForm from './EmployeeForm';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const fetchEmployee = async () => {
    try {
      const { data } = await getEmployee();
      setEmployees(data);
    } catch (error) {
      console.error('Error Fetching employees', error);
    }
  };

  const getDepartments = async () => {
    try {
      const { data } = await fetchDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error Fetching departments', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure, you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployee()
      } catch (error) {
        console.error('Error deleting employees', error);
      }
    }
  };

  const handleAddEmployee = () => {
    setEmployeeToEdit(null);
    setOpenDialog(true)
  }

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setOpenDialog(true)
  }

  useEffect(() => {
    fetchEmployee();
    getDepartments();
  }, []);

  const getDepartmentName = (departmentId) => {
    const department = departments.find(dept => dept.id === departmentId);
    return department ? department.name : 'Unknown';
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    fetchEmployee();
    setOpenDialog(false);
  };

  return (
    <Box p={3}>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={3}>
        <Typography variant='h4'>Employee List</Typography>
        <Box display='flex' gap={2}>
          <Button variant='contained' onClick={() => handleAddEmployee()} color="primary">
            Add Employee
          </Button>
          <Button variant='contained' component={Link} to="/statistics" color="primary">
            Go To Statistics
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  {employee.photo ? (
                    <img
                      src={`http://localhost:5000/${employee.photo}`}
                      alt={employee.name}
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">No Photo</Typography>
                  )}
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{getDepartmentName(employee.department_id)}</TableCell>

                <TableCell>{new Date(employee.dob).toLocaleDateString('en-CA')}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEditEmployee(employee)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(employee.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EmployeeForm
        open={openDialog}
        onClose={handleCloseDialog}
        employeeToEdit={employeeToEdit}
        onSave={handleSave} />
    </Box>
  );
};

export default EmployeeList;