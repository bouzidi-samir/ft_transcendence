import { Injectable} from '@nestjs/common';
import { authenticator } from 'otplib';
import User from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { toFileStream } from 'qrcode';
import e, { Response } from 'express';

@Injectable()
export class TwoFactorAuthenticationService { // genere le secret et l url pour google authenticator
  constructor (
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}
 
  public async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
 
    const otpauthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
 
    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
 
    return {
      secret,
      otpauthUrl
    }
  }

  public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) { // compare pour voir si le code est bon
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret
    })
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) { //genere le qr code
    return toFileStream(stream, otpauthUrl);
  }

  public async switchTFA(userId: number): Promise<any> {
    const user = await this.usersService.getUserById(userId);
    if (user.isTwoFactorAuthenticationEnabled == true)
    {
		  return this.usersService.userRepository.update(userId,
			  {isTwoFactorAuthenticationEnabled : false}
		  );
    }
    else
    {
      return this.usersService.userRepository.update(userId,
			  {isTwoFactorAuthenticationEnabled : true}
		  );
    }
	}
}