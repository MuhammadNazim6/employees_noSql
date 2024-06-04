import express from 'express'
const employeeRoute = express();

import session from 'express-session';

employeeRoute.use(
  session({
    secret: 'nrewnew',
    resave: false, 
    saveUninitialized: true, 
  })
);

// GET /api/employees`: Retrieve all employees.
//    - `GET /api/employees/:id`: Retrieve a specific employee by ID.
//    - `POST /api/employees`: Create a new employee.
//    - `PUT /api/employees/:id`: Update an existing employee.
//    - `DELETE /api/employees/:id`: Delete an employee.

employeeRoute.get('/:id',()=>{
  console.log('get');
})
employeeRoute.post('/',()=>{
  console.log('post');
})
employeeRoute.put('/:id',()=>{
  console.log('put');
})
employeeRoute.delete('/:id',()=>{
  console.log('delete');
})

export default employeeRoute;