const axios = require("axios")
const Redis = require("ioredis")
const redis = new Redis()

class MovieController {  
  static find(req, res, next){
    try {
      const movies =  JSON.parse(await redis.get("movies"))
      if(movies){ 
       res.status(200).json(movies)
      }
      else {
        const { data } = await axios({
          url : "http://localhost:3001/movie",
          method : "get"
        })
        res.status(200).json(data)
        redis.set("movies", JSON.stringify(data))
      }
    } catch (error) {
      res.send(error)
    }
  }

  static findById(req, res, next){
    axios({
      url : `http://localhost:3001/movie/${req.params.id}`,
      method : "get"
    })
    .then(({data}) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.send(err)
    })
  }

  static create(req, res, next){

    try {
      const {data} = await axios({
        url : "http://localhost:3001/movie",
        method : "post",
        data : req.body
      })
      res.status(201).json(data)
      const movies =  JSON.parse(await redis.get("movies"))
      if(movies){
        movies.push(data)
        redis.set("tvSeries", JSON.stringify(movies))
      }
    } catch (error) {
      res.send(error)
    }
  }

  static update(req, res, next){
    axios({
      url : `http://localhost:3001/movie/${req.params.id}`,
      method : "put"
    })
    .then(({data}) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.send(err)
    })
  }
  static remove(req, res, next){
    axios({
      url : `http://localhost:3001/movie/${req.params.id}`,
      method : "delete"
    })
    .then(({data}) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.send(err)
    })
  }
}
module.exports = MovieController
