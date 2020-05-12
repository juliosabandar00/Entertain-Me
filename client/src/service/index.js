import ApolloClient from 'apollo-boost';
import { GET_FAVOURITES } from './schema'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  clientState: {
    resolvers: {
      Mutation: {
        addToFavourites: (_, variables, client) => {
          const { favourites } = client.cache.readQuery({ query: GET_FAVOURITES })
          const fav = {
            _id: variables._id,
            title: variables.title,
            poster_path: variables.poster_path,
            popularity: variables.popularity,
            tags: variables.tags,
            type: variables.type,
            __typename: 'favourites'
          }
          const newFavourites = [...favourites, fav]
          client.cache.writeData({
            data: {
              favourites: newFavourites
            }
          })
        },
        removeFavourites: (_, variables, client) => {
          // console.log(variables)
          const { favourites } = client.cache.readQuery({ query: GET_FAVOURITES })
          const newFavourites = favourites.filter(movie => movie._id !== variables._id)
          client.cache.writeData({
            data: {
              favourites: newFavourites ? [...newFavourites] : []
            }
          })
        }
      }
    },
    defaults: {
      favourites: []
    }
  }
})

export default client
