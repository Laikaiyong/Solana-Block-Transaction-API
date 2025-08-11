import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SolanaService } from './solana.service';

@Controller('solana')
export class SolanaController {
  constructor(private readonly solanaService: SolanaService) {}

  @Get('block/:blockNumber/')
  async getBlockTransactionCount(
    @Param('blockNumber', ParseIntPipe) blockNumber: number,
  ) {
    return this.solanaService.getTransactionCount(blockNumber);
  }
}