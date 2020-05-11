const { gql } = require('apollo-server');

const typedefs = gql `
type Movie {
  _id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}
type Tv {
  _id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}
type EntertaineMe {
  movies: [Movie],
  tvSeries: [Tv]
}
input InputMovie {
  title: String!
  overview: String!
  poster_path: String!
  popularity: Float!
  tags: [String]
}
input InputTv {
  title: String!
  overview: String!
  poster_path: String!
  popularity: Float!
  tags: [String]
}
type Query {
  entertainme: EntertaineMe
  movies: [Movie]
  movie(_id: ID): Movie
  tvs: [Tv]
  tv(_id: ID!): Tv
}
type Mutation {
  addMovie(movie: InputMovie): Movie
  addTv(tv: InputTv): Tv
  updateMovie(movie: InputMovie, _id: ID): Movie
  updateTv(tv: InputTv, _id: ID!): Tv
  deleteMovie(_id: ID): Movie
  deleteTv(_id: ID): Tv
}`;

module.exports = typedefs;
