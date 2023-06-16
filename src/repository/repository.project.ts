import { Injectable } from '@nestjs/common';
import { Repository } from './repository.service';
import { Model } from 'src/model/classes/model';
import { Project, ProjectDto } from 'src/project/classes/project';

@Injectable()
// Access layer to projects in db
export class ProjectRepository extends Repository {
  // Gets all available (not deleted) models
  getProjects(): Project[] {
    const projects = this.getGlobalProjects();
    return projects.filter((f) => !f.Deleted);
  }
  // Finds the available project with specified Id
  getProject(id: number): Project | undefined {
    const projects = this.getGlobalProjects();
    return projects.find((f) => !f.Deleted && f.Id === id);
  }
  // Adds {dto} to db and returns it from db
  addProject(dto: ProjectDto): Project {
    const newId = this.getLatestProjectId() + 1;
    const newProject: Project = {
      Id: newId,
      Name: dto.Name,
      Description: dto.Description,
      Created: new Date(),
      Deleted: undefined,
    };
    this.insertProject(newProject);
    return this.getProject(newId);
  }
  // Updates the specified project and returns it from db
  updateProject(dto: Project, name: string, desc: string): Project {
    const updatedProject: Project = {
      ...dto,
      Name: name,
      Description: desc,
    };
    this.updateProjectById(updatedProject);
    return this.getProject(dto.Id);
  }
  // Makes project unavailable (Soft Deleted)
  removeProject(id: number) {
    this.deleteProject(id);
  }
  // Gets all available (Not deleted) models of the project
  getProjectModels(id: number): Model[] {
    const models = this.getGlobalModels();
    return models.filter((f) => f.ProjectId === id && !f.Deleted);
  }
}
