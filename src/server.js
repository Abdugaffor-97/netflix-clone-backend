const express = require("express")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")

const {
  badRequestHandler,
  genericErrorHandler,
  notFoundHandler,
} = require("./errorHandlers")

const app = express()
app.use(express.json())

const whiteList =
  process.env.NODE_ENV === "production"
    ? [process.env.FE_URL_PROD]
    : [process.env.FE_URL_DEV]

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      // allowed
      callback(null, true)
    } else {
      // Not allowed
      callback(new Error("NOT ALLOWED - CORS ISSUES"))
    }
  },
}

// app.use(cors(corsOptions))

const mediaRoutes = require("./services/media")
app.use("/media", mediaRoutes)

// ERROR HANDLERS
app.use(badRequestHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

console.log(listEndpoints(app))

const port = process.env.PORT || 3001
app.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Running on cloud on port", port)
  }
  console.log(`Running locally http://localhost:${port}`)
})
