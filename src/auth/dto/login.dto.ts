import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsInN1YiI6IjZiNDBkYzc5LTBlYTgtNDQ5MS05MGVkLTFmNzIwNDhhYzg1YiIsImlhdCI6MTc3MjcxNDcxNSwiZXhwIjoxNzcyODAxMTE1fQ.33IQi5TXl3g8f_AyfH0c6JdXoiMBEoNVwDbCPGuQBfo',
  })
  access_token: string;
}
