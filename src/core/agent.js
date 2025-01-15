const { ElizaCore } = require('./elizaCore');
const { OpenAIService } = require('../services/ai/openaiService');
const { ClaudeService } = require('../services/ai/claudeService');
const { PythIntegration } = require('./pythIntegration');
const logger = require('../utils/logger');

class Agent {
    constructor() {
        this.eliza = new ElizaCore();
        this.openai = new OpenAIService();
        this.claude = new ClaudeService();
        this.pyth = new PythIntegration();
        this.context = new Map();
    }

    async processMessage(message, userId) {
        try {
            // Get user context or create new
            const userContext = this.context.get(userId) || [];
            
            // Process with Eliza first
            const elizaResponse = this.eliza.processInput(message);
            
            // Enhance with AI models
            const aiPrompt = this.buildAIPrompt(message, elizaResponse, userContext);
            const aiResponse = await this.getAIResponse(aiPrompt);
            
            // Update context
            userContext.push({ role: 'user', content: message });
            userContext.push({ role: 'assistant', content: aiResponse });
            this.context.set(userId, userContext.slice(-10)); // Keep last 10 messages
            
            return aiResponse;
        } catch (error) {
            logger.error('Error processing message:', error);
            throw error;
        }
    }

    async getAIResponse(prompt) {
        try {
            const openAIResponse = await this.openai.generateResponse(prompt);
            if (openAIResponse) return openAIResponse;
            
            return await this.claude.generateResponse(prompt);
        } catch (error) {
            logger.error('Error getting AI response:', error);
            throw error;
        }
    }

    buildAIPrompt(message, elizaResponse, context) {
        return {
            messages: [
                { role: 'system', content: 'You are a DeFi protocol assistant specialized in Solana ecosystem.' },
                ...context,
                { role: 'user', content: message },
                { role: 'assistant', content: elizaResponse }
            ]
        };
    }
}

module.exports = new Agent();
