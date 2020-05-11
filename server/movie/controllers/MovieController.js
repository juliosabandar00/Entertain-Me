const Movie = require("../models/movie");
class MovieController {
  static find(req, res, next){
    Movie.find()
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json({
        message : "Internal Server Error"
      })
    })
  }
  static findById(req, res, next){
    Movie.findById(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json({
        message : "Internal Server Error"
      })
    })
  }
  static create(req, res, next){
    if(typeof req.body.popularity == 'string'){
      req.body.popularity = parseFloat(req.body.popularity);
    }
    if(typeof req.body.tags == 'string'){
      req.body.tags = req.body.tags.split(',')
    }
    Movie.create(req.body)
    .then(result => {
      console.log(result)
      res.status(200).json(result.ops[0])
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json({
        message : "Internal Server Error"
      })
    })
  }

  static update(req, res, next){
    if(typeof req.body.popularity == 'string'){
      req.body.popularity = parseFloat(req.body.popularity);
    }
    if(typeof req.body.tags == 'string'){
      req.body.tags = req.body.tags.split(',')
    }
    Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      console.log(result)
      return Movie.findById(req.params.id)
    })
    .then(result=>{      
      res.status(200).json(result) 
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json({
        message : "Internal Server Error"
      })
    })
  }


  static remove(req, res, next){
    let data = null;
    Movie.findById(req.params.id)
    .then(result=>{
      data = result;
      return Movie.findByIdAndDelete(req.params.id)
    })
    .then(result=>{
      console.log(result)
      res.status(200).json(data) 
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json({
        message : "Internal Server Error"
      })
    })
  }
}

module.exports = MovieController
