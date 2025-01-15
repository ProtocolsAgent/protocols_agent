const agent = require('../../../src/core/agent');
const { OpenAIService } = require('../../../src/services/ai/openaiService');
const { ClaudeService } = require('../../../src/services/ai/claudeService');

jest.mock('../../../src/services/ai/openaiService');
jest.mock('../../../src/services/ai/claudeService');

describe('Agent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('processMessage should handle user input correctly', async () => {
        const message = 'What is the price of SOL?';
        const userId = 'test-user';
        
        const response = await agent.processMessage(message, userId);
        expect(response).toBeDefined();
    });

    test('should fallback to Claude when OpenAI fails', async () => {
        OpenAIService.prototype.generateResponse.mockRejectedValueOnce(new Error('OpenAI Error'));
        ClaudeService.prototype.generateResponse.mockResolvedValueOnce('Claude Response');

        const response = await agent.getAIResponse({ messages: [] });
        expect(response).toBe('Claude Response');
    });
});

// tests/unit/protocols/orca/orcaProtocol.test.js
const { OrcaProtocol } = require('../../../../src/protocols/orca/orcaProtocol');

describe('OrcaProtocol', () => {
    let orcaProtocol;

    beforeEach(() => {
        orcaProtocol = new OrcaProtocol();
    });

    test('getPoolInfo should return pool data', async () => {
        const poolAddress = 'test-pool-address';
        const poolInfo = await orcaProtocol.getPoolInfo(poolAddress);
        
        expect(poolInfo).toHaveProperty('liquidity');
        expect(poolInfo).toHaveProperty('tokenABalance');
        expect(poolInfo).toHaveProperty('tokenBBalance');
    });
});

// tests/integration/api/agent.test.js
const request = require('supertest');
const app = require('../../../src/core/server');

describe('Agent API', () => {
    test('POST /api/agent/chat should return valid response', async () => {
        const response = await request(app)
            .post('/api/agent/chat')
            .send({ message: 'Test message' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'success');
    });
});

// tests/e2e/fullFlow.test.js
const request = require('supertest');
const app = require('../../src/core/server');

describe('Full Flow E2E Test', () => {
    test('Complete interaction flow', async () => {
        // 1. Get protocol information
        const protocolResponse = await request(app)
            .get('/api/protocols/orca')
            .query({ poolAddress: 'test-pool' });
        expect(protocolResponse.status).toBe(200);

        // 2. Chat with agent about the protocol
        const chatResponse = await request(app)
            .post('/api/agent/chat')
            .send({ 
                message: `What can you tell me about this pool: ${protocolResponse.body.data.poolAddress}?` 
            });
        expect(chatResponse.status).toBe(200);
    });
});
