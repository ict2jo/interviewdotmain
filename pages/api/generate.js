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

  try {
    const { question } = req.body;

    // 1. Assistant 객체 가져오기
    const assistant = await openai.beta.assistants.retrieve(process.env.GPTSKEY1);

    // 2. 스레드 생성
    const thread = await openai.beta.threads.create();

    // 3. 사용자 메시지 생성 (사용자가 제공한 질문 추가)
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: question,
    });

    // 4. Assistant 실행 및 결과 대기
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      instructions: '', // 추가적인 지시사항이 필요하면 여기에 추가
    });

    // 5. Assistant 실행 완료 후 결과 메시지 가져오기
    const message = await waitForCompletionAndGetMessage(openai, thread.id, run.id);

    const contents = message.body.data[0].content[0].text.value; // GPTs가 생성한 내용

    // 6. 클라이언트에게 결과 전송
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
    throw error; // 에러를 다시 던져서 handler 함수에서 처리할 수 있도록 함
  }
}

async function checkRunStatus(client, threadId, runId) {
  let run = await client.beta.threads.runs.retrieve(threadId, runId);

  while (run.status !== 'completed') {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
    run = await client.beta.threads.runs.retrieve(threadId, runId);
  }
}
