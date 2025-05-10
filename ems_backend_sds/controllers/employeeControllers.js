import Employee from "../models/Employee_u.js";

export const createEmployee = async(req,res) => {
   try {
        const newUser = new Employee(req.body);
        const {email} = newUser;

        const userExist = await Employee.findOne({email});

        if(userExist)
        {
            return  res.status(400).json({message: "user already exist"});
        }

        const savedData = await newUser.save();
     //    res.status(200).json(savedData); 
        res.status(200).json({message: "Employee Added Successfully"});
   } catch (error) {
        res.status(500).json({errormessage: error.message});
   } 
}

export const getAllemployees = async(req,res) => {
    try {
        const userData = await Employee.find();
        if(!userData || userData.length === 0){
            return res.status(400).json({message: "Employee data not found"});
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errormessage: error.message});
    }
}

export const getEmployeeById = async(req,res) => {
     try {
          const id = req.params.id;
          const employeeExist = await Employee.findById(id);
          if(!employeeExist){
            return res.status(400).json({message: "Employee not found"});
          }

          res.status(200).json(employeeExist);
     } catch (error) {
          res.status(500).json({errormessage: error.message});     
     }
}

export const updateEmployeeById = async(req,res) => {
     try {
          const id = req.params.id;
          const employeeExist = await Employee.findById(id);
          if(!employeeExist){
            return res.status(400).json({message: "Employee not found"});
          }
          await Employee.findByIdAndUpdate(id, req.body, {new: true});
          // res.status(200).json(updatedEmployeeData);
        res.status(200).json({message: "Employee Data Updated Successfully"});
          
     } catch (error) {
          res.status(500).json({errormessage: error.message});
     }
}

export const deleteEmployeeById = async(req,res) => {
     try{
          const id = req.params.id;
          const currEmployee = await Employee.findById(id);
          if(!currEmployee){
            return res.status(400).json({message: "Employee not found"});
          }
          await Employee.findByIdAndDelete(id)
          res.status(200).json({message: "Employee deleted Successfully"});
     }
     catch(error){
          res.status(500).json({errormessage: error.message});
     }
}