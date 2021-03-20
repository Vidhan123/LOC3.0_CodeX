const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { graphqlHTTP } =  require( 'express-graphql');
const app = express();
const  graphqlschema =  require( './graphql/schema/index.js');
const  graphqlResolvers =  require('./graphql/resolvers/index.js');
const connectDB = require('./config/db.js');
const cors = require('cors');

const paymentRouter = require('./routes/paymentRouter.js');

dotenv.config();

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cors());

app.use(paymentRouter);
app.use(
    '/graphql',
    graphqlHTTP((req, res, graphQLParams) => {
      return {
        schema: graphqlschema,
        rootValue: graphqlResolvers,
        context: { req },
        graphiql: true,
      };
    })
  );

  let server = require( 'http' ).Server( app );
  let io = require( 'socket.io' )( server );
  let stream = require( './ws/stream' );
  let path = require( 'path' );
  let favicon = require( 'serve-favicon' );
  
  app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
  app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );
  
  app.get( '/', ( req, res ) => {
      res.sendFile( __dirname + '/index.html' );
  } );
  
  io.of( '/stream' ).on( 'connection', stream );

const docRouter = require('./routes/docUploads');
const imageRouter = require('./routes/picUploads');

app.use('/uploadimage', imageRouter);

app.use('/uploaddoc', docRouter);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

module.exports = {
  server
}
