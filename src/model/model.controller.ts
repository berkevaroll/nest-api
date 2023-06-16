import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDto } from './classes/model';
import { genericErrorHandler } from '../utils/errorHandler';
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('/list')
  listModels() {
    return this.modelService.listModels();
  }

  @Get('/:id')
  getModel(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.modelService.getModel(id);
    } catch (e) {
      genericErrorHandler(e);
    }
  }

  @Post('/')
  addModel(@Body() body: ModelDto) {
    return this.modelService.addModel(body);
  }

  @Put('/:id')
  updateModel(@Param('id', ParseIntPipe) id: number, @Body() body: ModelDto) {
    try {
      return this.modelService.updateModel(body, id);
    } catch (e) {
      genericErrorHandler(e);
    }
  }

  @Delete('/:id')
  removeModel(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.modelService.removeModel(id);
    } catch (e) {
      genericErrorHandler(e);
    }
  }
}
