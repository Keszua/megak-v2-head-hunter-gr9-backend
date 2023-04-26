import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

import { Hr } from './entities/hr.entity';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hr])],
  controllers: [HrController],
  providers: [HrService, UsersService],
})
export class HrModule {}
