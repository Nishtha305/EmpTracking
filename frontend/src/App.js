import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Statistics from './components/Statistics';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<EmployeeList/>} />
          <Route path='/add' element={<EmployeeForm/>} />
          <Route path='/edit/:id' element={<EmployeeForm/>} />
          <Route path='/statistics' element={<Statistics/>} />
        </Routes>
      </div>
    </Router>
  )
}


export default App;