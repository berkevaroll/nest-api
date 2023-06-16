import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export interface Model {
  Id: number;
  Name: string;
  Description: string;
  ProjectId: number;
  Created: Date;
  Deleted?: Date;
}
export class ModelDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  Description: string;

  @IsNumber()
  ProjectId: number;
}
export class GetIdParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}
export interface ModelResponse {
  Id: number;
  Name: string;
  Description: string;
  ProjectId: number;
  Created: Date;
}
