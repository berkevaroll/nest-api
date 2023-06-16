import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './classes/project';
import { genericErrorHandler } from '../utils/errorHandler';
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/list')
  listProjects() {
    return this.projectService.getProjects();
  }

  @Get('/:id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.projectService.getProject(id);
    } catch (e) {
      genericErrorHandler(e);
    }
  }

  @Get('/:id/models')
  getModels(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.projectService.getModels(id);
    } catch (e) {
      genericErrorHandler(e);
    }
  }

  @Post('/')
  addProject(@Body() body: ProjectDto) {
    return this.projectService.addProject(body);
  }

  @Put('/:id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProjectDto,
  ) {
    try {
      return this.projectService.updateProject(body, id);
    } catch (e) {
      genericErrorHandler(e);
    }
  }

  @Delete('/:id')
  removeProject(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.projectService.removeProject(id);
    } catch (e) {
      genericErrorHandler(e);
    }
  }
}
