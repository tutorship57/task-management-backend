import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterResponseDto {
  @ApiProperty({ example: 'uuidV4' })
  id: string;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;
}
