import { UserService } from './../user/user.service';
import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService:UserService,
        private readonly authService : AuthService,
    ){}

    @Post('login')
    async login(@Body()body: AuthLoginDTO){
        const {email, password} = body
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body()body: AuthRegisterDTO){
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body()body: AuthForgetDTO){
        return this.authService.forget(body.email)
    }

    @Post('reset')
    async reset(@Body()body: AuthResetDTO){
        return this.authService.reset(body.password, body.token)
    }
    
    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Req() req: any){
        return {data: req.tokenPayload, user:req.user}
    }

}
