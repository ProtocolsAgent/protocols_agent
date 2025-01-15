const OpenAI = require('openai');
const logger = require('../../utils/logger');

class OpenAIService {
    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    async generateResponse(prompt) {
        try {
            const response = await this.client.chat.completions.create({
                model: "gpt-4",
                messages: prompt.messages,
                temperature: 0.7,
                max_tokens: 500
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('OpenAI API Error:', error);
            throw error;
        }
    }
}

module.exports = { OpenAIService };
