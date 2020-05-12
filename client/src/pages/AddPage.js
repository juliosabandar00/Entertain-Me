import React, { useState } from 'react';
import {useMutation} from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import {ADD_MOVIE, GET_MOVIES, ADD_TV, GET_TVS} from '../service/schema';
import * as bulmaToast from "bulma-toast";



function TV() {
    const history = useHistory()
    const [title, setTitle] = useState(null)
    const [overview, setOverview] = useState(null)
    const [poster_path, setPoster_path] = useState(null)
    const [type, setType] = useState('Movie')
    const [popularity, setPopularity] = useState(null)
    const [tags, setTags] = useState([])
    const [addMovie] = useMutation(ADD_MOVIE,{refetchQueries:[{query:GET_MOVIES}]})
    const [addTv] = useMutation(ADD_TV,{refetchQueries:[{query:GET_TVS}]})


    const validate = () => {
        if(title && overview && poster_path && type && popularity){
            if(Number(popularity)){
                return true;
            }
        }
        return false;
    }
    const addItem = () => {
        if(validate() == true){
            let data = {
                title:title,
                overview: overview,
                poster_path: poster_path,
                popularity: Number(popularity),
                tags: tags
            }
            console.log(data)
            if(type==="Movie"){
                console.log('movie detect')
                addMovie({variables:{movie:data}})
            }
            else if(type === "TV"){
                console.log('TV Detect')
                addTv({variables:{movie:data}})

            }    
            history.push("/");
            bulmaToast.toast({
                message: "Edit Success",
                type: "is-primary",
                position: "top-center",
                closeOnClick: true,
                pauseOnHover: true,
                opacity: 0.8
            });
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
        <div className="mainbody">
            <br/>
            <br/>

            <div className="edit-form-container">
            <form>
            <div className="formTitle">
                <h1 className="formTitleText">Add Movie</h1>
            </div>

            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input 
                    className="input"
                    type="text"
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
                    onChange={(e)=>{
                        let temp = e.target.value.split(',')
                        setTags(temp);
                    }}
                    />
                </div>
            </div>


            <div className="field">
                <label className="label">Type</label>
                <div className="control">
                    <div className="select">
                        <select 
                        // value={this.state.value} 
                        onChange={(e)=>{
                            setType(e.target.value)
                        }}>
                            <option value="Movie">Movie</option>
                            <option value="TV">TV Series</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button 
                    onClick={addItem} 
                    className="button is-link">Submit</button>
                </div>
            </div>
        </form>
        </div>
        </div>
    )
}
export default TV;