import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!configuration.apiKey) {
    return res.status(500).json({
      error: {
        message: 'OpenAI API key not configured',
      },
    });
  }

  const question = req.body.question || '';

  if (question.trim().length === 0) {
    return res.status(400).json({
      error: {
        message: 'Question is required',
      },
    });
  }

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `I am a highly intelligent question answering bot. If you ask me ${question} that is rooted in truth, I will give you the answer to Korean. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "잘 모르겠습니다.".\n`,
      temperature: 0,
      max_tokens: 100,
    });

    return res.status(200).json({ result: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error with OpenAI API request:', error);
    return res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      },
    });
  }
}
