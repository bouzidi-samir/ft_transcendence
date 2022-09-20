import { ArrayMinSize, IsArray, isBoolean, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TokenPayload{
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsBoolean()
  isSecondFactorAuthenticated: boolean;
}