import { Injectable } from '@nestjs/common';
import { Repository } from './repository.service';
import { Model, ModelDto } from 'src/model/classes/model';

@Injectable()
// Access layer to models in db
export class ModelRepository extends Repository {
  // Gets all available (not deleted) models
  getModels(): Model[] {
    const models = this.getGlobalModels();
    return models.filter((f) => !f.Deleted);
  }
  // Finds the available model with specified Id
  getModel(id: number): Model | undefined {
    const models = this.getGlobalModels();
    return models.find((f) => !f.Deleted && f.Id === id);
  }
  // Adds {dto} to db and returns it from db
  addModel(dto: ModelDto): Model {
    const newId = this.getLatestModelId() + 1;
    const newModel: Model = {
      Id: newId,
      Name: dto.Name,
      Description: dto.Description,
      ProjectId: dto.ProjectId,
      Created: new Date(),
      Deleted: undefined,
    };
    this.insertModel(newModel);
    return this.getModel(newId);
  }
  // Updates the specified model and returns it from db
  updateModel(
    dto: Model,
    name: string,
    desc: string,
    projectId: number,
  ): Model {
    const updatedModel: Model = {
      ...dto,
      Name: name,
      Description: desc,
      ProjectId: projectId,
    };
    this.updateModelById(updatedModel);
    return this.getModel(dto.Id);
  }
  // Makes model unavailable (Soft Deleted)
  removeModel(id: number) {
    this.deleteModel(id);
  }
}
