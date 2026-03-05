import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { getModelToken } from '@nestjs/sequelize';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  const mockUserModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();
    userRepository = module.get<UserRepository>(UserRepository);
  });
  describe('init', () => {
    it('should be defined', () => {
      expect(userRepository).toBeDefined();
    });
  });
});
