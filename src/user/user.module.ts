import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { SecurityModule } from 'src/common/security/security.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), SecurityModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
