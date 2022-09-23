import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseInterceptors,
  UseGuards,
  Req,
  Body,
  UnauthorizedException, HttpCode, Param,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import {JwtAuthGuard} from './jwt-authguard';
import RequestWithUser from './requestWithUser.interface';
import { TwoFactorAuthenticationCodeDto } from './dto/TwoFactorAuthenticationCodeDto';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { AuthService } from './auth.service';
import User from '../users/user.entity';

 
@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthService
  ) {}
  
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
  async register(@Res() response: Response, @Req() request: Request) {
    let userId = response.req.query.user['userId'];
    let user = await this.usersService.getUserById(userId);
    const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(user);
 
    return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
  }

   
  @Post('authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate(
    @Req() request: RequestWithUser,
    @Res() response: Response
  ) {
      let twoFactorAuthenticationCode = response.req.query.twoFactorAuthenticationCode;
      twoFactorAuthenticationCode = twoFactorAuthenticationCode.toString();
      let user = await this.usersService.getUserById(request.user['userId']);
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode , user
        );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
 
      const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id, true);
 
      return JSON.stringify({
			  id: "",
			  username: user.username,
			  nickname: user.nickname,
			  registred: user.registred,
			  avatar_url: user.avatar_url,
			  status: "online",
			  JWT_token: accessTokenCookie,	
		  });
   }
}