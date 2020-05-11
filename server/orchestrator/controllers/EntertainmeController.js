const axios = require("axios")
const Redis = require("ioredis")
const redis = new Redis()

class EntertainmeController {
  static async find(req, res, next){
    try {
      const movies =  JSON.parse(await redis.get("movies"))
      const tvSeries =  JSON.parse(await redis.get("tvSeries"))
      if(tvSeries && movies){ 
        res.status(200).json({
          movies,
          tvSeries
        })
      }
      else {
        const { movieData } = await axios({
          url : "http://localhost:3001/movies",
          method : "get"
        })
        const { tvData } = await axios({
          url : "http://localhost:3002/tv",
          method : "get"
        })
        res.status(200).json({
          movies: movieData,
          tvSeries: tvData
        })
        redis.set("movies", JSON.stringify(movieData));
        redis.set("tvSeries", JSON.stringify(tvData));
      }
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = EntertainmeController
