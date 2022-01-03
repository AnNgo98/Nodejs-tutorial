const express = require( 'express' );
const router = express.Router();

//posts model
const Posts = require( '../../models/Posts' );

// @routes GET api/posts
// @desc Get all post
router.get( '/', async ( req, res ) => {
    try {
        const posts = await Posts.find();

        if ( !posts ) throw Error( 'No item' );

        res.status( 200 ).json( posts );
    } catch (error) {
        res.status( 400 ).json({ msg: error });   
    }
} );

// @routes POST api/posts
// @desc Create An post
router.post( '/', async ( req, res ) => {
    const newPost = new Posts( req.body );

    try {
        const post = await newPost.save();

        if ( !post ) throw Error( 'Something went wrong' );

        res.status( 200 ).json( post );
    } catch (error) {
        res.status( 400 ).json({ msg: error });
    }
} );

// @routes Delete api/posts/:id
// @desc delete post
router.delete( '/:id', async ( req, res ) => {
    try {
        const post = await Posts.findByIdAndDelete( req.params.id );

        if ( !post ) throw Error( 'No item' );

        res.status( 200 ).json({ success: true });
    } catch (error) {
        res.status( 400 ).json({ msg: error }); 
    }
} );

// @routes update api/posts/:id
// @desc update post
router.put( '/:id', async ( req, res ) => {
    try {
        const post = await Posts.findByIdAndUpdate( req.params.id, req.body );

        if ( !post ) throw Error( 'Something went wrong' );

        res.status( 200 ).json({ success: true });
    } catch (error) {
        res.status( 400 ).json({ msg: error }); 
    }
} );

// @routes GET by id api/posts:id
// @desc Get by id post
router.get( '/:id', async ( req, res ) => {
    try {
        const post = await Posts.findById( req.params.id );

        if ( !post ) throw Error( 'No item' );

        res.status( 200 ).json( post );
    } catch (error) {
        res.status( 400 ).json({ msg: error });   
    }
} );

module.exports = router;
