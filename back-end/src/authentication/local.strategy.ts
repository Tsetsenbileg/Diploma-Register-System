import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './authentication.dto';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthenticationService) {
        super();
    }

    async validate(loginDto: LoginDto): Promise<any> {
        const user = await this.authService.validateUser(loginDto);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}