import React, {useContext, useEffect, useState} from 'react';
import './verification.css';
import userStore from '@/stores/UserStore';
import axios from 'axios';
import menuStore from '@/stores/MenuStore';
import {Button} from '@mui/material';
import {MenuContext} from '@/stores/StoreContext';

export default function Verification() {
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctedEssay, setCorrectedEssay] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const menuStore = useContext(MenuContext);
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [resumeIdx, setResumeIdx] = useState('');
  useEffect(() => {
    const selectedResumeData = menuStore.selectedResumeData;

    if (selectedResumeData) {
        setSelfIntroduction(selectedResumeData.content);
        setResumeIdx(selectedResumeData.resume_idx);
    }

    setLoading(false);
}, [menuStore.selectedResumeData]);

  // 피드백
  const handleCorrection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: selfIntroduction, type: 'correction' }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }
      setFeedback(data.answer);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setInputDisabled(false);
    }
  };

  // 예시
  const handleRewrite = async () => {
    setLoading2(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: selfIntroduction, feedback, type: 'rewrite' }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }
      setCorrectedEssay(data.answer);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading2(false);
      setInputDisabled(false);
    }
  };

  const handleSave = async (menu) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/introduce/save',
        {
          resume_idx: resumeIdx,
          content: correctedEssay,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },

        }

        setLoading(false);
    }, [menuStore.selectedResumeData]);
    const handleCorrection = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question: selfIntroduction, type: 'correction'}),
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
                body: JSON.stringify({question: selfIntroduction, feedback, type: 'rewrite'}),
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

    const handleSave = async (menu) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/introduce/save',
                {
                    resume_idx: resumeIdx,
                    content: correctedEssay,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                alert('자기소개서가 성공적으로 저장되었습니다.');
                menuStore.setSelectedMenu(menu);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="chat-container">
            <h1>자기소개서</h1>
            <div className="input-output-section">
                {/* 사용자 입력 부분 */}
                <div className="input-box">
                    <div className="header">자기소개서</div>
                    <form className="input-section" onSubmit={(e) => e.preventDefault()}>
            <textarea
                value={selfIntroduction}
                onChange={(e) => setQuestion(e.target.value)}

                disabled={inputDisabled || loading}
                rows="12"
                style={{resize: 'none', margin: '0px'}}
            />
                        <div className="button-wrapper">
                            <Button onClick={handleCorrection} disabled={loading} variant="contained">
                                AI 피드백
                            </Button>
                        </div>
                    </form>

                    <br/><br/>
                    <div className="header">예시 (자기소개서 수정)</div>
                    <div className="output-section">
                        {loading2 && <p>Loading...</p>}
                        <textarea
                            value={correctedEssay}
                            onChange={(e) => setCorrectedEssay(e.target.value)}
                            placeholder="자기소개서 예시가 여기에 표시됩니다."
                            disabled={loading2}
                            rows="15"
                            style={{resize: 'none', margin: '0px'}}
                        />
                        <div className="button-wrapper">
                            <Button onClick={() => handleSave("resume")} disabled={!correctedEssay} variant="contained">
                                저장하기
                            </Button>
                        </div>
                    </div>
                </div>


                {/* 피드백 부분 */}
                <div className="feedback-box">
                    <div className="header">피드백</div>
                    <div className="feedback-section">
                        {loading && <p>Loading...</p>}
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="피드백이 여기에 표시됩니다."
                            disabled={inputDisabled || loading}
                            rows="34"
                            style={{width: '100%', resize: 'none', margin: '0px'}}
                        />
                    </div>
                    <div className="button-wrapper">
                        <Button onClick={handleRewrite} disabled={loading2} variant="contained"
                                style={{marginTop: "27px"}}>
                            AI 예시
                        </Button>
                    </div>
                </div>
            </div>

            {/* 뒤로가기 버튼 */}
            <div className="button-back">
                <Button onClick={() => handleMenuClick("resume")} variant="outlined">뒤로가기</Button>
            </div>
        </div>
    );

}
