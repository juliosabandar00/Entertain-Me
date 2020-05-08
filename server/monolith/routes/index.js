const router = require("express").Router()
const MovieRouter = require('./MovieRouter')
const TVRouter = require('./TVRouter')
router.use('/movie', MovieRouter)
router.use('/tv', TVRouter)
module.exports = router
