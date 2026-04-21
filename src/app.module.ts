import { Module } from '@nestjs/common';
import { CanDataSourceModule } from './core/datasource/datasource.module';
import { CoreModule } from './core/core.module';
import { ApisModules } from './apis/apis.module';

@Module({
  imports: [
    CanDataSourceModule,
    CoreModule,
    ApisModules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
