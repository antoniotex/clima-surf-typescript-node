import { SetupServer } from '@src/server';
import supertest from 'supertest';

beforeAll(async () => {
  const server = new SetupServer();
  server.init();
  global.testRequest = await supertest(server.getApp());
});
