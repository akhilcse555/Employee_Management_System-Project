import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import route from "./routes/authRoutes.js"
import router from "./routes/employeeRoutes.js"
import cors from "cors"

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGODBURL = process.env.MONGO_URI;

mongoose
        .connect(MONGODBURL)
        .then(() => {
            console.log("db connected successfully.");
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`)
            });
        })
        .catch((error) => console.log(error));

app.use("/ems_user",route);
app.use("/ems_employee",router);
