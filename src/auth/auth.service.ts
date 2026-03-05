import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '../common/security/security.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private securityService: SecurityService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.securityService.verifyPassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token: access_token };
  }

  async register(createUserDto: RegisterDto) {
    const { email } = createUserDto;
    const existEmail = await this.userService.findByEmail(email);

    if (existEmail) {
      throw new ConflictException();
    }

    const hashedPassword = await this.securityService.hashPassword(
      createUserDto.password,
    );

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      id: newUser.id,
      email: newUser.email,
    };
  }
}
