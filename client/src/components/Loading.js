import React from 'react';
function Loading (){
    return (
        <div className="loadingPage"> 
            <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
export default Loading;