import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

// express-async-errors package requires
app.get('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)



app.listen(3000, () => {
    console.log('listening on port 3000...!!!')
})