import OpenAI from 'openai';
import dotenv from 'dotenv';

// 환경 변수 파일(.env) 로드
dotenv.config({ path: __dirname + '/.env' });

// OpenAI 클라이언트 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API 핸들러 함수 정의
export default async function handler(req, res) {
  // POST 메서드가 아닌 경우, 405 상태 코드와 오류 메시지 반환
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 요청 바디에서 필요한 데이터 추출
  const { question, feedback, type } = req.body;

  try {
    let assistantId;

    // 요청 타입에 따라 적절한 Assistant ID 설정
    if (type === 'correction') {
      assistantId = process.env.GPTSKEY1_1; 
    } else if (type === 'rewrite') {
      assistantId = process.env.GPTSKEY1_2; 
    } else {
      throw new Error('Invalid request type');
    }

    // Assistant 정보 조회
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    
    // 새로운 스레드 생성
    const thread = await openai.beta.threads.create();

    // 사용자 메시지 생성
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `${question} ${feedback}`
    });

    // 스레드 실행
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      instructions: '', 
    });

    // 실행 완료를 기다리고 메시지 가져오기
    const message = await waitForCompletionAndGetMessage(openai, thread.id, run.id);
    const contents = message.body.data[0].content[0].text.value;

    // 응답 반환
    res.status(200).json({ answer: contents });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

// 실행 완료를 기다리고 메시지를 가져오는 함수
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

// 실행 상태를 확인하는 함수
async function checkRunStatus(client, threadId, runId) {
  let run = await client.beta.threads.runs.retrieve(threadId, runId);

  while (run.status !== 'completed') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.beta.threads.runs.retrieve(threadId, runId);
  }
}
