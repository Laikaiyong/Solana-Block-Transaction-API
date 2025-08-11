import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Connection, clusterApiUrl } from "@solana/web3.js";

@Injectable()
export class SolanaService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(
      process.env.SOLANA_RPC_URL ?? clusterApiUrl("mainnet-beta"),
      "confirmed"
    );
  }

  async getTransactionCount(
    blockNumber: number
  ): Promise<{ blockNumber: number; transactionCount: number }> {
    try {
      const block = await this.connection.getBlock(blockNumber, {
        maxSupportedTransactionVersion: 0,
      });

      if (!block) {
        throw new HttpException(
          `Block ${blockNumber} not found`,
          HttpStatus.NOT_FOUND
        );
      }

      return {
        blockNumber,
        transactionCount: block.transactions.length,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error fetching block ${blockNumber}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
