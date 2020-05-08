const Router = require("express").Router()
const TVController = require("../controllers/TVController")
Router.get("/tv", TVController.find)
Router.get("/tv/:id", TVController.findById)
Router.post("/tv", TVController.create)
Router.put("/tv/:id", TVController.update)
Router.delete("/tv/:id", TVController.remove)
module.exports = Router
