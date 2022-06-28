import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "365d" }
  })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService]
})
export class AuthenticationModule { }
