import express from 'express';
import { currentUser } from '@purplecarrotnpm/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({currentUser: req.currentUser }); // CurrentUser is the actual payload
})

export { router as currentUserRouter }