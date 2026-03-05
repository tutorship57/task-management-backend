import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'fill title', example: 'Updated Exam' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'fill description',
    example: 'Updated Exam Description',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'fill status',
    example: 'pending',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status?: string;
}
