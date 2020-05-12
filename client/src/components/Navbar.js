import React from 'react';
import { Link } from "react-router-dom";
function Navbar (){
    return (
        <div>
            <nav className="navbar navey" role="navigation" aria-label="main navigation">
                <div className="navbar-brand"> 
                    <Link to="/" className="navbar-item">
                        <img src="/logo192.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"  height="28"></img>
                    </Link>   
                    <a href="/search" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/movies" className="navbar-item"> Movies </Link>   
                        <Link to="/tv" className="navbar-item"> TV </Link>   
                        <Link to="/favourites" className="navbar-item"> Favourites </Link>   

                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {/* <a to="/add" className="button is-primary"> */}
                                    <Link to="/add" className="button is-primary">   
                                    <strong>Add New Film</strong>
                                    </Link> 
                                {/* </a> */}
                            </div>
                        </div>
                        </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;