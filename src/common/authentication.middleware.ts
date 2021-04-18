// To protect your routes and ensure that every user gets authenticated before accessing some of the resources provided by your API, you will make use of Auth0.
// npm install express-jwt jwks-rsa dotenv
import { Injectable, NestMiddleware } from '@nestjs/common'
import jwt = require('express-jwt')
import { expressJwtSecret } from 'jwks-rsa'
import { Request, Response } from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        jwt({
            secret: expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${process.env.AUTH0_DOMAIN}/.wellknown/jwks.json`
            }),
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            algorithms: ['RS256']
        })(req, res, (err => {
            if (err) {
                const status = err.status || 500;
                const message = err.message || 'Sorry we were unable to process your request';
                return res.status(status).send({ message })
            }
        }))
        next()
    }
}

// This code will check if the Access Token included in a request is valid.If the token is not valid,
// the user will get a message indicating that the authorization token is not valid.

// After this, navigate back to the blog.module.ts file and update the file as shown here: