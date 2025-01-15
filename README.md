# ProtocolsAgent

AI agent for Solana DeFi protocols based on Eliza framework, integrated with Pyth Network and large language models.

## Features
- Eliza framework integration
- OpenAI and Claude AI models support
- Solana DeFi protocols support (Orca, Raydium)
- Pyth Network integration
- RESTful API endpoints

## API Endpoints
- POST /api/agent/chat - Chat with the AI agent
- GET /api/protocols/orca - Get Orca protocol information
- GET /api/protocols/ray - Get Raydium protocol information

## Setup
1. Clone the repository
2. Copy .env.example to .env and fill in required values
3. Run `npm install`
4. Run `npm start` for production or `npm run dev` for development

## Project Structure
- /src
  - /api - API related code
    - /routes - API routes
    - /controllers - Request handlers
    - /middleware - Express middleware
  - /core - Core agent functionality
  - /protocols - Protocol specific implementations
  - /services - AI and blockchain services
  - /utils - Utility functions
  - /config - Configuration files
  - /types - Type definitions
