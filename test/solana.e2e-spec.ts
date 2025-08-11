import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Solana (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/solana/block/:blockNumber/transactions (GET)', () => {
    it('should return transaction count for valid block', () => {
      return request(app.getHttpServer())
        .get('/solana/block/100000000/transactions')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('blockNumber', 100000000);
          expect(res.body).toHaveProperty('transactionCount');
          expect(typeof res.body.transactionCount).toBe('number');
          expect(res.body.transactionCount).toBeGreaterThanOrEqual(0);
        });
    }, 30000);

    it('should return 400 for invalid block number format', () => {
      return request(app.getHttpServer())
        .get('/solana/block/invalid/transactions')
        .expect(400);
    });

    it('should return correct response format', () => {
      return request(app.getHttpServer())
        .get('/solana/block/100000000/transactions')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            blockNumber: expect.any(Number),
            transactionCount: expect.any(Number),
          });
        });
    }, 30000);
  });
});