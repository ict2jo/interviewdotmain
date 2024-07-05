import React, { useState } from 'react';
import './verification.css'; 
import userStore from '@/stores/UserStore';
import axios from 'axios';
import menuStore from '@/stores/MenuStore';

export default function Verification() {
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctedEssay, setCorrectedEssay] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleCorrection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userStore.field, type: 'correction' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      setFeedback(data.answer);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
      setInputDisabled(false);
    }
  };

  const handleRewrite = async () => {
    setLoading2(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userStore.field, feedback, type: 'rewrite' }), // feedback도 함께 전송
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      setCorrectedEssay(data.answer);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading2(false);
      setInputDisabled(false);
    }
  };

  console.log("유저유저"+userStore.id)
  const handleSave = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/introduce/save',
        {
          id: userStore.id,
          correctedEssay: correctedEssay,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        alert('자기소개서가 성공적으로 저장되었습니다.');
      } else {
        throw new Error(response.data.error || `Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('자기소개서 저장 중 오류가 발생했습니다.');
    }
  };

  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
};

  

  return (
    <div className="chat-container">
      <h1>자기소개서</h1>
      <div className="input-output-section">

          <div className="input-box">
            <div className="header">사용자</div>
            <form className="input-section" onSubmit={(e) => e.preventDefault()}>
              <textarea
                value={userStore.field}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="자기소개서 내용을 입력하세요."
                disabled={inputDisabled || loading}
                rows="10"
                style={{ resize: 'none', margin: '0px' }}
              />
              <div className="button-wrapper">
                <button type="button" onClick={handleCorrection} disabled={loading}>
                  검증하기
                </button>
                <button type="button" onClick={handleRewrite} disabled={loading2}>
                  예시보기
                </button>
              </div>
            </form>
          </div>

        <div className="feedback-box">
          <div className="header">피드백</div>
          <div className="feedback-section">
            {loading && <p>Loading...</p>}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="피드백이 여기에 표시됩니다."
              disabled={loading}
              rows="15"
              style={{ width: '100%', resize: 'none', margin: '0px' }}
            />
          </div>
        </div>
        
          <div className="output-box">
            <div className="header">예시 (자기소개서 수정)</div>
            <div className="output-section">
              {loading2 && <p>Loading...</p>}
              <textarea
                value={correctedEssay}
                onChange={(e) => setCorrectedEssay(e.target.value)}
                placeholder="자기소개서 예시가 여기에 표시됩니다."
                disabled={loading2}
                rows="15"
                style={{ resize: 'none', margin: '0px' }}
              />
              <div className="button-wrapper">
                <button type="button" onClick={handleSave} disabled={!correctedEssay}>
                  저장하기
                </button>
              </div>
            </div>
        </div>
        
        <div className="button-back">
          <button type="button" onClick={() => handleMenuClick("intoduction")}>뒤로가기</button>
        </div>
      </div>
    </div>
  );
}
