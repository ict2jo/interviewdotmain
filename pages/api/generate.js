import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config({ path: __dirname + '/.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { question } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: "You will be provided with statements, Please give me an appropriate answer to my question in Korean."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
      // max_tokens: 64,s
      top_p: 1,
    });
    

    // console.log('OpenAI API Response:', response.choices[0].message.content); // 응답 데이터 출력

    let answer = '';

    if (response && response.choices && response.choices.length > 0) {
      answer = response.choices[0].message.content.trim();
    }

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
