const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require("./libs/db");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");


const errorMiddleware = require("./utils/error.middleware");

dotenv.config();

const app = express();


app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);


app.use(errorMiddleware);

dbConnect((client) => {
    if (client) {
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
    }else{
        console.log("Database connection failed");
        process.exit(1);
    }
});