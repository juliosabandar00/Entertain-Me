import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_ALL} from '../service/schema';
import HomeBanner from '../components/HomeBanner'
import Loading from '../components/Loading'
import * as bulmaToast from "bulma-toast";
function Home() {
  const {loading,error,data} = useQuery(GET_ALL);
  if(error){
    bulmaToast.toast({
      message: "Error!",
      type: "is-danger",
      position: "top-center",
      closeOnClick: true,
      pauseOnHover: true,
      opacity: 0.8,
    });
    return (
      <>
      <HomeBanner/>
      </>)
  }
  else if(loading){
    return (
      <>
      <HomeBanner/>
      <Loading/>
      </>)
  }
  if(data){
    var all = data.movies.concat(data.tvs)
    return (
      <>
        <HomeBanner/>
        <div className="card-container">
            {
              all.map((movie, idx)=> {
                  return (
                  <div className="card menu-card" key={idx}>
                      <div className="card-image">
                          <figure className="image is-3by4">  
                              <img src={movie.poster_path} alt="Placeholder image"/>
                          </figure>
                      </div>
                      <div className="card-content">
                          <div className="media">
                              <div className="media-content">
                                  <p className="title is-4">{movie.title}</p>
                                  <div className="rating_container"> 
                                      {}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              )})
            }
            </div>
        
      </>
    );
  }
}
export default Home;