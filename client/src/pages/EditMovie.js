import React from 'react';
import {GET_MOVIE} from '../service/schema';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import EditForm from '../components/editForm'
import Loading from '../components/Loading'
import * as bulmaToast from "bulma-toast";

function EditMovie() {
    const {id} = useParams();
    const {loading,error,data} = useQuery(GET_MOVIE,{
        variables:{_id: id}
    });
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
        return(
            <div className="mainbody">
                <br></br>
                <br></br>
                <div className="edit-form-container">
                    <EditForm data={data.movie}/>
                </div>
            </div>
        )    
    }
}
export default EditMovie;