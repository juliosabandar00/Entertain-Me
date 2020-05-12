import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom';
import {DELETE_MOVIE, GET_MOVIES} from '../service/schema';
import {useMutation} from '@apollo/react-hooks'
import Loading from '../components/Loading'
import swal from 'sweetalert';
import * as bulmaToast from "bulma-toast";
import Empty from '../components/Empty'


function Movies() {
    const [deleteMovie] = useMutation(DELETE_MOVIE,{refetchQueries:[{query:GET_MOVIES}]})

    const history = useHistory()
    function deleteItem(id) {
        deleteMovie({variables:{_id:id}});
    }
    const {loading,error,data} = useQuery(GET_MOVIES);
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
    else if(data.movies.length < 1){
        return <Empty/>
    }

    else if(data){
    return(
        <div>
            <br/>
            <br/>
            <div className="card-container">
                {
                    data.movies.map((movie, idx)=> {
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
                                <div className="content">
                                    <div className="button-container">
                                        <button 
                                        className="button is-rounded is-small"
                                        onClick={()=>{
                                            history.push(`/movies/${movie._id}`, { movie: data })
                                        }}
                                        >Details</button>

                                        <button 
                                        className="button is-rounded is-small"
                                        onClick={()=>{
                                            history.push(`/movies/edit/${movie._id}`, { movie: data })
                                        }}
                                        >Edit</button>

                                        <button
                                        className="button is-rounded is-small"
                                        onClick={()=>{
                                            swal({
                                                title: "Are you sure?",
                                                text: "Once deleted, you will not be able to recover this imaginary file!",
                                                icon: "warning",
                                                buttons: true,
                                                dangerMode: true,
                                              })
                                              .then((willDelete) => {
                                                if (willDelete) {
                                                    deleteItem(movie._id);
                                                    swal("Poof! Your imaginary file has been deleted!", {
                                                        icon: "success",
                                                  } );
                                                }
                                            });                
                                        }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>
                        
                    )})
                }
            </div>
        </div>
    )}
}
export default Movies;