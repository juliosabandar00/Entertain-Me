const express = require("express")
const app = express()
const PORT = process.env.PORT || 3002
const cors = require("cors")
const mongo = require("./config/config")
const router = require("./routes/index")
mongo.connect(function(err){
  if (!err) {
    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({extended: false}))
    app.use(router)
    app.listen(PORT, function(){
      console.log("server is running on PORT " + PORT)
    })
  }
})