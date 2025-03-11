const express = require("express")
const cors = require("cors")
const {connect} = require("mongoose")
require("dotenv").config()

const Routes = require("./routes/routes.js")
const {notFound, errorHandler} = require("./middleware/errorMiddleware.js")

const app = express()
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: ["https://localhost:3000"]}))

app.use('/api', Routes)

app.use(notFound)
app.use(errorHandler)

connect(process.env.MONGO_URL).then(app.listen(process.env.PORT, () => console.log
(`Server started on port ${process.env.PORT}`))).catch(err => console.log(err))