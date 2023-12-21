import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, firstName, lastName, firstNameLocal, lastNameLocal, middleName, middleNameLocal, createdAt, updatedAt, phone, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: {
        name: user.username,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '20s',
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      // refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.username,
      sub: {
        name: user.username,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
