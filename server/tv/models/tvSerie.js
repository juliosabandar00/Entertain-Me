const { getDatabase } = require("../config/config.js")
const TVSerie = getDatabase().collection("tvSeries")
const { ObjectId } = require("mongodb")

class TVSerieModel {
  static find(){
    return TVSerie.find().toArray()
  }
  static findById(id){
    return TVSerie.findOne({_id: ObjectId(id)})
  }
  static create(newTVSerie){
    return TVSerie.insertOne(newTVSerie)
  }
  static findByIdAndUpdate(id, updatedData){
    return TVSerie.updateOne({_id: ObjectId(id)}, {
      $set : updatedData
    })
  }
  static findByIdAndDelete(id){
    return TVSerie.deleteOne({_id: ObjectId(id)})
  }
}

module.exports  = TVSerieModel
