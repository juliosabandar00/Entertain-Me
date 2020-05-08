const router = require("express").Router()
const EntertainmeController = require('../controllers/EntertainmeController')
const MovieController = require("../controllers/MovieController")
const TVController = require("../controllers/TVController")

router.get("/entertainme", EntertainmeController.find)

Router.get("/movie", MovieController.find)
Router.get("/movie/:id", MovieController.findById)
Router.post("/movie", MovieController.create)
Router.put("/movie/:id", MovieController.update)
Router.delete("/movie/:id", MovieController.remove)

Router.get("/tv", TVController.find)
Router.get("/tv/:id", TVController.findById)
Router.post("/tv", TVController.create)
Router.put("/tv/:id", TVController.update)
Router.delete("/tv/:id", TVController.remove)


module.exports = router
