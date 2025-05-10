import express from "express"
import { createUser, getAllusers } from "../controllers/authcontroller.js"

const route = express.Router();

route.post("/users",createUser);
route.get("/allusers",getAllusers);


export default route;