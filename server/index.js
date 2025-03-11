const express = require("express") // Import Express framework
const cors = require("cors") // Import CORS to handle cross-origin requests
const { connect } = require("mongoose") // Import Mongoose for MongoDB connection
require("dotenv").config() // Load environment variables from .env file

const Routes = require("./routes/routes.js") // Import API routes
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js") // Import error-handling middleware

const app = express() // Initialize Express app

// Middleware to parse JSON request bodies
app.use(express.json({ extended: true }))
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }))
// Enable CORS with credentials for frontend requests from localhost:3000
app.use(cors({ credentials: true, origin: ["https://localhost:3000"] }))

// Define API routes under the /api path
app.use('/api', Routes)

// Middleware to handle 404 errors (not found)
app.use(notFound)
// Middleware to handle general errors
app.use(errorHandler)

// Connect to MongoDB and start the server
connect(process.env.MONGO_URL)
  .then(() => 
    app.listen(process.env.PORT, () => 
      console.log(`Server started on port ${process.env.PORT}`)
    )
  )
  .catch(err => console.log(err)) // Log connection errors
