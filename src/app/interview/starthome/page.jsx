"use client"

import { useState } from 'react';
import './starthome.css'
export default function Starthome(params) {

    const openPopup = () => {
        const width = 1200;
        const height = 800;
        const left = (window.innerWidth - width) / 2 + window.screenX;
        const top = (window.innerHeight - height) / 2 + window.screenY;
        window.open('/interview/select', 'interview', `width=${width},height=${height},left=${left},top=${top}`);
    };


  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState();

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
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      setAnswer(data.result);
      setQuestion('');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
    
    return (
        <>       
        <div className="interview_start">
            <button onClick={openPopup}>
                면접 연습 시작하기
            </button>
        </div>

        <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type='submit'>질문하기</button>
      </form>
      <div>{answer}</div>
        </>
    );
}
