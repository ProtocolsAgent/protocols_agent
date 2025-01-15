const { Anthropic } = require('anthropic');
const logger = require('../../utils/logger');

class ClaudeService {
    constructor() {
        this.client = new Anthropic({
            apiKey: process.env.CLAUDE_API_KEY
        });
    }

    async generateResponse(prompt) {
        try {
            const response = await this.client.messages.create({
                model: "claude-2",
                max_tokens: 500,
                messages: prompt.messages
            });

            return response.content;
        } catch (error) {
            logger.error('Claude API Error:', error);
            throw error;
        }
    }
}

module.exports = { ClaudeService };
