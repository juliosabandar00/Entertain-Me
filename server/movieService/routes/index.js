const Router = require("express").Router()
const MovieController = require("../controllers/MovieController")
Router.get("/movie", MovieController.find)
Router.get("/movie/:id", MovieController.findById)
Router.post("/movie", MovieController.create)
Router.put("/movie/:id", MovieController.update)
Router.delete("/movie/:id", MovieController.remove)
module.exports = Router
