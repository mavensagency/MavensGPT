import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/constants';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getChatResponse(prompt: string): Promise<string> {
  try {
    // Input validation
    if (!prompt.trim()) {
      throw new Error('Empty prompt provided');
    }

    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate content with error handling
    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      throw new Error('Invalid response from Gemini API');
    }

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in getChatResponse:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid or missing API key. Please check your configuration.');
      }
      if (error.message.includes('429')) {
        throw new Error('Too many requests. Please try again later.');
      }
      if (error.message.includes('403')) {
        throw new Error('Access denied. Please check your API key permissions.');
      }
    }
    
    throw new Error('Failed to get response from AI. Please try again.');
  }
}