import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelResponse } from '../model/classes/model';
import { ProjectResponse, ProjectDto } from './classes/project';
import { ProjectRepository } from '../repository/repository.project';
import { ModelRepository } from '../repository/repository.model';

@Injectable()
export class ProjectService {
  constructor(
    private readonly repository: ProjectRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  getProjects(): ProjectResponse[] {
    // Get all available projects
    const projects = this.repository.getProjects();
    // Map projects into response objects and sort by created date

    return projects
      .map((m) => ({
        Id: m.Id,
        Name: m.Name,
        Description: m.Description,
        Created: m.Created,
      }))
      .sort((a, b) => a.Created.getTime() - b.Created.getTime());
  }
  getProject(id: number): ProjectResponse {
    // Check if exists
    const project = this.repository.getProject(id);
    if (!project) {
      throw new NotFoundException(`Project not found with Id: ${id}`);
    }
    return {
      Id: project.Id,
      Name: project.Name,
      Description: project.Description,
      Created: project.Created,
    };
  }
  addProject(project: ProjectDto): ProjectResponse {
    // Add new project and return created object with all fields
    const res = this.repository.addProject(project);
    // Map result to response model
    return {
      Id: res.Id,
      Name: res.Name,
      Description: res.Description,
      Created: res.Created,
    };
  }
  updateProject(newProject: ProjectDto, id: number): ProjectResponse {
    // Check if exists
    const project = this.repository.getProject(id);
    if (!project) {
      throw new NotFoundException(`Project not found with Id: ${id}`);
    }
    // Update proejct and return updated object
    const res = this.repository.updateProject(
      project,
      newProject.Name,
      newProject.Description,
    );
    // Map result to response model
    return {
      Id: res.Id,
      Name: res.Name,
      Description: res.Description,
      Created: res.Created,
    };
  }
  removeProject(id: number): void {
    // Check if exists
    const project = this.repository.getProject(id);
    if (!project) {
      throw new NotFoundException(`Project not found with Id: ${id}`);
    }
    // Get all assigned models and remove them
    const models = this.getModels(id);
    models.forEach((f) => {
      this.modelRepository.removeModel(f.Id);
    });
    // Remove the project
    this.repository.removeProject(id);
  }

  getModels(id: number): ModelResponse[] {
    // Check if exists
    const project = this.repository.getProject(id);
    if (!project) {
      throw new NotFoundException(`Project not found with Id: ${id}`);
    }
    // Get all available project models
    const models = this.repository.getProjectModels(id);
    // Map models to response models
    return models.map((m) => ({
      Id: m.Id,
      Name: m.Name,
      Description: m.Description,
      ProjectId: m.ProjectId,
      Created: m.Created,
    }));
  }
}
