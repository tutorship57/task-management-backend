import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('should be defined', () => {
      expect(taskService).toBeDefined();
      expect(taskRepository).toBeDefined();
    });
  });

  describe('get all tasks', () => {
    it('should return an array of tasks if there are tasks', async () => {
      const userId = 'userId';
      const returnTasks = [
        {
          id: 'uuidV4',
          title: 'title',
          description: 'description',
          status: 'status',
          userId: 'userId',
        },
      ];
      taskRepository.findAll = jest.fn().mockReturnValue(returnTasks);
      const tasks = await taskService.findAll(userId);
      expect(tasks).toBeInstanceOf(Array);
    });
    it('should return UnauthorizedException if userId is not provided', async () => {
      const userId = '';
      await expect(taskService.findAll(userId)).rejects.toThrow(
        UnauthorizedException,
      );
    });
    it('should return an empty array if there are no tasks added', async () => {
      const userId = 'userId';
      taskRepository.findAll = jest.fn().mockReturnValue([]);
      const tasks = await taskService.findAll(userId);
      expect(tasks).toEqual([]);
    });
  });

  describe('get task by Id', () => {
    it('it should throw an NotFoundException if task is not found', async () => {
      const id = 'uuidV4Task';
      const userId = 'userIdNotfound123';

      taskRepository.findOne = jest.fn().mockReturnValue(null);
      await expect(taskService.findOne(id, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
    it('it should return a task if task id and userId is Matched Exist Task', async () => {
      const id = 'uuidV4';
      const sameUserId = 'userId123';
      const returnTask = {
        id: 'uuidV4',
        title: 'title',
        description: 'description',
        status: 'status',
        userId: 'userId123',
      };
      taskRepository.findOne = jest.fn().mockReturnValue(returnTask);
      const task = await taskService.findOne(id, sameUserId);
      expect(task).toEqual(returnTask);
    });
  });

  describe('create task', () => {
    it('it should throw BadRequestException if userId dont Matched userId in createTaskDto', async () => {
      const createTaskDto = {
        title: 'title',
        description: 'description',
        status: 'status',
        userId: 'userId',
      } as Task;
      const spyCreateTask = jest
        .spyOn(taskRepository, 'create')
        .mockResolvedValue(createTaskDto);
      const userId = 'userDontMactch123';
      await expect(taskService.create(createTaskDto, userId)).rejects.toThrow(
        BadRequestException,
      );
      expect(spyCreateTask).not.toHaveBeenCalledWith(createTaskDto);
    });

    it('it should create a task if userId is Matched userId in createTaskDto', async () => {
      const createTaskDto = {
        title: 'title',
        description: 'description',
        status: 'status',
        userId: 'userId',
      } as CreateTaskDto;
      const matchedUserId = 'userId';
      const returnCreateTask = {
        id: 'id',
        title: 'title',
        description: 'description',
        status: 'status',
        userId: 'userId',
      } as Task;

      const spyCreateTask = jest
        .spyOn(taskRepository, 'create')
        .mockResolvedValue(returnCreateTask);

      const task = await taskService.create(createTaskDto, matchedUserId);

      expect(task).toEqual(returnCreateTask);
      expect(spyCreateTask).toHaveBeenCalledWith(createTaskDto);
    });
  });
  describe('update task', () => {
    it('it should throw an NotFoundException if task is not found', async () => {
      const id = 'uuidV4';
      taskRepository.findOne = jest.fn().mockReturnValue(null);
      const updateTaskDto = {
        title: 'title',
        description: 'description',
        status: 'in_progress',
      };
      const userId = 'userId123';
      const spyTaskRepository = jest
        .spyOn(taskRepository, 'update')
        .mockResolvedValue([1]);

      await expect(
        taskService.update(id, userId, updateTaskDto),
      ).rejects.toThrow(NotFoundException);
      expect(spyTaskRepository).not.toHaveBeenCalledWith(id, updateTaskDto);
    });

    it('it should update a task', async () => {
      const id = 'uuidV4';
      const returnTask = {
        id: 'uuidV4',
        title: 'title',
        description: 'description',
        status: 'status',
        userId: 'userId',
      };
      const updateTaskDto = {
        title: 'title',
        description: 'description',
        status: 'in_progress',
      };
      const newUpdateDto = {
        ...returnTask,
        ...updateTaskDto,
      };
      const newUpdatedTaskfound = {
        id: 'uuidV4',
        title: 'title',
        description: 'description',
        status: 'in_progress',
        userId: 'userId',
        createdAt: '22-33-44',
        updatedAt: '22-33-44',
      } as Task;
      taskRepository.findOne = jest
        .fn()
        .mockReturnValueOnce(returnTask)
        .mockReturnValueOnce(newUpdatedTaskfound);

      const matchedUserId = 'userId123';
      const spyTaskRepository = jest
        .spyOn(taskRepository, 'update')
        .mockResolvedValue([1]);

      const task = await taskService.update(id, matchedUserId, updateTaskDto);

      expect(spyTaskRepository).toHaveBeenCalledWith(
        id,
        matchedUserId,
        newUpdateDto,
      );
      expect(task).toEqual(newUpdatedTaskfound);
    });
  });

  describe('remove task', () => {
    it('it should return NotFoundException if task is not found', async () => {
      const id = 'uuidV4';
      const notMatchedUserId = 'userId123';
      const spyRemoveTask = jest
        .spyOn(taskRepository, 'remove')
        .mockResolvedValue(1);
      const spyFindOneTask = jest
        .spyOn(taskRepository, 'findOne')
        .mockResolvedValue(null);

      await expect(taskService.remove(id, notMatchedUserId)).rejects.toThrow(
        NotFoundException,
      );
      expect(spyFindOneTask).toHaveBeenCalledWith(id, notMatchedUserId);
      expect(spyRemoveTask).not.toHaveBeenCalledWith(id, notMatchedUserId);
    });

    it('it should remove a task', async () => {
      const id = 'uuidV4';
      const matchedUserId = 'userId123';
      const returnTask = {
        id: 'uuidV4',
        title: 'title',
        description: 'description',
        status: 'status',
        userId: 'userId123',
      };
      taskRepository.findOne = jest.fn().mockReturnValue(returnTask);
      const spyTaskRepository = jest
        .spyOn(taskRepository, 'remove')
        .mockResolvedValue(1);
      const task = await taskService.remove(id, matchedUserId);
      expect(task).toEqual(1);
      expect(spyTaskRepository).toHaveBeenCalledWith(id, matchedUserId);
    });
  });
});
