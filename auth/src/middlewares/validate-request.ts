import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'

// product the error

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if( !errors.isEmpty() ) {
        throw new RequestValidationError(errors.array())
    }

    // if pass validation
    next()
}