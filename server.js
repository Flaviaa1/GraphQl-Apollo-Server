const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs')
const {connection} = require ('./database/util/index')
const { verifyUser } = require('./helper/context');
// set env variables
dotEnv.config();

const app = express();
//cors
app.use(cors());

// body parser middlware
app.use(express.json());

//db connectivity
connection();


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context:  async ({req}) => { 
        await verifyUser(req)
        console.log('context rename');
        return {
            email: req.email,
            loggedInUserId: req.loggedInUserId 
        }
    }
})

apolloServer.applyMiddleware({ app, path: '/graphql' });
const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
    res.send({ message: 'Hello' });
  })
  

app.listen(PORT, () =>{
    console.log(`server listening on PORT: ${PORT}`);
    console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});