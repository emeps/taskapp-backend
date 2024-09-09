import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: Users) {
    return {
      access_token: this.JwtService.sign(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try{
        const data =  this.JwtService.verify(token, {
            audience: 'users',
            issuer: 'login'
        })
        return data
    }catch(e){
        throw new BadRequestException(e)
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }

    const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UnauthorizedException('E-mail e/ou senha incorretos');
  }
    return {
      name:user.name,
      email:user.email,
      token: this.createToken(user)
    };
  }

  async forget(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail está incorreto');
    }
    
    return true;
  }

  async reset(password: string, token: string) {
    const id = 0;
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const { data: newUser } = await this.userService.create(data);
    return this.createToken(newUser);
  }
}
