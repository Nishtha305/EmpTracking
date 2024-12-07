import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getEmployee = (page = 1) => axios.get(`${API_URL}/employee?page=${page}`);
export const addEmployee = (employee) => axios.post(`${API_URL}/employee`, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/employee/${id}`, employee,{
  headers: {
    'Content-Type': 'multipart/form-data',  // Ensure the correct content type for file upload
  },
});
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employee/${id}`)
export const getStatistics = () => axios.get(`${API_URL}/statistics`)
export const fetchDepartments = () => axios.get(`${API_URL}/department`)