const MovieRouter = require("express").Router()
const TVController = require("../controllers/TVController")
MovieRouter.get("/", TVController.find)
MovieRouter.get("/:id", TVController.findById)
MovieRouter.post("/", TVController.create)
MovieRouter.put("/:id", TVController.update)
MovieRouter.delete("/:id", TVController.remove)
module.exports = MovieRouter
