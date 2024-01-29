import express, { Request, Response } from 'express';
import { body } from 'express-validator'
import { User } from '../models/user';
import { BadRequestError } from '@purplecarrotnpm/common';
import jwt from 'jsonwebtoken'
import { validateRequest } from '@purplecarrotnpm/common';

const router = express.Router();

router.post(
    '/api/users/signup', 
[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must between 4 and 20 characters')
],
validateRequest,
 async (req: Request, res: Response) => {

    // If the user already exists
    const { email, password } = req.body
    const existingUser = await User.findOne({ email: email })
    
    if(existingUser) {
        throw new BadRequestError('Email in use')
    }

    // Create the user and save it to the database
    const user = User.build({ email: email, password: password })
    await user.save()

    // Generate JSON WEB TOKEN
    const userJWT = jwt.sign({
        id: user.id,
        email: user.email
    }, 
        process.env.JWT_KEY! // ! means we already check it in index.ts
    ) // verify signature

    // Store it on sesstion object
    req.session = {
        jwt: userJWT
    } // 这只是因为要传递给JSON或提交给TypeScript的类型定义文件不希望我们假设req会话中实际存在一个对象｡
    res.status(201).send({ user })

})

export { router as signupRouter }