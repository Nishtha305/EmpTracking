# backend
## SQL Queries

## department
``` 
 CREATE TABLE Department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMPis modified
);
```

## Departments
```
INSERT INTO Department (name, status) VALUES 
('HR', 'active'),
('Engineering', 'active'),
('Marketing', 'inactive');
```

## employee
```
CREATE TABLE Employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    name VARCHAR(255) NOT NULL,
    dob DATE,
    phone VARCHAR(15),
    photo VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES Department(id)
);
```