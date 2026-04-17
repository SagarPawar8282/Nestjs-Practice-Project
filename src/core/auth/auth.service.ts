import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService:JwtService){}

  async validateToken(token:string){
    return this.jwtService.verifyAsync(token);
  }

  async decodeToken(token:string){
    return this.jwtService.decode(token);
  }
}

