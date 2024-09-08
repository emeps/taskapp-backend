import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly authService: AuthService,
      private readonly userService: UserService
    ){}
    canActivate(context: ExecutionContext) {

      const request = context.switchToHttp().getRequest()
      const {authorization} = request.headers
      try{
        const data =  this.authService.checkToken(authorization)
        request.tokenPayload = data;
        return true
      } catch(e){
        throw new UnauthorizedException(e)
      }      
    }
    
}