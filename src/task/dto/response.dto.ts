import { ApiProperty } from '@nestjs/swagger';

export class getTasksResponseDto {
  @ApiProperty({ example: '6fd9be36-2297-48c4-a00f-ff1a60180c9b' })
  id: string;

  @ApiProperty({ example: 'NNs Assignment' })
  title: string;

  @ApiProperty({ example: 'date 3-10 Mar' })
  description: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: '14a5b0c7-c166-4fc9-84ed-5ae53df793af' })
  userId: string;

  @ApiProperty({ example: '2026-03-05T14:39:28.000Z' })
  createAt: Date;

  @ApiProperty({ example: '2026-03-05T14:39:28.000Z' })
  updateAt: Date;
}

export class getTaskResponseDto {
  @ApiProperty({ example: '6fd9be36-2297-48c4-a00f-ff1a60180c9b' })
  id: string;

  @ApiProperty({ example: 'NNs Assignment' })
  title: string;

  @ApiProperty({ example: 'date 3-10 Mar' })
  description: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: '14a5b0c7-c166-4fc9-84ed-5ae53df793af' })
  userId: string;

  @ApiProperty({ example: '2026-03-05T14:39:28.000Z' })
  createAt: Date;

  @ApiProperty({ example: '2026-03-05T14:39:28.000Z' })
  updateAt: Date;
}

export class updateTaskResponseDto {
  @ApiProperty({ example: '6fd9be36-2297-48c4-a00f-ff1a60180c9b' })
  id: string;

  @ApiProperty({ example: 'Updated Exam' })
  title: string;

  @ApiProperty({ example: 'Updated Exam Description' })
  description: string;

  @ApiProperty({ example: 'fill status' })
  status: string;

  @ApiProperty({ example: '14a5b0c7-c166-4fc9-84ed-5ae53df793af' })
  userId: string;

  @ApiProperty({ example: '2026-03-05T14:39:28.000Z' })
  createAt: Date;

  @ApiProperty({ example: '2026-03-05T14:39:28.000Z' })
  updateAt: Date;
}

export class CreateTaskResponseDto {
  @ApiProperty({ example: '6fd9be36-2297-48c4-a00f-ff1a60180c9b' })
  id: string;

  @ApiProperty({ example: 'School Exam' })
  title: string;

  @ApiProperty({ example: 'Math Assignment' })
  description: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: '14a5b0c7-c166-4fc9-84ed-5ae53df793af' })
  userId: string;

  @ApiProperty({ example: '2026-03-05T14:39:28.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-03-05T14:39:28.000Z' })
  updatedAt: Date;
}
