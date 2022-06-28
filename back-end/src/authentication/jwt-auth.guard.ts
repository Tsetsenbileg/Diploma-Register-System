import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from './constants';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        const headers = context.switchToHttp().getRequest().headers;

        if (!headers.authorization) return false;

        const [prefix, token] = headers.authorization.split(' ');
        if (prefix !== 'Bearer') return false;

        const decode: any = jwt.verify(token, jwtConstants.secret);
        if (!decode) return false;

        const request = context.switchToHttp().getRequest();
        request.user = {
            id: decode.userId,
            username: decode.username,
            university: decode.university,
            token: token,
        };


        return true;
    }

    handleRequest(err, user, info) {
        if (err || !user) {

            throw err || new UnauthorizedException();
        }
        return user;
    }
}
