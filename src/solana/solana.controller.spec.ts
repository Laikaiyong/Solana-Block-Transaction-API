import { Test, TestingModule } from '@nestjs/testing';
import { SolanaController } from './solana.controller';
import { SolanaService } from './solana.service';

describe('SolanaController', () => {
  let controller: SolanaController;
  let service: SolanaService;

  const mockSolanaService = {
    getTransactionCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolanaController],
      providers: [
        {
          provide: SolanaService,
          useValue: mockSolanaService,
        },
      ],
    }).compile();

    controller = module.get<SolanaController>(SolanaController);
    service = module.get<SolanaService>(SolanaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBlockTransactionCount', () => {
    it('should return transaction count for a block', async () => {
      const blockNumber = 12345;
      const expectedResult = {
        blockNumber: 12345,
        transactionCount: 150,
      };

      mockSolanaService.getTransactionCount.mockResolvedValue(expectedResult);

      const result = await controller.getBlockTransactionCount(blockNumber);

      expect(service.getTransactionCount).toHaveBeenCalledWith(blockNumber);
      expect(result).toEqual(expectedResult);
    });

    it('should pass the correct block number to service', async () => {
      const blockNumber = 98765;
      const expectedResult = {
        blockNumber: 98765,
        transactionCount: 75,
      };

      mockSolanaService.getTransactionCount.mockResolvedValue(expectedResult);

      await controller.getBlockTransactionCount(blockNumber);

      expect(service.getTransactionCount).toHaveBeenCalledWith(blockNumber);
    });
  });
});