import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from 'src/common/security/security.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let securityService: SecurityService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockReturnValue('mock_token'),
          },
        },
        {
          provide: SecurityService,
          useValue: {
            verifyPassword: jest.fn(),
            hashPassword: jest.fn(),
          },
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    securityService = module.get<SecurityService>(SecurityService);
    jwtService = module.get<JwtService>(JwtService);
    jest.clearAllMocks();
  });
  describe('init', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
      expect(securityService).toBeDefined();
      expect(jwtService).toBeDefined();
    });
  });

  describe('login', () => {
    it('should throw NotFoundException when user is not found', async () => {
      const loginDto = { email: 'test@gmail.com', password: 'password' };
      const spyFindByEmail = jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue(null);
      const spyVerifyPassword = jest
        .spyOn(securityService, 'verifyPassword')
        .mockResolvedValue(true);
      const spySecurityHash = jest.spyOn(securityService, 'hashPassword');
      await expect(
        authService.login(loginDto.email, loginDto.password),
      ).rejects.toThrow(UnauthorizedException);

      expect(spyFindByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(spyVerifyPassword).not.toHaveBeenCalled();
      expect(spySecurityHash).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      const mockUser = {
        email: 'test@gmail.com',
        password: 'password',
        id: 'uuidV4',
      } as User;
      const loginDto = { email: 'test@gmail.com', password: 'wrong_password' };
      const spyFindByEmail = jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue(mockUser);
      securityService.verifyPassword = jest.fn().mockResolvedValue(false);
      jwtService.sign = jest.fn().mockReturnValue('mock_token');
      await expect(
        authService.login(loginDto.email, loginDto.password),
      ).rejects.toThrow(UnauthorizedException);

      expect(spyFindByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should return an access token when login is successful', async () => {
      const mockUser = {
        id: 'uuidV4',
        email: 'test@gmail.com',
      } as User;
      const loginDto = { email: 'test', password: 'password' };
      const spyFindByEmail = jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue(mockUser);
      const spyVerifyPassword = jest
        .spyOn(securityService, 'verifyPassword')
        .mockResolvedValue(true);
      jwtService.signAsync = jest.fn().mockReturnValue('mock_token');

      const result = await authService.login(loginDto.email, loginDto.password);

      expect(spyFindByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(spyVerifyPassword).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password,
      );
      expect(result).toEqual({ access_token: 'mock_token' });
    });
  });

  describe('register', () => {
    it('should throw ConflictException when email already exists ', async () => {
      const registerDto = {
        email: 'test@gmail.com',
        password: 'password',
      };
      userService.findByEmail = jest.fn().mockResolvedValue({
        id: 'uuidV4',
        email: 'test@gmail.com',
        password: 'password',
      });
      await expect(authService.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
    it('should return user when register is successful', async () => {
      const registerDto = {
        email: 'test@gmail.com',
        password: 'password',
      };
      const newPassword = 'new_password';
      const newRegisterData = {
        email: 'test@gmail.com',
        password: newPassword,
      };
      const registerResult = {
        id: 'uuidV4',
        email: 'test@gmail.com',
      } as User;

      const spyFindByEmail = jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue(null);
      const spyHashPassword = jest
        .spyOn(securityService, 'hashPassword')
        .mockResolvedValue(newPassword);
      const spyUserCreate = jest
        .spyOn(userService, 'create')
        .mockResolvedValue(registerResult);

      const result = await authService.register(registerDto);

      expect(result).toEqual(registerResult);
      expect(spyFindByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(spyHashPassword).toHaveBeenCalledWith(registerDto.password);
      expect(spyUserCreate).toHaveBeenCalledWith(newRegisterData);
    });
  });
});
