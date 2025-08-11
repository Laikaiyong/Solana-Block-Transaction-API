# Solana Data API

A NestJS-based REST API for retrieving Solana blockchain data. This service provides endpoints to query Solana blockchain information such as block transaction counts.

## Features

- Built with NestJS framework
- Solana blockchain integration using @solana/web3.js
- Get transaction counts for specific blocks
- TypeScript support
- Comprehensive testing setup
- Development tools (ESLint, Prettier)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd solana-data-api

# Install dependencies
npm install
```

## Configuration

The API uses environment variables for configuration:

- `PORT` - Server port (default: 3000)
- `SOLANA_RPC_URL` - Solana RPC endpoint (default: mainnet-beta)

Create a `.env` file in the root directory:

```env
PORT=3000
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## Usage

### Development

```bash
# Start development server with hot reload
npm run start:dev

# Start debug mode
npm run start:debug
```

### Production

```bash
# Build the project
npm run build

# Start production server
npm run start:prod
```

## API Endpoints

### Get Block Transaction Count

Retrieves the transaction count for a specific Solana block.

**Endpoint:**

```http
GET /solana/block/{blockNumber}
```

**Parameters:**

- `blockNumber` (number) - The block number to query

**Success Response (200 OK):**

```json
{
  "blockNumber": 123456789,
  "transactionCount": 42
}
```

**Error Responses:**

**404 Not Found** - When the block doesn't exist:

```json
{
  "statusCode": 404,
  "message": "Block 123456789 not found"
}
```

**400 Bad Request** - When block number is invalid:

```json
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```

**Examples:**

```bash
# Get transaction count for block 123456789
curl http://localhost:3000/solana/block/123456789

# Expected successful response:
# {
#   "blockNumber": 123456789,
#   "transactionCount": 42
# }

# Example with invalid block number
curl http://localhost:3000/solana/block/abc
# Returns 400 Bad Request

# Example with non-existent block
curl http://localhost:3000/solana/block/999999999999
# Returns 404 Not Found
```

**Response Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `blockNumber` | number | The queried block number |
| `transactionCount` | number | Total number of transactions in the block |

## Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

## Development Tools

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## Project Structure

```text
src/
├── app.controller.ts    # Main application controller
├── app.module.ts        # Root application module
├── app.service.ts       # Main application service
├── main.ts             # Application entry point
└── solana/             # Solana-specific module
    ├── solana.controller.ts  # Solana API endpoints
    ├── solana.service.ts     # Solana blockchain integration
    └── solana.module.ts      # Solana module configuration
test/                   # Test files
```

## Built With

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/) - Solana JavaScript API
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Jest](https://jestjs.io/) - Testing framework

## License

This project is [UNLICENSED](LICENSE).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request