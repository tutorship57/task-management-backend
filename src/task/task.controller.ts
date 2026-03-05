import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  CreateTaskResponseDto,
  getTasksResponseDto,
  getTaskResponseDto,
  updateTaskResponseDto,
} from './dto/response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './../auth/auth.guard';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { HttpCode, HttpStatus } from '@nestjs/common';
import type { Request } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({
    description: 'Task created',
    type: CreateTaskResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const userId: string = req?.user?.sub || '';
    return this.taskService.create(createTaskDto, userId);
  }

  @ApiOkResponse({
    type: [getTasksResponseDto],
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: Request) {
    if (req.user?.sub === undefined) {
      throw new UnauthorizedException();
    }
    const userId: string = req.user.sub;
    return this.taskService.findAll(userId);
  }

  @ApiOkResponse({
    type: getTaskResponseDto,
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get details of a specific task' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string, @Req() req: Request) {
    if (req.user?.sub === undefined) {
      throw new UnauthorizedException();
    }
    const userId: string = req?.user?.sub;
    return this.taskService.findOne(id, userId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: updateTaskResponseDto,
  })
  @ApiOperation({ summary: 'Update a task (title, description, status)' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    if (req.user?.sub === undefined) {
      throw new UnauthorizedException();
    }
    const userId: string = req?.user?.sub;
    return this.taskService.update(id, userId, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete a specific task' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Req() req: Request) {
    if (req.user?.sub === undefined) {
      throw new UnauthorizedException();
    }
    const userId: string = req?.user?.sub;
    await this.taskService.remove(id, userId);
  }
}
