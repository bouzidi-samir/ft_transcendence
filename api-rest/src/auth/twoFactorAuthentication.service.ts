import { Injectable } from '@nestjs/common';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
 
@Injectable()
export class TwoFactorAuthenticationService {

 
  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}