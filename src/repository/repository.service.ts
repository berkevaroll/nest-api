import { Injectable } from '@nestjs/common';
import { Global, GlobalTest } from '../classes/generic';
import { Model } from 'src/model/classes/model';
import { Project } from 'src/project/classes/project';

const env = process.env.NODE_ENV;
@Injectable()
// Base Repository class to mimic db queries and operations
// Only data in/out. No logics are run
export class Repository {
  // Choose data source depending on env
  private getGlobal() {
    return env === 'test' ? GlobalTest : Global;
  }
  // Get all projects
  protected getGlobalProjects(): Project[] {
    return this.getGlobal().projects;
  }
  // Get latest project Id generated
  protected getLatestProjectId(): number {
    return this.getGlobal().latestProjectId;
  }
  // Push a new object and increment id (Mimic auto increment of db)
  protected insertProject(project: Project): void {
    this.getGlobal().projects.push(project);
    this.getGlobal().latestProjectId = project.Id;
  }
  // Update project with the specified Id
  protected updateProjectById(project: Project): void {
    const index = this.getGlobal().projects.findIndex(
      (f) => f.Id === project.Id,
    );
    // Shallow copy the object into index
    this.getGlobal().projects[index] = { ...project };
  }
  // Soft delete project with the specified id
  protected deleteProject(id: number): void {
    const project = this.getGlobal().projects.find((f) => f.Id === id);
    const index = this.getGlobal().projects.findIndex(
      (f) => f.Id === project.Id,
    );
    // Soft delete by setting Deleted field
    this.getGlobal().projects[index] = { ...project, Deleted: new Date() };
  }
  // Get all models
  protected getGlobalModels(): Model[] {
    return this.getGlobal().models;
  }
  // Get latest model Id generated
  protected getLatestModelId(): number {
    return this.getGlobal().latestModelId;
  }
  // Push a new object and increment id (Mimic auto increment of db)
  protected insertModel(model: Model): void {
    this.getGlobal().models.push(model);
    this.getGlobal().latestModelId = model.Id;
  }
  // Update model with the specified Id
  protected updateModelById(model: Model): void {
    const index = this.getGlobal().models.findIndex((f) => f.Id === model.Id);
    // Shallow copy the object into index
    this.getGlobal().models[index] = { ...model };
  }
  // Soft delete project with the specified id

  protected deleteModel(id: number): void {
    const model = this.getGlobal().models.find((f) => f.Id === id);
    const index = this.getGlobal().models.findIndex((f) => f.Id === model.Id);
    // Soft delete by setting Deleted field

    this.getGlobal().models[index] = { ...model, Deleted: new Date() };
  }
}
