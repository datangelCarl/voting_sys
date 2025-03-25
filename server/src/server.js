const express = require("express");//web framework
const dotenv = require("dotenv"); 
const cors = require("cors"); //communication sa backend sa frontend
const morgan = require("morgan");//logs request to your server
const dbConnect = require("./libs/db");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./utils/error.middleware");

dotenv.config();

const app = express();


app.use(cors({origin: "http://localhost:3000", credentials: true}));
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