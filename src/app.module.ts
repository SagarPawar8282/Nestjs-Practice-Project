import { Module } from '@nestjs/common';
import { CanDataSourceModule } from './core/datasource/datasource.module';
import { CoreModule } from './core/core.module';
@Module({
  imports: [
    CanDataSourceModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
