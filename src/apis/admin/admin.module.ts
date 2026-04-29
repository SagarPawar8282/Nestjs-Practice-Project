import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepositoryProvider } from './admin.repository';

@Module({
  controllers: [AdminController],
  providers: [AdminService,AdminRepositoryProvider],
  exports:[AdminService]
})
export class AdminModule {}
