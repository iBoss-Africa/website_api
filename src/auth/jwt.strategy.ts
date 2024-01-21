import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "./auth.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service'; // Import PrismaService



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService, // Inject PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload){
   const {id} = payload

   const user = await this.prismaService.user.findFirst({
    where: {
        id: id
    }
   })
    if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    
    return {user};
  }
}