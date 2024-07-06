import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { question, feedback, type } = req.body;

  try {
    let assistantId;

    if (type === 'correction') {
      assistantId = process.env.GPTSKEY1_1; 
    } else if (type === 'rewrite') {
      assistantId = process.env.GPTSKEY1_2; 
    } else {
      throw new Error('Invalid request type');
    }

    const assistant = await openai.beta.assistants.retrieve(assistantId);
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `${question} ${feedback}`
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      instructions: '', 
    });

    const message = await waitForCompletionAndGetMessage(openai, thread.id, run.id);
    const contents = message.body.data[0].content[0].text.value;

    res.status(200).json({ answer: contents });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function waitForCompletionAndGetMessage(client, threadId, runId) {
  await checkRunStatus(client, threadId, runId);

  try {
    const message = await client.beta.threads.messages.list(threadId);
    if (message && message.body && message.body.data && message.body.data.length > 0) {
      return message;
    } else {
      throw new Error('Failed to fetch message.');
    }
  } catch (error) {
    console.error('Error while fetching messages:', error);
    throw error;
  }
}

async function checkRunStatus(client, threadId, runId) {
  let run = await client.beta.threads.runs.retrieve(threadId, runId);

  while (run.status !== 'completed') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.beta.threads.runs.retrieve(threadId, runId);
  }
}
