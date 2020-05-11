const Router = require("express").Router()
const MovieController = require("../controllers/MovieController")
Router.get("/movies", MovieController.find)
Router.get("/movies/:id", MovieController.findById)
Router.post("/movies", MovieController.create)
Router.put("/movies/:id", MovieController.update)
Router.delete("/movies/:id", MovieController.remove)
module.exports = Router
