import {
    ClassSerializerInterceptor,
    Controller,
    Header,
    Post,
    UseInterceptors,
    Res,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
  import { Response } from 'express';
  /*import Jwt
  import RequestWithUser from '../requestWithUser.interface';
   
  @Controller('2fa')
  @UseInterceptors(ClassSerializerInterceptor)
  export class TwoFactorAuthenticationController {
    constructor(
      private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    ) {}
   
    @Post('generate')
    @UseGuards(JwtAuthenticationGuard)
    async register(@Res() response: Response, @Req() request: RequestWithUser) {
      const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);
   
      return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }
  }*/