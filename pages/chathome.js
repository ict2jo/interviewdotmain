import React, { useState, useEffect, useRef } from 'react';
import './chathome.css'; // 필요한 CSS 파일 import

export default function Chathome() {
  const [chatHistory, setChatHistory] = useState([]); // 채팅 기록을 저장할 상태 추가
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatOpen, setChatOpen] = useState(false); // 채팅창 열림 여부를 관리하는 상태 추가
  const chatHistoryRef = useRef(null); // chat-history 요소에 접근하기 위한 useRef

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      const newChat = {
        question: question,
        answer: data.answer,
      };

      setChatHistory([...chatHistory, newChat]); // 새로운 채팅 기록 추가
      setQuestion(''); // 질문 초기화
      setAnswer(data.answer); // 서버에서 받은 답변 설정
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  // 채팅창 열기/닫기 함수
  const toggleChat = () => {
    setChatOpen(!chatOpen); // 상태를 반전시켜 채팅창을 열거나 닫음
  };

  // 새로운 채팅 메시지가 추가될 때마다 스크롤을 최신 메시지로 이동
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <>
      <div className="chat-icon" onClick={toggleChat}>
        <img src="/chat.png" alt="Chat Icon" />
      </div>
      
      {chatOpen && (
        <div className="chat-container">
          <div className="chat-history" ref={chatHistoryRef}>
            {chatHistory.map((chat, index) => (
              <div key={index} className="chat-item">
                <div className="question">{chat.question}</div>
                <div className="answer">{chat.answer}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="내용을 입력하세요."
            />
            <button type='submit'>↩</button>
          </form>
        </div>
      )}
    </>
  );
}
