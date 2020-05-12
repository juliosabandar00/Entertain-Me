import React from 'react';
import {useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_MOVIE} from '../service/schema';
import {ADD_TO_FAVOURITES, GET_FAVOURITES, REMOVE_FAVOURITES} from '../service/schema'
import Loading from '../components/Loading'
import * as bulmaToast from "bulma-toast";


function MovieDetails() {
    const {id} = useParams();
    const {loading,error,data} = useQuery(GET_MOVIE,{
        variables:{_id: id}
    });
    const [addToFavourites] = useMutation(ADD_TO_FAVOURITES)
    const [removeFavourites] = useMutation(REMOVE_FAVOURITES)
    const {data:dataFavs} = useQuery(GET_FAVOURITES)
    if(error){
        bulmaToast.toast({
            message: "Error!",
            type: "is-danger",
            position: "top-center",
            closeOnClick: true,
            pauseOnHover: true,
            opacity: 0.8,
        });
    }
    else if(loading){
        return <Loading/>
    }
    else if (data) {
        let favoured = dataFavs.favourites.find(fav => fav._id === data.movie._id)

        return(
            <div className="detail-container">
                <br/>
                <br/>
                <div className="card detail-card">
                    <div className="detail-image">
                        <img className="detail-image" src={data.movie.poster_path} alt="Placeholder image"/>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content details_header">
                                <p className="title is-8 details_header_content">{data.movie.title} </p>
                                <div className="pop_container details_header_content">{data.movie.popularity}</div>

                            </div>

                        </div>
                        <div className="tags detail-content" >
                            {data.movie.tags.map((tag, idxtag)=> {
                                return(
                                    <div key={idxtag}> 
                                        <div className="tag">{tag}</div>
                                    </div>
                                )
                            })}
                            </div>

                        <div className="content detail-content">
                        <hr/>

                            <div className="overview detail-content">
                                <p>{data.movie.overview}</p>
                            </div>
                            {
                                favoured 
                                ?   <button 
                                    className="button is-rounded is-small"
                                    onClick={()=>{
                                        removeFavourites({variables:{_id:data.movie._id}})
                                    }}>
                                    Remove From Favourites
                                    </button>
                                :   <button 
                                    className="button is-rounded is-small"
                                    onClick={()=>{
                                        addToFavourites({variables:{
                                            _id: data.movie._id,
                                            title: data.movie.title,
                                            poster_path: data.movie.poster_path,
                                            popularity: data.movie.popularity,
                                            tags: data.movie.tags,
                                            type: 'movie'
                                        }})
                                    }}
                                    >
                                    Add To Favourites
                                    </button>
                            }

                        </div>

                    </div>
                </div>
            </div>
        )    
    }
}
export default MovieDetails;