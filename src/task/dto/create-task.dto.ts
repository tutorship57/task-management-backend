import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';
export class CreateTaskDto {
  @ApiProperty({ description: 'fill title', example: 'School Exam' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'fill description', example: 'Math Assignment' })
  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @ApiProperty({ description: 'fill status', example: 'pending' })
  @IsEnum(['pending', 'in_progress', 'completed'])
  status: string;

  @ApiProperty({
    description: 'owner userId',
    example: '14a5b0c7-c166-4fc9-84ed-5ae53df793af',
  })
  @IsUUID(4, { message: 'Invalid UUID format' })
  userId: string;
}
