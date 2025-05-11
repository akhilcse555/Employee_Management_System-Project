import bcrypt from 'bcrypt';
import crypto from 'crypto';
import adminuser from '../models/adminUserSignup.js'
import { sendCredentialsMail } from '../utils/sendMail.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const registerAdmin = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await adminuser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const tempPassword = crypto.randomBytes(4).toString('hex'); // 8-char random password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = await adminuser.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      firstLogin: true
    });

    await sendCredentialsMail({ name, email, password: tempPassword });

    res.status(201).json({ message: 'Admin registered. Check your email for credentials.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};




export const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password)
        return res.status(400).json({ message: 'Email and password are required' });
  
      const user = await adminuser.findOne({ email });
      if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: 'Invalid password' });
  
      if (user.firstLogin) {
        return res.status(200).json({
          message: 'First login - password change required',
          firstLogin: true,
          userId: user._id
        });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };


  export const changePassword = async (req, res) => {
    try {
      const { email, oldPassword, newPassword } = req.body;
      console.log(req.body);
      if (!email || !newPassword || !oldPassword) {
        
        return res.status(400).json({ message: 'Email, old password and new password are required' });
      }
  
      const admin = await adminuser.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect old password' });
      }
  
      admin.password = await bcrypt.hash(newPassword, 10);
      admin.firstLogin = false;
      await admin.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  