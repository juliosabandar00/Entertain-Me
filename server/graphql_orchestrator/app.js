const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs/index');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs, resolvers
});

server.listen().then(({ url }) => console.log('Server listen on ' + url));