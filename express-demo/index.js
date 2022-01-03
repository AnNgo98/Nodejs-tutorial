const joi = require( 'joi' );
const express = require( 'express' );
const app = express();

app.use( express.json() );

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' }
];

app.get( '/', ( req, res ) => {
    console.log( 'Hello world' );
} );

app.get( '/api/courses', ( req, res ) => {
    res.send([ 1, 2, 3 ]);
} );

app.get( '/api/courses/:id', ( req, res ) => {
    const course = courses.find( c => c.id === parseInt( req.params.id ) );
    
    if ( !courses ) {
        res.status( 404 ).send( 'not found' );
        return;
    };

    res.send( course );
} );

app.post( '/api/courses', ( req, res ) => {
    const validate = validateCourse( req.body );

    if ( validate.error ) {
        res.status( 400 ).send( validate.error );
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };

    courses.push( course );
    res.send( courses );
} );

app.put( '/api/courses/:id', ( req, res ) => {
    const course = courses.find( c => c.id === parseInt( req.params.id ) );

    if ( !courses ) {
        res.status( 404 ).send( 'not found' );
        return;
    };

    const validate = validateCourse( req.body ); 

    if ( validate.error ) {
        res.status( 400 ).send( validate.error );
        return;
    }

    course.name = req.body.name;
    res.send( courses );
} );

app.delete( '/api/courses/:id', ( req, res ) => {
    const course = courses.find( c => c.id === parseInt( req.params.id ) );

    if ( !course ) {
        res.status( 404 ).send( 'not found' );
        return;
    };

    const index = courses.indexOf( course );

    courses.splice( index, 1 );
    res.send( courses );
} );

app.get( '/api/posts/:year/:month', ( req, res ) => {
    res.send( req.query );
} );

function validateCourse( course ) {
    const schema = {
        name: joi.string().min( 3 ).required(),
    };

    return joi.validate( course, schema );
}

const port = process.env.PORT || 3000;

app.listen( port, () => console.log( 'Hihi' ) );