import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SolanaService } from './solana.service';

describe('SolanaService', () => {
  let service: SolanaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolanaService],
    }).compile();

    service = module.get<SolanaService>(SolanaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTransactionCount', () => {
    it('should return transaction count for valid block number', async () => {
      const blockNumber = 100000000;
      const result = await service.getTransactionCount(blockNumber);
      
      expect(result).toHaveProperty('blockNumber', blockNumber);
      expect(result).toHaveProperty('transactionCount');
      expect(typeof result.transactionCount).toBe('number');
      expect(result.transactionCount).toBeGreaterThanOrEqual(0);
    }, 30000);

    it('should throw HttpException for invalid block number', async () => {
      const invalidBlockNumber = 999999999999;
      
      await expect(service.getTransactionCount(invalidBlockNumber))
        .rejects
        .toThrow(HttpException);
    }, 30000);

    it('should return correct response format', async () => {
      const blockNumber = 100000000;
      const result = await service.getTransactionCount(blockNumber);
      
      expect(result).toEqual({
        blockNumber: expect.any(Number),
        transactionCount: expect.any(Number),
      });
    }, 30000);
  });
});