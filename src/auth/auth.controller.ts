import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register.dto';
import { Post, Body } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiConflictResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login to the app' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @ApiOperation({ summary: 'register to the app' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiCreatedResponse({ type: RegisterResponseDto })
  @Post('register')
  register(@Body() createUserDto: RegisterDto): Promise<RegisterResponseDto> {
    return this.authService.register(createUserDto);
  }
}
