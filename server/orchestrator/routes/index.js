const router = require("express").Router()
const EntertainmeController = require('../controllers/EntertainmeController')
const MovieController = require("../controllers/MovieController")
const TVController = require("../controllers/TVController")

router.get("/entertainme", EntertainmeController.find)

router.get("/movies", MovieController.find)
router.get("/movies/:id", MovieController.findById)
router.post("/movies", MovieController.create)
router.put("/movies/:id", MovieController.update)
router.delete("/movies/:id", MovieController.remove)

router.get("/tv", TVController.find)
router.get("/tv/:id", TVController.findById)
router.post("/tv", TVController.create)
router.put("/tv/:id", TVController.update)
router.delete("/tv/:id", TVController.remove)


module.exports = router
