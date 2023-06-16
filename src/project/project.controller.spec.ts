import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ModelRepository } from '../repository/repository.model';
import { ProjectRepository } from '../repository/repository.project';
import { NotFoundException } from '@nestjs/common';
import { ProjectDto } from './classes/project';

describe('ProjectController', () => {
  let projectController: ProjectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService, ModelRepository, ProjectRepository],
    }).compile();

    projectController = app.get<ProjectController>(ProjectController);
  });

  describe('root', () => {
    it('should return array of projects', () => {
      const projects = projectController.listProjects();
      expect(Array.isArray(projects)).toBe(true);
    });
    it('should return the project with specified ID', () => {
      const testId = 2;
      const project = projectController.getProject(testId);
      expect(project).toBeDefined();
      expect(project.Id).toBe(testId);
    });
    it('should throw not found error for the specified ID', () => {
      const testId = 9;
      try {
        projectController.getProject(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should return all models of the specified project ID', () => {
      const testId = 2;
      const models = projectController.getModels(testId);
      expect(models.length).toBeGreaterThan(0);
      expect(models.every((f) => f.ProjectId === testId)).toBe(true);
    });
    it('should return an empty list of models', () => {
      const testId = 1;
      const models = projectController.getModels(testId);
      expect(models.length).toEqual(0);
    });
    it('should throw not found error for the specified project ID', () => {
      const testId = 9;
      try {
        projectController.getModels(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should add and return the given project', () => {
      const testObj: ProjectDto = {
        Name: 'Test',
        Description: 'Newly added',
      };
      const count = projectController.listProjects().length;
      const result = projectController.addProject(testObj);
      const newCount = projectController.listProjects().length;

      expect(result).toBeDefined();
      expect(result.Name).toBe(testObj.Name);
      expect(result.Description).toBe(testObj.Description);
      expect(newCount).toBeGreaterThan(count);
    });
    it('should update and return the project with the given ID', () => {
      const testObj: ProjectDto = {
        Name: 'TestUpdated',
        Description: 'Updated',
      };
      const testId = 1;
      const result = projectController.updateProject(testId, testObj);
      expect(result).toBeDefined();
      expect(result.Id).toBe(testId);
      expect(result.Name).toBe(testObj.Name);
      expect(result.Description).toBe(testObj.Description);
    });
    it('should throw not found error for the specified project ID', () => {
      const testObj: ProjectDto = {
        Name: 'TestUpdated',
        Description: 'Updated',
      };
      const testId = 1;
      try {
        projectController.updateProject(testId, testObj);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should delete the project with the specified ID', () => {
      const testId = 1;
      const count = projectController.listProjects().length;
      projectController.removeProject(testId);
      const newList = projectController.listProjects();
      expect(newList.length).toBeLessThan(count);
      expect(newList.every((f) => f.Id !== testId)).toBe(true);
    });
    it('should throw not found error for the specified ID', () => {
      const testId = 1;
      try {
        projectController.removeProject(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
