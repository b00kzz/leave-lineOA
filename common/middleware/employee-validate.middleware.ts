import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

export class employeeValidate implements NestMiddleware {
    constructor(
        private jwtService: JwtService
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        console.log('middleware funtion');
        const { authorization } = req.headers;
        next();
        if (!authorization) {
            return res
                .status(403)
                .send({ error: 'No authendication token provided!' });
        }
        console.log(authorization)
        if (!!authorization) {
            // jwt token
            console.log("ee");
            const cookie = req.cookies['jwt'];
            // const jwt = await this.jwtService.verify(
            //     cookie,
            //     jwtConstants.secret,
            //   );
            // console.log(jwt)
            const bearerHeader = req.header;
            console.log(cookie);
            console.log(bearerHeader);
            // validate token
            // parse token
            console.log("next");
            next();
        } else {
            return res
                .status(403)
                .send({ error: 'valid authendication token provided!' });
        }
    }
}