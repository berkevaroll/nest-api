import { Test, TestingModule } from '@nestjs/testing';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { Repository } from '../repository/repository.service';
import { ModelRepository } from '../repository/repository.model';
import { ProjectRepository } from '../repository/repository.project';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ModelDto } from './classes/model';

describe('ModelController', () => {
  let modelController: ModelController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ModelController],
      providers: [ModelService, Repository, ModelRepository, ProjectRepository],
    }).compile();

    modelController = app.get<ModelController>(ModelController);
  });

  describe('root', () => {
    it('should return array of models', () => {
      const models = modelController.listModels();
      expect(Array.isArray(models)).toBe(true);
    });

    it('should return the model with specified ID', () => {
      const testId = 2;
      const model = modelController.getModel(testId);
      expect(model).toBeDefined();
      expect(model.Id).toBe(testId);
    });

    it('get model - should throw not found error for the specified ID', () => {
      const testId = 9;
      try {
        modelController.getModel(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should add and return the given model', () => {
      const testObj: ModelDto = {
        Name: 'Test',
        Description: 'Newly added',
        ProjectId: 2,
      };
      const count = modelController.listModels().length;
      const result = modelController.addModel(testObj);
      const newCount = modelController.listModels().length;

      expect(result).toBeDefined();
      expect(result.Name).toBe(testObj.Name);
      expect(result.Description).toBe(testObj.Description);
      expect(newCount).toBeGreaterThan(count);
    });

    it('add model - should throw not found error for the specified ID', () => {
      const testObj: ModelDto = {
        Name: 'Test',
        Description: 'Newly added',
        ProjectId: 4,
      };
      try {
        modelController.addModel(testObj);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('should update and return the model with the given ID', () => {
      const testObj: ModelDto = {
        Name: 'TestUpdated',
        Description: 'Updated',
        ProjectId: 1,
      };
      const testId = 1;
      const result = modelController.updateModel(testId, testObj);
      expect(result).toBeDefined();
      expect(result.Id).toBe(testId);
      expect(result.Name).toBe(testObj.Name);
      expect(result.ProjectId).toBe(testObj.ProjectId);
      expect(result.Description).toBe(testObj.Description);
    });

    it('update model - should throw not found error for the specified model ID', () => {
      const testObj: ModelDto = {
        Name: 'TestUpdated',
        Description: 'Updated',
        ProjectId: 2,
      };
      const testId = 1;
      try {
        modelController.updateModel(testId, testObj);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('update model - should throw not found error for the specified project ID', () => {
      const testObj: ModelDto = {
        Name: 'TestUpdated',
        Description: 'Updated',
        ProjectId: 4,
      };
      const testId = 1;
      try {
        modelController.updateModel(testId, testObj);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('should delete the model with the specified ID', () => {
      const testId = 1;
      const count = modelController.listModels().length;
      modelController.removeModel(testId);
      const newList = modelController.listModels();
      expect(newList.length).toBeLessThan(count);
      expect(newList.every((f) => f.Id !== testId)).toBe(true);
    });

    it('remove model - should throw not found error for the specified ID', () => {
      const testId = 1;
      try {
        modelController.removeModel(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
