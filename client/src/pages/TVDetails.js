import React from 'react';
import {GET_TV} from '../service/schema';
import {useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {ADD_TO_FAVOURITES, GET_FAVOURITES, REMOVE_FAVOURITES} from '../service/schema'
import Loading from '../components/Loading'

function EditTV() {
    const {id} = useParams();
    const {loading,error,data} = useQuery(GET_TV,{
        variables:{_id: id}
    });
    const [addToFavourites] = useMutation(ADD_TO_FAVOURITES)
    const [removeFavourites] = useMutation(REMOVE_FAVOURITES)
    const {data:dataFavs} = useQuery(GET_FAVOURITES)

    if(error){
        return <p>error</p>
    }
    else if(loading){
        return <Loading/>
    }
    else if (data) {
        let favoured = dataFavs.favourites.find(fav => fav._id === data.tv._id)

        return(
            <div className="detail-container">
                <div className="card detail-card">
                    <div className="detail-image">
                        <img className="detail-image" src={data.tv.poster_path} alt="Placeholder image"/>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content details_header">
                                <p className="title is-8 details_header_content">{data.tv.title} </p>
                                <div className="pop_container details_header_content">{data.tv.popularity}</div>
                            </div>
                        </div>
                        <div className="tags detail-content" >
                            {data.tv.tags.map((tag, idxtag)=> {
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
                                <p>{data.tv.overview}</p>
                            </div>
                            {
                                favoured 
                                ?   <button 
                                    className="button is-rounded is-small"
                                    onClick={()=>{
                                        removeFavourites({variables:{_id:data.tv._id}})
                                    }}>
                                    Remove From Favourites
                                    </button>
                                :   <button 
                                    className="button is-rounded is-small"
                                    onClick={()=>{
                                        addToFavourites({variables:{
                                            _id: data.tv._id,
                                            title: data.tv.title,
                                            poster_path: data.tv.poster_path,
                                            popularity: data.tv.popularity,
                                            tags: data.tv.tags,
                                            type: 'tv'
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
export default EditTV;