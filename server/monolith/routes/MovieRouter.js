const MovieRouter = require("express").Router()
const MovieController = require("../controllers/MovieController")
MovieRouter.get("/", MovieController.find)
MovieRouter.get("/:id", MovieController.findById)
MovieRouter.post("/", MovieController.create)
MovieRouter.put("/:id", MovieController.update)
MovieRouter.delete("/:id", MovieController.remove)
module.exports = MovieRouter