import express from "express";
const employeeRoute = express();
import {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController.js";

employeeRoute.get("/full", getAllEmployees);
employeeRoute.get("/:id", getEmployee);
employeeRoute.post("/", createEmployee);
employeeRoute.put("/:id", updateEmployee);
employeeRoute.delete("/:id", deleteEmployee);

export default employeeRoute;

// import session from 'express-session';
// employeeRoute.use(
//   session({
//     secret: 'nrewnew',
//     resave: false,
//     saveUninitialized: true,
//   })
// );
