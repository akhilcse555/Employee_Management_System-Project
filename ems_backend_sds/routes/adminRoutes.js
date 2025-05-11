import express from 'express';
import { registerAdmin }  from '../controllers/adminController.js';
import { adminLogin } from '../controllers/adminController.js';
import { changePassword } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/signup', registerAdmin);
adminRouter.post('/adminlogin', adminLogin);
adminRouter.post('/change-password', changePassword);

export default adminRouter;