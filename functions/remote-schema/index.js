const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  ${require('./types').types}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ...require('./queries').queries
  },
  Mutation: {
    ...require('./mutations').mutations
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
