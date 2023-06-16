import { Module } from '@nestjs/common';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { ModelRepository } from '../repository/repository.model';
import { ProjectRepository } from '../repository/repository.project';

@Module({
  imports: [],
  controllers: [ModelController],
  providers: [ModelService, ModelRepository, ProjectRepository],
})
export class ModelModule {}
