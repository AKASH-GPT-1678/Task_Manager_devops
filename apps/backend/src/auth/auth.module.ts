import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshJwtStrategy } from './strategy/refresh-token.strategy';


@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET, // Correct property
      signOptions: { expiresIn: '1d' }, // Token expiration
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
