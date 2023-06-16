import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from '../repository/repository.project';
import { ModelRepository } from '../repository/repository.model';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, ModelRepository],
})
export class ProjectModule {}
