const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { graphqlHTTP } =  require( 'express-graphql');
const app = express();
const  graphqlschema =  require( './graphql/schema/index.js');
const  graphqlResolvers =  require('./graphql/resolvers/index.js');
const connectDB = require('./config/db.js');
const cors = require('cors');
// const body = require("body-parser");
app.use(express.json());

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



  const multer = require('multer');
  let DIR = './public/uploads/';
  const { uuid } = require('uuidv4');
  const User = require('./models/user.js');
const Appointment = require('./models/appointment.js')
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuid() + '-' + fileName);
    },
  });
  //multer middleware
  let upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });
  function checkFileType(file, cb) {
    const filetypes = /pdf|jpg|jpeg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Files Only!');
    }
  }
  
  app.post('/uploadDoc', upload.single('doc'), async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const { id } = req.body;
    const appointment = await Appointment.findById(id);
    if(appointment) {
      appointment.report = `/${req.file.path}`;
      const resp = await appointment.save();
      if(resp) {
        res.send('Successfully uploaded pdf');
        } else {
          res.send("Some err has occured!!");
        }
    }   
  });    

app.post('/uploadImage', upload.single('doc'), async (req, res) => {
  const {id} = req.body;
  const user = await User.findById(id);
  if(user) {
    user.image = `/${req.file.path}`;
    const resp = await user.save();
    if(resp) {
      res.send('Successfully uploaded image');
    } else {
      res.send("Some err has occured!!");
    }
  }
})



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
