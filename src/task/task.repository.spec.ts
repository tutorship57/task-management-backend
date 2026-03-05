import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { getModelToken } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
describe('TaskRepository', () => {
  let taskRepository: TaskRepository;
  const mockTaskModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskRepository,
        {
          provide: getModelToken(Task),
          useValue: mockTaskModel,
        },
      ],
    }).compile();
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('init', () => {
    it('should be defined', () => {
      expect(taskRepository).toBeDefined();
    });
  });
});
