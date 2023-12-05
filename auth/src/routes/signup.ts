import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-valdation-error';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must between 4 and 20 characters')
],
 async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
       throw new RequestValidationError(errors.array())
    }

    // If the user already exists
    const { email, password } = req.body
    const existingUser = await User.findOne({ email: email })
    
    if(existingUser) {
        console.log('Email in use')
        return res.send({})
    }

    // Create the user and save it to the database
    const user = User.build({ email: email, password: password })
    await user.save()

    res.status(201).send({ user })

    // Generate JWT

})

export { router as signupRouter }