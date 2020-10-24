const express = require("express")
const path = require("path")
require("./db/mongoose")
const dataScience = require("./routers/datasciences.js")

const app = express()
const port = process.env.SERVER_PORT

app.use(express.json())

app.use(dataScience)

app.use(express.static(path.join(__dirname, "./public")))

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
