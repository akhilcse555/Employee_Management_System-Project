import express from "express"
import { createEmployee, deleteEmployeeById, getAllemployees, getEmployeeById, updateEmployeeById } from "../controllers/employeeControllers.js"

const router = express.Router();

router.post("/employees",createEmployee);
router.get("/allemployees",getAllemployees);
router.get("/employee/:id", getEmployeeById);
router.put("/update/employee/:id",updateEmployeeById);
router.delete("/delete/employee/:id",deleteEmployeeById);

export default router;