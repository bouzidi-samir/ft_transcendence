import {
    ClassSerializerInterceptor,
    Controller,
    Post,
    Res,
    UseInterceptors,
    UseGuards,
    Req,
    Body,
    UnauthorizedException, HttpCode, Param, Request
  } from '@nestjs/common';
  import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
  import {JwtAuthGuard} from './jwt-authguards';
  import RequestWithUser from './requestWithUser.interface';
  import { TwoFactorAuthenticationCodeDto } from './dto/TwoFactorAuthenticationCodeDto';
  import { UsersService } from '../users/users.service';
  import { Response } from 'express';
  import { AuthService } from './auth.service';
  import User from '../users/entities/user.entity';
import { access } from 'fs';
  
   
  @Controller('2fa')
  @UseInterceptors(ClassSerializerInterceptor)
  export class TwoFactorAuthenticationController {
    constructor(
      private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
      private readonly usersService: UsersService,
      private readonly authenticationService: AuthService
    ) {}
    

    @Post('switch')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async switchTFA (@Body() body : any)
    {
      let user = await this.usersService.getUserById(parseInt(body.userId));

      await this.twoFactorAuthenticationService.switchTFA(parseInt(body.userId));
    }

    @Post('turn-on')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async turnOnTwoFactorAuthentication(
      @Req() request: RequestWithUser,
      @Res() response: Response,
    ) {
      let twoFactorAuthenticationCode = response.req.query.twoFactorAuthenticationCode;
      twoFactorAuthenticationCode = twoFactorAuthenticationCode.toString();
      let user = await this.usersService.getUserById(request.user['userId']);
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      await this.usersService.turnOnTwoFactorAuthentication(user.id);
    }
  
    @Post('generate') /* {userId : 19, email : qbrillai@student.42nice.fr, avatar_url : https://cdn.intra.42.fr/users/qbrillai.jpg, 
    registred: false, nickname: offline, username: qbrillai}  */
    @UseGuards(JwtAuthGuard)
    async register(@Res() response: Response, @Body() body: any) {
      let userId = body.userId;
      let user = await this.usersService.getUserById(userId);
      const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(user);
      response.setHeader('content-type', 'image/png');
      return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }
  
     
    @Post('authenticate')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async authenticate(
      @Body() body : any
    ) : Promise<string>{
 
        let twoFactorAuthenticationCode = body.code;
        twoFactorAuthenticationCode = twoFactorAuthenticationCode.toString();
        let user = await this.usersService.getUserById(body.userId);
        const isCodeValid = await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
          twoFactorAuthenticationCode , user
        );
        if (!isCodeValid) {
          return JSON.stringify({
            codeValidity : false,
          });
        }
   
        const accessTokenCookie = await this.authenticationService.getCookieWithJwtAccessToken(user.id, true);
        return JSON.stringify({
                JWT_token: accessTokenCookie.access_token,	
                codeValidity : true,
            });
     }
  }