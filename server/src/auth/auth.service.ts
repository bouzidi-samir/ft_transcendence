import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthLoginOutput } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

export interface JWTPayload {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    
    const user = await this.userService.userGetByName(name);
    // const user = await this.userService.userGetByEmail(email);
    const  valid = await bcrypt.compare(password, user?.password);
    if (user && valid) {
      const { password, ...result } = user;
      return result;
   
    }
    return null;
  }

  async login(user: User): Promise<AuthLoginOutput> {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
   
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }


}
