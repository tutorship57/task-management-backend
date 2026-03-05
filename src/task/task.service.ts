import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async create(createTaskDto: CreateTaskDto, userIdRequest: string) {
    if (userIdRequest !== createTaskDto.userId) {
      throw new BadRequestException();
    }
    const { title, description, status, userId } = createTaskDto;
    return this.taskRepository.create({ title, description, status, userId });
  }

  async findAll(userId: string) {
    console.log('this is user id', userId);
    if (!userId) {
      throw new UnauthorizedException();
    }
    return await this.taskRepository.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    const task = await this.taskRepository.findOne(id, userId);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    const oldTask = await this.taskRepository.findOne(id, userId);
    if (!oldTask) {
      throw new NotFoundException();
    }
    const { title, description, status } = updateTaskDto;
    const newTask = {
      id: oldTask.id,
      title,
      description,
      status,
      userId: oldTask.userId,
    };
    await this.taskRepository.update(id, userId, newTask);
    return this.taskRepository.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    const task = await this.taskRepository.findOne(id, userId);
    if (!task) {
      throw new NotFoundException();
    }
    return await this.taskRepository.remove(id, userId);
  }
}
