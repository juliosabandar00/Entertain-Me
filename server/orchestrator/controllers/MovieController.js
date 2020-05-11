const axios = require("axios")
const Redis = require("ioredis")
const redis = new Redis()

class MovieController {  
  static async find(req, res, next){
    try {
      const movies = JSON.parse(await redis.get('movies'));
      if(movies){ 
        console.log('aaaa')
       res.status(200).json(movies)
      }
      else {
        const { data } = await axios({
          url : "http://localhost:3001/movies",
          method : "get"
        })
        res.status(200).json(data)
        redis.set("movies", JSON.stringify(data))
      }
    } catch (error) {
      res.send(error)
    }
  }

  static async findById(req, res, next){
    axios({
      url : `http://localhost:3001/movies/${req.params.id}`,
      method : "get"
    })
    .then(({data}) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.send(err)
    })
  }

  static async create(req, res, next){
    try {
      const {data} = await axios({
        url : "http://localhost:3001/movies",
        method : "post",
        data : req.body
      })
      res.status(201).json(data)
      const movies =  JSON.parse(await redis.get("movies"))
      if(movies){
        console.log('masuk push')
        movies.push(data)
        redis.set("movies", JSON.stringify(movies))
      }
    } catch (error) {
      res.send(error)
    }
  }

  static async update(req, res, next){
    try {
      const {data} = await axios({
        url : `http://localhost:3001/movies/${req.params.id}`,
        method : "put",
        data : req.body
      })
      res.status(201).json(data)
      let movies =  JSON.parse(await redis.get("movies"))
      if(movies){
        for(let i=0; i<movies.length; i++){
          if(movies[i]._id == data._id){
            movies[i] = data;
            break;
          }
        }
        redis.set("movies", JSON.stringify(movies))
      }
    } catch (error) {
      res.send(error)
    }    
  }
  static async remove(req, res, next){

    try {
      const {data} = await axios({
        url : `http://localhost:3001/movies/${req.params.id}`,
        method : "delete"
      })
      res.status(200).json({removed: data})
      let movies =  JSON.parse(await redis.get("movies"))
      if(movies){
        for(let i=0; i<movies.length; i++){
          if(movies[i]._id == data._id){
            movies.splice(i, 1)
            break;
          }
        }
        redis.set("movies", JSON.stringify(movies))
      }
    } catch (error) {
      res.send(error)
    }    
  }
}
module.exports = MovieController
