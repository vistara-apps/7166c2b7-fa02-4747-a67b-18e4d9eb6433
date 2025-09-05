import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateStateGuide(state: string, language: 'en' | 'es' = 'en') {
  try {
    const prompt = `Generate a comprehensive legal rights guide for ${state} in ${language === 'es' ? 'Spanish' : 'English'}. 

Include:
1. Key constitutional rights during police encounters
2. 5 specific "what to say" phrases
3. 5 specific "what NOT to say" warnings
4. State-specific laws and considerations

Format as JSON with keys: keyRights, whatToSay, whatNotToSay, stateSpecific

Keep language simple and actionable for high-stress situations.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal rights expert who creates clear, actionable guidance for citizens during police encounters. Focus on constitutional rights and de-escalation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating guide:', error);
    throw new Error('Failed to generate legal guide');
  }
}

export async function translateGuide(content: string, targetLanguage: 'en' | 'es') {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in legal documents. Translate the following legal rights content to ${targetLanguage === 'es' ? 'Spanish' : 'English'}, maintaining legal accuracy and clarity.`
        },
        {
          role: 'user',
          content: `Translate this legal content: ${content}`
        }
      ],
      temperature: 0.1,
      max_tokens: 1000
    });

    return completion.choices[0]?.message?.content || content;
  } catch (error) {
    console.error('Error translating content:', error);
    return content; // Return original if translation fails
  }
}

export async function generateEncounterSummary(notes: string, location?: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal documentation assistant. Create a clear, factual summary of a police encounter based on user notes. Focus on key details, timeline, and relevant legal considerations.'
        },
        {
          role: 'user',
          content: `Create a summary of this encounter: ${notes}${location ? ` Location: ${location}` : ''}`
        }
      ],
      temperature: 0.2,
      max_tokens: 500
    });

    return completion.choices[0]?.message?.content || notes;
  } catch (error) {
    console.error('Error generating summary:', error);
    return notes;
  }
}
