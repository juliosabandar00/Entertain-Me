const axios = require("axios")
const Redis = require("ioredis")
const redis = new Redis()

class TVController {  
  static async find(req, res, next){
    try {
      const tvSeries =  JSON.parse(await redis.get("tvSeries"))
      if(tvSeries){ 
       res.status(200).json(tvSeries)
      }
      else {
        const { data } = await axios({
          url : "http://localhost:3002/tv",
          method : "get"
        })
        res.status(200).json(data)
        redis.set("students", JSON.stringify(data))
      }
    } catch (error) {
      res.send(error)
    }
  }
  static findById(req, res, next){
    axios({
      url : `http://localhost:3002/tv/${req.params.id}`,
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
        url : "http://localhost:3002/tv",
        method : "post",
        data : req.body
      })
      res.status(201).json(data)
      const tvSeries =  JSON.parse(await redis.get("tvSeries"))
      if(tvSeries){
        tvSeries.push(data)
        redis.set("tvSeries", JSON.stringify(tvSeries))
      }
      
    } catch (error) {
      res.send(error)
    }
  }

  static update(req, res, next){
    axios({
      url : `http://localhost:3002/tv/${req.params.id}`,
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
      url : `http://localhost:3002/tv/${req.params.id}`,
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
module.exports = TVController