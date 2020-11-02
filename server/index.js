const express = require("express")
const path = require("path")
require("./db/mongoose")
const jobs = require("./routers/jobs.js")

const app = express()
const port = process.env.SERVER_PORT

app.use(express.json())

app.use(jobs)

app.use(express.static(path.join(__dirname, "./public")))

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
