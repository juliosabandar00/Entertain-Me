const { getDatabase } = require("../config/config.js")
const Movie = getDatabase().collection("movies")
const { ObjectId } = require("mongodb")

class MovieModel {
  static find(){
    return Movie.find().toArray()
  }
  static findById(id){
    return Movie.findOne({_id: ObjectId(id)})
  }
  static create(newMovie){
    return Movie.insertOne(newMovie)
  }
  static findByIdAndUpdate(id, updatedData){
    Movie.updateOne({_id: ObjectId(id)}, {
      $set : updatedData
    })
    .then(()=>{
      return Movie.findOne({_id: ObjectId(id)})
    })
  }
  static findByIdAndDelete(id){
    Movie.deleteOne({_id: ObjectId(id)})
    .then(()=>{
      return Movie.find().toArray()
    })
  }
}

module.exports  = MovieModel