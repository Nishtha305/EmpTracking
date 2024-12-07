import React, { useEffect, useState } from 'react';
import { getStatistics } from '../api';
import { Box, Button, Card, CardContent, List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { data } = await getStatistics();
        setStats(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchStatistics();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Statistics
      </Typography>

      {/* Highest Salary by Department */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Highest Salary by Department
          </Typography>
          <List>
            {stats.highestSalary.map((s) => (
              <ListItem key={s.department_id}>
                <Typography>
                  <strong>Department {s.department_id}:</strong> ₹{s.highest_salary.toLocaleString()}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Salary Range Wise Employee Count */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Salary Range Wise Employee Count
          </Typography>
          <List>
            {stats.salaryRangeWise.map((item, index) => (
              <ListItem key={index}>
                <Typography>
                  <strong>{item.salary_range}:</strong> {item.employee_count} employees
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Youngest Employee by Department */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Youngest Employee by Department
          </Typography>
          <List>
            {stats.youngestEmployee.map((e) => (
              <ListItem key={e.department_id}>
                <Typography>
                  <strong>Department {e.department_id}:</strong> {e.name} ({e.age} years old)
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Add Employee Button */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default Statistics;
