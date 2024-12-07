import React, { useState, useEffect } from 'react';
import { addEmployee, fetchDepartments, updateEmployee } from '../api';
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const EmployeeForm = ({ open, onClose, employeeToEdit, onSave }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
    department_id: '',
    dob: '',
    status: 'Active',
    photo: null
  });
  const [department, setDepartment] = useState([]);

  useEffect(() => {

    const fetchDepartmentData = async () => {
      try {
        const response = await fetchDepartments();
        setDepartment(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartmentData();

    if (employeeToEdit) {
      const dob = new Date(employeeToEdit.dob);
      const adjustedDob = new Date(dob.getTime() - dob.getTimezoneOffset() * 60000);
      const formatedDate = adjustedDob.toISOString().split('T')[0];

      setEmployee({
        name: employeeToEdit.name,
        email: employeeToEdit.email,
        phone: employeeToEdit.phone,
        salary: employeeToEdit.salary,
        department_id: employeeToEdit.department_id,
        dob: formatedDate,
        status: employeeToEdit.status || 'Active',
        photo: null
      });
    } else {
      setEmployee({
        name: '',
        email: '',
        phone: '',
        salary: '',
        department_id: '',
        dob: '',
        status: 'Active',
        photo: null
      });
    }
  }, [employeeToEdit]);

  const handleFileChange = (e) => {
    setEmployee({ ...employee, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', employee.name);
      formData.append('email', employee.email);
      formData.append('phone', employee.phone);
      formData.append('salary', employee.salary);
      formData.append('dob', employee.dob);
      formData.append('status', employee.status);
      formData.append('department_id', employee.department_id);

      if (employee.photo) {
        formData.append('photo', employee.photo);
      }

      if (employeeToEdit) {
        await updateEmployee(employeeToEdit.id, formData);
      } else {
        await addEmployee(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={employee.name}
                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={employee.email}
                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                value={employee.phone}
                onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Salary"
                variant="outlined"
                fullWidth
                type="number"
                value={employee.salary}
                onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                variant="outlined"
                fullWidth
                type="date"
                value={employee.dob}
                onChange={(e) => setEmployee({ ...employee, dob: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={employee.department_id}
                  onChange={(e) => setEmployee({ ...employee, department_id: e.target.value })}
                  label="Department"
                  required
                >
                  {department.length === 0 ? (
                    <MenuItem disabled>No departments available</MenuItem>
                  ) : (
                    department.map(department => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={employee.status}
                  onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            {employeeToEdit ? 'Update Employee' : 'Add Employee'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
