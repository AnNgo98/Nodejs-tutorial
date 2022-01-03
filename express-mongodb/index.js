const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const { MONGO_URL } = require( './config' );

const postsRoutes = require( './routes/api/posts' );
// pass db: H7z269Aj5bngOG6A

// BodyParser middlewares
app.use( express.json() );

// routes
// app.get( '/', ( req, res ) => {
//     res.send( 'Hi' );
// } );

mongoose.connect( MONGO_URL )
.then( () => console.log( 'Mongo connected !' ) )
.catch( err => console.log( err ) );

// User routes
app.use( '/api/posts', postsRoutes );

// how to listen
const port = process.env.PORT || 3000;

app.listen( port, () => console.log( `server ${port}` ) );