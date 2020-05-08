const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001
const cors = require("cors")
const router = require("./routes/index")
const mongo = require("./config/config")
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