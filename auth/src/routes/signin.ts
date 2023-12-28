import express, { Request, Response } from 'express';
import { body} from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-errors';

import { Password } from '../services/password'
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin',
[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Upi must submit password')
],
validateRequest,
 async (req: Request, res: Response) => {
    // async, query the user from database
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await Password.compare(
        existingUser.password,
        password
    )
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials')
    }

    // Generate JSON WEB TOKEN,签发 token
    const userJWT = jwt.sign({
        id:  existingUser.id,
        email:  existingUser.email
    }, 
        process.env.JWT_KEY! // ! means we already check it in index.ts
    ) // verify signature

    // Store it on sesstion object，存储在服务端
    req.session = {
        jwt: userJWT
    } // 这只是因为要传递给JSON或提交给TypeScript的类型定义文件不希望我们假设req会话中实际存在一个对象｡
    res.status(200).send(  existingUser )

});

export { router as signinRouter}