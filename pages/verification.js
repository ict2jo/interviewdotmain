import React, { useState, useEffect, useRef } from 'react';
import './verification.css'; // 필요한 CSS 파일 import

export default function Verification() {
  const [chatHistory, setChatHistory] = useState([]); // 채팅 기록을 저장할 상태 추가
  const [question, setQuestion] = useState('');
  const [chatOpen, setChatOpen] = useState(false); // 채팅창 열림 여부를 관리하는 상태 추가
  const [inputDisabled, setInputDisabled] = useState(false); // 인풋박스 비활성화 상태 추가
  const chatHistoryRef = useRef(null); // chat-history 요소에 접근하기 위한 useRef

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      const newChat = {
        question,
        answer: data.answer,
      };

      setChatHistory([...chatHistory, newChat]); // 새로운 채팅 기록 추가
      setQuestion(''); // 질문 초기화
      setInputDisabled(true); // 인풋박스 비활성화

      // 스크롤을 최하단으로 이동
      if (chatHistoryRef.current) {
        chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chat-container">
      <div className="chat-history" ref={chatHistoryRef}>
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-item">
            <div className="question-answer">
              <div className="question">{chat.question}</div>
              <div className="answer">
                <img src="/chat.png" alt="Chat Icon" />
                {chat.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-section">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="내용을 입력하세요."
          disabled={inputDisabled}
        />
        <button type="submit">검증</button>
      </form>
    </div>
  );
}
