import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateLegalGuide(
  state: string,
  scenario: string,
  language: 'en' | 'es' = 'en'
): Promise<{
  title: string;
  content: string;
  whatToSay: string[];
  whatNotToSay: string[];
}> {
  try {
    const prompt = `Generate a legal rights guide for ${state} state regarding ${scenario}. 
    Language: ${language === 'es' ? 'Spanish' : 'English'}
    
    Please provide:
    1. A clear title
    2. Brief overview of rights (2-3 paragraphs)
    3. 5 specific things TO SAY during an encounter
    4. 5 specific things NOT TO SAY during an encounter
    
    Keep it practical, mobile-friendly, and easy to understand during stressful situations.
    Focus on constitutional rights and state-specific laws.
    
    Format as JSON with keys: title, content, whatToSay (array), whatNotToSay (array)`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal rights expert who provides clear, accurate, and practical guidance for citizens during legal encounters. Always emphasize constitutional rights and de-escalation.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from AI');
    }

    try {
      return JSON.parse(response);
    } catch {
      // Fallback if JSON parsing fails
      return {
        title: `${scenario} Rights in ${state}`,
        content: response,
        whatToSay: [
          'I am exercising my right to remain silent.',
          'I do not consent to any searches.',
          'Am I free to leave?',
          'I would like to speak to an attorney.',
          'I am not resisting, but I do not consent.',
        ],
        whatNotToSay: [
          'I have nothing to hide.',
          'Go ahead and search.',
          'I was just...',
          'That\'s not mine.',
          'I didn\'t know that was illegal.',
        ],
      };
    }
  } catch (error) {
    console.error('Error generating legal guide:', error);
    
    // Return fallback content
    return {
      title: `${scenario} Rights in ${state}`,
      content: `Your constitutional rights remain the same regardless of the situation. You have the right to remain silent, the right to refuse searches, and the right to an attorney. Stay calm, be respectful, and clearly state your rights.`,
      whatToSay: [
        'I am exercising my right to remain silent.',
        'I do not consent to any searches.',
        'Am I free to leave?',
        'I would like to speak to an attorney.',
        'I am not resisting, but I do not consent.',
      ],
      whatNotToSay: [
        'I have nothing to hide.',
        'Go ahead and search.',
        'I was just...',
        'That\'s not mine.',
        'I didn\'t know that was illegal.',
      ],
    };
  }
}

export async function translateContent(
  content: string,
  targetLanguage: 'en' | 'es'
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in legal content. Translate the following text to ${targetLanguage === 'es' ? 'Spanish' : 'English'} while maintaining legal accuracy and clarity.`,
        },
        {
          role: 'user',
          content,
        },
      ],
      temperature: 0.1,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || content;
  } catch (error) {
    console.error('Error translating content:', error);
    return content;
  }
}
