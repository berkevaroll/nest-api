import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export interface Project {
  Id: number;
  Name: string;
  Description: string;
  Created: Date;
  Deleted?: Date;
}
export class ProjectDto {
  @IsString()
  @IsNotEmpty()
  Name: string;
  @IsString()
  @IsNotEmpty()
  Description: string;
}
export class GetIdParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}
export interface ProjectResponse {
  Id: number;
  Name: string;
  Description: string;
  Created: Date;
}
