const path = require("path")

const express = require("express")
const history = require("connect-history-api-fallback")
const app = express()
app.use(history())
app.use(express.static(path.join(__dirname, "../web")))
app.listen(3000, () => {
  console.log("server running at localhost:3000")
})
