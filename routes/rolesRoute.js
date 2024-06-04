import express from "express";
const roleRoute = express();

import session from "express-session";

roleRoute.use(
  session({
    secret: "nrewnew",
    resave: false,
    saveUninitialized: true,
  })
);

// `GET /api/roles`: Retrieve all roles.
//    - `GET /api/roles/:id`: Retrieve a specific role by ID.
//    - `POST /api/roles`: Create a new role.
//    - `PUT /api/roles/:id`: Update an existing role.
//    - `DELETE /api/roles/:id`: Delete a role.


roleRoute.get('/:id',()=>{
  console.log('get');
})
roleRoute.post('/',()=>{
  console.log('post');
})
roleRoute.put('/:id',()=>{
  console.log('put');
})
roleRoute.delete('/:id',()=>{
  console.log('delete');
})

export default roleRoute;
