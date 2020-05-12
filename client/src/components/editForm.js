import React, { useState } from 'react';
import {useMutation} from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import {UPDATE_MOVIE, GET_MOVIES, UPDATE_TV, GET_TVS} from '../service/schema';
import * as bulmaToast from "bulma-toast";

function EditForm(props) {
    const history = useHistory()
    const [title, setTitle] = useState(props.data.title)
    const [overview, setOverview] = useState(props.data.overview)
    const [poster_path, setPoster_path] = useState(props.data.poster_path)
    const [popularity, setPopularity] = useState(props.data.popularity)
    const [tags, setTags] = useState(props.data.tags)
    const [editMovie] = useMutation(UPDATE_MOVIE,{refetchQueries:[{query:GET_MOVIES}]})
    const [editTV] = useMutation(UPDATE_TV,{refetchQueries:[{query:GET_TVS}]})
    
    const validate = () => {
        if(title && overview && poster_path && popularity){
            if(Number(popularity)){
                return true;
            }
        }
        return false;
    }
    const editItem = () => {
        if(validate()){
            let data = {
                title:title,
                overview: overview,
                poster_path: poster_path,
                popularity: Number(popularity),
                tags: tags
            }
            if(props.data.__typename == 'Movie'){
                editMovie({variables:{_id:props.data._id, movie:data}})

                history.push("/movies");
                bulmaToast.toast({
                    message: "Edit Success",
                    type: "is-primary",
                    position: "top-center",
                    closeOnClick: true,
                    pauseOnHover: true,
                    opacity: 0.8
                });
            }else{
                bulmaToast.toast({
                    message: "Edit Failed",
                    type: "is-danger",
                    position: "center",
                    closeOnClick: true,
                    pauseOnHover: true,
                    opacity: 0.8
                });
            }
        }
        else{
            bulmaToast.toast({
                message: "Validation Error: Fields Can't Be Empty",
                type: "is-danger",
                position: "top-center",
                closeOnClick: true,
                pauseOnHover: true,
                opacity: 0.8,
            });
        }
    }
    return(
        <div>
        <br/>
        <br/>

        <div className="formTitle">
            <h1 className="formTitleText">Update Movie</h1>
        </div>
        <form>
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input 
                    className="input"
                    type="text"
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Overview</label>
                <div className="control">
                    <textarea 
                    className="textarea" 
                    placeholder="Textarea"
                    value={overview}
                    onChange={(e)=>{
                        setOverview(e.target.value)
                    }}>
                    </textarea>
                </div>
            </div>

            <div className="field">
                <label className="label">Image URL</label>
                <div className="control">
                    <input 
                    className="input"
                    type="text"
                    value={poster_path}

                    onChange={(e)=>{
                        setPoster_path(e.target.value)
                    }}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Popularity</label>
                <div className="control">
                    <input 
                    className="input"
                    type="text"
                    placeholder="Text input"
                    value={popularity}
                    onChange={(e)=>{
                        setPopularity(e.target.value)
                    }}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Tags</label>
                <div className="control">
                    <input 
                    className="input"
                    type="text"
                    placeholder="Insert tags seperated by commas"
                    value={tags.join(',')}
                    onChange={(e)=>{
                        let temp = e.target.value.split(',')
                        setTags(temp);
                    }}
                    />
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button 
                    onClick={editItem} 
                    className="button is-link">Submit</button>
                </div>
            </div>
        </form>
        </div>
    )    
}
export default EditForm;