import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { ModelModule } from './model/model.module';

@Module({
  imports: [ProjectModule, ModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
