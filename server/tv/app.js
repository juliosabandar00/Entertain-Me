const express = require("express")
const app = express()
const PORT = process.env.PORT || 3002
const mongo = require("./config/config")
const cors = require("cors")

mongo.connect(function(err){
  if (!err) {
    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({extended: false}))
    app.use("/", require("./routes/index"))
    app.listen(PORT, function(){
      console.log("server is running on PORT " + PORT)
    })
  }
})
