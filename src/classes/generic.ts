import { Model } from '../model/classes/model';
import { Project } from '../project/classes/project';

// Global object on memory to use as data source during run
export class Global {
  static projects: Project[] = [];
  static models: Model[] = [];
  static latestProjectId = 0;
  static latestModelId = 0;
}

// Global object on memory to use as data source during test runs

export class GlobalTest {
  static projects: Project[] = [
    {
      Id: 1,
      Name: 'TestData',
      Description: 'Desc',
      Created: new Date(),
      Deleted: undefined,
    },
    {
      Id: 2,
      Name: 'TestData2',
      Description: 'Desc',
      Created: new Date(),
      Deleted: undefined,
    },
    {
      Id: 5,
      Name: 'TestData3',
      Description: 'Desca',
      Created: new Date(),
      Deleted: undefined,
    },
  ];
  static models: Model[] = [
    {
      Id: 1,
      Name: 'TestData',
      Description: 'Desc',
      Created: new Date(),
      Deleted: undefined,
      ProjectId: 2,
    },
    {
      Id: 2,
      Name: 'TestData2',
      Description: 'Desc',
      Created: new Date(),
      Deleted: undefined,
      ProjectId: 2,
    },
  ];
  static latestProjectId = 5;
  static latestModelId = 2;
}
