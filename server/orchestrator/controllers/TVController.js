const axios = require("axios")
const Redis = require("ioredis")
const redis = new Redis()

class TVController {  
  static async find(req, res, next){
    try {
      const tvSeries = JSON.parse(await redis.get('tvSeries'));
      if(tvSeries){ 
        console.log('aaaa')
       res.status(200).json(tvSeries)
      }
      else {
        const { data } = await axios({
          url : "http://localhost:3002/tv",
          method : "get"
        })
        res.status(200).json(data)
        redis.set("tvSeries", JSON.stringify(data))
      }
    } catch (error) {
      res.send(error)
    }
  }
  static async findById(req, res, next){
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
  static async create(req, res, next){
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

  static async update(req, res, next){
    try {
      const {data} = await axios({
        url : `http://localhost:3002/tv/${req.params.id}`,
        method : "put",
        data : req.body
      })
      res.status(201).json(data)
      let tvSeries =  JSON.parse(await redis.get("tvSeries"))
      if(tvSeries){
        for(let i=0; i<tvSeries.length; i++){
          if(tvSeries[i]._id == data._id){
            tvSeries[i] = data;
            break;
          }
        }
        redis.set("tvSeries", JSON.stringify(tvSeries))
      }
    } catch (error) {
      res.send(error)
    }    
  }
  static async remove(req, res, next){
    try {
      const {data} = await axios({
        url : `http://localhost:3002/tv/${req.params.id}`,
        method : "delete"
      })
      res.status(200).json({removed: data})
      let tvSeries =  JSON.parse(await redis.get("tvSeries"))
      if(tvSeries){
        for(let i=0; i<tvSeries.length; i++){
          if(tvSeries[i]._id == data._id){
            tvSeries.splice(i, 1)
            break;
          }
        }
        redis.set("tvSeries", JSON.stringify(tvSeries))
      }
    } catch (error) {
      res.send(error)
    }
  }
}
module.exports = TVController