/**
 * Middleware for reject the user that have not logged in.
 * Run after the currentUser middleware.
 */
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // Check if the user has token
    if(!req.currentUser) {
        throw new NotAuthorizedError()
    }

    next()
}