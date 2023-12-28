/**
 * Middleware for extracting the current user info from cookies
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

// 告诉ts，在express中找到request的interface，添加额外的property currentuser
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.session?.jwt) {
        return next()
    }

    try {
        const payload = jwt.verify(
            req.session.jwt, 
            process.env.JWT_KEY!
            ) as UserPayload; // typescript
        req.currentUser = payload
    } catch (err) {
    }
    next() // No matter if we have decoded the payload successfully, we should go to the next function
}