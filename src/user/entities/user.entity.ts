import { Column, Model, DataType, Table, HasMany } from 'sequelize-typescript';
import { Task } from 'src/task/entities/task.entity';
@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
