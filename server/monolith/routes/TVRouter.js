const TVRouter = require("express").Router()
const TVController = require("../controllers/TVController")
TVRouter.get("/", TVController.find)
TVRouter.get("/:id", TVController.findById)
TVRouter.post("/", TVController.create)
TVRouter.put("/:id", TVController.update)
TVRouter.delete("/:id", TVController.remove)
module.exports = TVRouter
