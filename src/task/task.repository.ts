import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

  async create(createTaskDto: CreateTaskDto) {
    const { title, description, status, userId } = createTaskDto;
    return this.taskModel.create({ title, description, status, userId });
  }

  async findAll(userId: string) {
    return this.taskModel.findAll({
      where: { userId },
    });
  }

  async findOne(id: string, userId: string) {
    return this.taskModel.findOne({
      where: { id, userId },
    });
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.update(updateTaskDto, { where: { id, userId } });
  }

  async remove(id: string, userId: string) {
    return this.taskModel.destroy({ where: { id, userId } });
  }
}
