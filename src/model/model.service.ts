import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ModelResponse, ModelDto } from './classes/model';
import { ModelRepository } from '../repository/repository.model';
import { ProjectRepository } from '../repository/repository.project';

@Injectable()
export class ModelService {
  constructor(
    private readonly repository: ModelRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  listModels(): ModelResponse[] {
    // Get all available models
    const models = this.repository.getModels();

    // Map models into response objects and sort by created date
    return models
      .map((m) => ({
        Id: m.Id,
        Name: m.Name,
        Description: m.Description,
        ProjectId: m.ProjectId,
        Created: m.Created,
      }))
      .sort((a, b) => a.Created.getTime() - b.Created.getTime());
  }
  getModel(id: number): ModelResponse {
    // Check if exists
    const model = this.repository.getModel(id);
    if (!model) {
      throw new NotFoundException(`Model not found with Id: ${id}`);
    }
    return {
      Id: model.Id,
      Name: model.Name,
      Description: model.Description,
      ProjectId: model.ProjectId,
      Created: model.Created,
    };
  }
  addModel(model: ModelDto): ModelResponse {
    // Check if project exists to assigning the model
    const project = this.projectRepository.getProject(model.ProjectId);
    if (project === undefined) {
      throw new UnprocessableEntityException(
        `Project not found with Id: ${model.ProjectId}`,
      );
    }
    // Add new model and return created object with all fields
    const res = this.repository.addModel(model);
    return {
      Id: res.Id,
      Name: res.Name,
      Description: res.Description,
      ProjectId: res.ProjectId,
      Created: res.Created,
    };
  }
  updateModel(newModel: ModelDto, id: number): ModelResponse {
    // Check if exists
    const model = this.repository.getModel(id);
    if (!model) {
      throw new NotFoundException(`Model not found with Id: ${id}`);
    }
    // Check if project exists to assigning the model
    const project = this.projectRepository.getProject(newModel.ProjectId);
    if (!project) {
      throw new UnprocessableEntityException(
        `Project not found with Id: ${newModel.ProjectId}`,
      );
    }
    // Update model and return updated object
    const res = this.repository.updateModel(
      model,
      newModel.Name,
      newModel.Description,
      newModel.ProjectId,
    );
    // Map result to response model
    return {
      Id: res.Id,
      Name: res.Name,
      Description: res.Description,
      ProjectId: res.ProjectId,
      Created: res.Created,
    };
  }
  removeModel(id: number): void {
    // Check if exists
    const model = this.repository.getModel(id);
    if (!model) {
      throw new NotFoundException(`Model not found with Id: ${id}`);
    }
    this.repository.removeModel(id);
  }
}
