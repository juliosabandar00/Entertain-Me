import React from 'react';
import './App.sass';
import './App.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TV from './pages/TV';
import AddPage from './pages/AddPage'
import EditMovie from './pages/EditMovie'
import MovieDetails from './pages/MovieDetails'
import TVDetails from './pages/TVDetails'
import Favourites from './pages/Favourites'


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './service'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App(){
  return (
    <Router>
      <ApolloProvider client={client}>
        <Navbar/>
        <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/movies">
              <Movies/>
            </Route>
            <Route exact path="/tv">
              <TV/>
            </Route>
            <Route exact path="/add">
              <AddPage/>
            </Route>
            <Route exact path="/movies/edit/:id">
              <EditMovie/>
            </Route>
            <Route exact path="/movies/:id">
              <MovieDetails/>
            </Route>
            <Route exact path="/tv/:id">
              <TVDetails/>
            </Route>
            <Route exact path="/favourites">
              <Favourites/>
            </Route>

        </Switch>
        <Footer/>
      </ApolloProvider>
    </Router>
  );
}
export default App;
