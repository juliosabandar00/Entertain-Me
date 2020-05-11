const TVSerie = require("../models/tvSerie");
class TVController {
  static find(req, res, next){
    TVSerie.find()
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
    TVSerie.findById(req.params.id)
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
    TVSerie.create(req.body)
    .then(result => {
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
    TVSerie.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      console.log(result)
      return TVSerie.findById(req.params.id)
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
    console.log('masuk removers')
    let tv = null;
    TVSerie.findById(req.params.id)
    .then(result=>{
      tv = result;
      return TVSerie.findByIdAndDelete(req.params.id)
    })
    .then(result=>{
      console.log(result)
      res.status(200).json(tv) 
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json({
        message : "Internal Server Error"
      })
    })
  }
}

module.exports = TVController
