const axios = require('axios');const Redis = require('ioredis');
const redis = new Redis();
const movieUrl = 'http://localhost:3001/movies';
const tvUrl = 'http://localhost:3002/tv';


const resolvers = {
  Query: {
    entertainme: async () => {
      console.log('eeeeee')
      try {
        const movies =  JSON.parse(await redis.get("movies"))
        const tvSeries =  JSON.parse(await redis.get("tvSeries"))
        if(tvSeries && movies){ 
          return({movies,tvSeries})
        }
        else {
          const { movieData } = await axios({
            url : movieUrl,
            method : "get"
          })
          const { tvData } = await axios({
            url : tvUrl,
            method : "get"
          })
          redis.set("movies", JSON.stringify(movieData));
          redis.set("tvSeries", JSON.stringify(tvData));
          return({movies: movieData,tvSeries: tvData})
        }
      } catch (error) {
        console.log(err)
      }
    },
    movies: async () => {
      try {
        const movies = JSON.parse(await redis.get('movies'));
        if(movies){ 
          return movies
        }
        else {
          const { data } = await axios({
            url : movieUrl,
            method : "get"
          });
          redis.set("movies", JSON.stringify(data))
          return data
        }
      } catch (error) {
        console.log(err)
      }
    },
    tvs: async () => {
      try {
        const tvSeries = JSON.parse(await redis.get('tvSeries'));
        if (tvSeries) {
          return tvSeries;
        }
        else {
          const { data } = await axios({
            url : tvUrl,
            method : "get"
          });
          redis.set('tvSeries', JSON.stringify(data));
          return data;
        }
      }
      catch (err) {
        console.log(err);
      }
    },
    movie: async (parent, args, context, info) => {
      try {
        const { _id } = args;
        const movies = JSON.parse( await redis.get('movies'));
        let movie = null;
        for(let i = 0; i< movies.length; i++){
          if(movies[i]._id == _id){
            movie = movies[i];
            break;
          }
        }
        if(movie){
          return movie;
        }
        else {
          const { data } = await axios({
            url : `${movieUrl}/${_id}`,
            method : "get"
          });
          if(data) {
            return data;
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    },
    tv: async (parent, args, context, info) => {
      try {
        const { _id } = args;
        const tvSeries = JSON.parse( await redis.get('tvSeries'));
        let tv = null;
        for(let i = 0; i< tvSeries.length; i++){
          if(tvSeries[i]._id == _id){
            tv = tvSeries[i];
            break;
          }
        }
        if(tv){
          return tv;
        }
        else {
          const { data } = await axios({
            url : `${tvUrl}/${req.params.id}`,
            method : "get"
          });
          if(data) {
            return data;
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const { movie } = args;
        const {data} = await axios({
          url : movieUrl,
          method : "post",
          data : movie
        })
        const movies =  JSON.parse(await redis.get("movies"))
        if(movies){
          movies.push(data)
          redis.set("movies", JSON.stringify(movies))
        }
        return data;
      } 
      catch (err) {
        console.log(err)
      }
    },
    addTv: async (_, args) => {
      try {
        const { tv } = args;
        const {data} = await axios({
          url : tvUrl,
          method : "post",
          data : tv
        })
        const tvSeries =  JSON.parse(await redis.get("tvSeries"))
        if(tvSeries){
          tvSeries.push(data)
          redis.set("tvSeries", JSON.stringify(tvSeries))
        }
        return data;
      } 
      catch (err) {
        console.log(err)
      }
    },
    updateMovie: async (_, args) => {
      try {
        const { movie, _id } = args;
        const {data} = await axios({
          url : `${movieUrl}/${_id}`,
          method : "put",
          data : movie
        })
        let movies =  JSON.parse(await redis.get("movies"))
        if(movies){
          for(let i=0; i<movies.length; i++){
            if(movies[i]._id == data._id){
              movies[i] = data;
              break;
            }
          }
          redis.set("movies", JSON.stringify(movies))
          return data;
        }
      } catch (err) {
        console.log(err)
      }
    },
    updateTv: async (_, args) => {
      try {
        const { tv, _id } = args;
        const {data} = await axios({
          url : `${tvUrl}/${_id}`,
          method : "put",
          data : tv
        })
        let tvSeries =  JSON.parse(await redis.get("tvSeries"))
        if(tvSeries){
          for(let i=0; i<tvSeries.length; i++){
            if(tvSeries[i]._id == data._id){
              tvSeries[i] = data;
              break;
            }
          }
          redis.set("tvSeries", JSON.stringify(tvSeries))
          return data;
        }
      } catch (err) {
        console.log(err)
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const { _id } = args;
        const {data} = await axios({
          url : `${movieUrl}/${_id}`,
          method : "delete"
        })
        console.log(data)
        let movies =  JSON.parse(await redis.get("movies"))
        if(movies){
          for(let i=0; i<movies.length; i++){
            if(movies[i]._id == data._id){
              movies.splice(i, 1)
              break;
            }
          }
          redis.set("movies", JSON.stringify(movies))
          return data;
        }
      } catch (err) {
        console.log(err)
      }    
    },
    deleteTv: async (_, args) => {
      try {
        const { _id } = args;
        const {data} = await axios({
          url : `${tvUrl}/${_id}`,
          method : "delete"
        })
        let tvSeries =  JSON.parse(await redis.get("tvSeries"))
        if(tvSeries){
          for(let i=0; i<tvSeries.length; i++){
            if(tvSeries[i]._id == data._id){
              tvSeries.splice(i, 1)
              break;
            }
          }
          redis.set("tvSeries", JSON.stringify(tvSeries))
          return data;
        }
      } catch (err) {
        console.log(err)
      }    
    }
  }
};

module.exports = resolvers;
