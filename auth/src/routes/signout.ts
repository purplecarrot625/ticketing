import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {

    // Empty the info in cookies => destroy the session
    req.session = null

    res.send({})

})

export { router as signoutRouter }