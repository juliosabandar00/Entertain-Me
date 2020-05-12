import gql from 'graphql-tag'


export const GET_MOVIES = gql`
{
  movies{
    _id
    title
    poster_path
  }
}
`

export const GET_TVS = gql`
{
  tvs{
    _id
    title
    poster_path
  }
}
`

export const GET_ALL = gql`
{
    movies{
      _id
      title
      poster_path
    }
    tvs{
      _id
      title
      poster_path
    }
}
`



export const GET_MOVIE = gql`
  query movie($_id:ID){
    movie(_id:$_id){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`



export const GET_TV = gql`
  query tv($_id:ID){
    tv(_id:$_id){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`


export const ADD_MOVIE = gql`
  mutation addMovie($movie:InputMovie){
    addMovie(movie:$movie){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_TV = gql`
  mutation addTv($tv:InputTv){
    addTv(tv:$tv){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie($_id:ID){
    deleteMovie(_id:$_id){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_TV = gql`
  mutation deleteMovie($_id:ID){
    deleteMovie(_id:$_id){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`


export const UPDATE_MOVIE = gql`
  mutation updateMovie($_id:ID,$movie:InputMovie!){
    updateMovie(_id:$_id, movie:$movie){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const UPDATE_TV = gql`
  mutation updateTv($_id:ID,$tv:InputTv!){
    updateTv(_id:$_id, tv:$tv){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_FAVOURITES = gql`
  query{
    favourites @client{
      _id
      title
      poster_path
      popularity
      tags
      type
    }
}`

export const ADD_TO_FAVOURITES = gql`
  mutation addToFavourites($_id: ID, $title:String,$poster_path:String,$popularity:Float,$tags:[String],$type:String){
    addToFavourites(_id: $_id,title:$title,poster_path:$poster_path,popularity:$popularity,tags:$tags,type:$type) @client{
      _id
    }
  }
`

export const REMOVE_FAVOURITES = gql`
    mutation removeFavourites($_id: ID){
        removeFavourites(_id: $_id) @client{
            _id
        }
    }
`

