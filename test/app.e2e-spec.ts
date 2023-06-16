import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProjectModule } from './../src/project/project.module';
import { ModelModule } from './../src/model/model.module';
import { ModelDto } from 'src/model/classes/model';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const notFoundError = (id: number, type: 'Project' | 'Model') => ({
    statusCode: 404,
    message: `${type} not found with Id: ${id}`,
    error: 'Not Found',
  });
  const unprocessableEntityError = (id: number) => ({
    statusCode: 422,
    message: `Project not found with Id: ${id}`,
    error: 'Unprocessable Entity',
  });
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProjectModule, ModelModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  // Project endpoints
  it('/project/list (GET)', () => {
    return request(app.getHttpServer()).get('/project/list').expect(200);
  });
  it('/project/:id (GET)', () => {
    return request(app.getHttpServer()).get('/project/1').expect(200);
  });
  it('/project/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/project/3')
      .expect(404)
      .expect(notFoundError(3, 'Project'));
  });
  it('/project/:id/models (GET)', () => {
    return request(app.getHttpServer()).get('/project/2').expect(200);
  });
  it('/project/:id/models (GET)', () => {
    return request(app.getHttpServer()).get('/project/1').expect(200);
  });
  it('/project/:id/models (GET)', () => {
    return request(app.getHttpServer())
      .get('/project/3')
      .expect(404)
      .expect(notFoundError(3, 'Project'));
  });
  it('/project (POST)', () => {
    const body = {
      Name: 'TestData3',
      Description: 'Newly added',
    };
    return request(app.getHttpServer()).post('/project').send(body).expect(201);
  });
  it('/project/:id (PUT)', () => {
    const body = {
      Name: 'TestData2 Updated',
      Description: 'Newly added',
    };
    return request(app.getHttpServer())
      .put('/project/2')
      .send(body)
      .expect(200);
  });
  it('/project/:id (PUT)', () => {
    const body = {
      Name: 'TestData3',
      Description: 'Newly added',
    };
    return request(app.getHttpServer())
      .put('/project/4')
      .send(body)
      .expect(404)
      .expect(notFoundError(4, 'Project'));
  });
  it('/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/project/1').expect(200);
  });
  it('/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/project/4')
      .expect(404)
      .expect(notFoundError(4, 'Project'));
  });

  // Model endpoints
  it('/model/list (GET)', () => {
    return request(app.getHttpServer()).get('/model/list').expect(200);
  });
  it('/model/:id (GET)', () => {
    return request(app.getHttpServer()).get('/model/1').expect(200);
  });
  it('/model/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/model/3')
      .expect(404)
      .expect(notFoundError(3, 'Model'));
  });
  it('/model (POST)', () => {
    const body = {
      Name: 'TestData3',
      Description: 'Newly added',
      ProjectId: 5,
    };
    return request(app.getHttpServer()).post('/model').send(body).expect(201);
  });
  it('/model (POST)', () => {
    const body = {
      Name: 'TestData3',
      Description: 'Newly added',
      ProjectId: 4,
    };
    return request(app.getHttpServer())
      .post('/model')
      .send(body)
      .expect(422)
      .expect(unprocessableEntityError(4));
  });
  it('/model/:id (PUT)', () => {
    const body = {
      Name: 'TestData2 Updated',
      Description: 'Newly added',
      ProjectId: 2,
    };
    return request(app.getHttpServer()).put('/model/2').send(body).expect(200);
  });
  it('/model/:id (PUT)', () => {
    const body = {
      Name: 'TestData3',
      Description: 'Newly added',
      ProjectId: 2,
    };
    return request(app.getHttpServer())
      .put('/model/4', (_, req) => {
        req.body = body;
      })
      .expect(404)
      .expect(notFoundError(4, 'Model'));
  });
  it('/model/:id (PUT)', () => {
    const body: ModelDto = {
      Name: 'TestData3',
      Description: 'Newly added',
      ProjectId: 4,
    };
    return request(app.getHttpServer())
      .put('/model/2')
      .send(body)
      .expect(422)
      .expect(unprocessableEntityError(4));
  });
  it('/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/model/1').expect(200);
  });
  it('/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/model/4')
      .expect(404)
      .expect(notFoundError(4, 'Model'));
  });
});
