import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Questionnaire() {
  const { shareCode } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    patient_name: '', patient_phone: '', patient_age: '', patient_gender: ''
  });
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/questionnaires/${shareCode}`)
      .then(r => r.json())
      .then(data => {
        if (data.code === 0) {
          setQuestionnaire(data.data);
        } else {
          setError(data.message || '量表不存在');
        }
        setLoading(false);
      })
      .catch(() => { setError('加载失败'); setLoading(false); });
  }, [shareCode]);

  const handleAnswer = (questionId, value, isMulti) => {
    setAnswers(prev => {
      if (isMulti) {
        const current = prev[questionId] || [];
        const next = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
        return { ...prev, [questionId]: next };
      }
      return { ...prev, [questionId]: [value] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientInfo.patient_name || !patientInfo.patient_phone) {
      alert('请填写姓名和手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(patientInfo.patient_phone)) {
      alert('请输入有效的手机号');
      return;
    }

    let questions = [];
    try { questions = JSON.parse(questionnaire.questions_json); } catch {}

    // 检查必答题
    for (const q of questions) {
      if (q.required && (!answers[q.id] || answers[q.id].length === 0)) {
        alert(`请回答：${q.text}`);
        return;
      }
    }

    const answersArr = Object.entries(answers).map(([qid, vals]) => ({
      question_id: qid, values: vals
    }));

    setSubmitting(true);
    try {
      const res = await fetch(`/api/questionnaires/${shareCode}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...patientInfo,
          patient_age: patientInfo.patient_age ? parseInt(patientInfo.patient_age) : 0,
          answers_json: JSON.stringify(answersArr),
        }),
      });
      const data = await res.json();
      if (data.code === 0) {
        setResult(data.data);
      } else {
        alert(data.message || '提交失败');
      }
    } catch {
      alert('网络错误');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="q-page"><div className="q-loading">加载中...</div></div>
  );

  if (error) return (
    <div className="q-page">
      <div className="q-error">
        <h2>😔 {error}</h2>
        <Link to="/" className="q-back-btn">返回首页</Link>
      </div>
    </div>
  );

  if (result) return (
    <div className="q-page">
      <div className="q-result-card">
        <div className="q-result-icon">📊</div>
        <h2>评估结果</h2>
        <div className="q-result-score">{result.total_score} 分</div>
        <div className="q-result-text">{result.result_text}</div>
        <p className="q-result-hint">
          本结果仅供参考，如需专业诊断请咨询医生
        </p>
        <Link to="/" className="q-back-btn">返回首页</Link>
      </div>
      <style>{resultStyles}</style>
    </div>
  );

  let questions = [];
  try { questions = JSON.parse(questionnaire.questions_json); } catch {}

  return (
    <div className="q-page">
      <div className="q-container">
        <div className="q-header">
          <h1>{questionnaire.title}</h1>
          {questionnaire.description && <p>{questionnaire.description}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          {/* 患者信息 */}
          <div className="q-section">
            <h3>个人信息</h3>
            <div className="q-info-grid">
              <div className="q-field">
                <label>姓名 <span>*</span></label>
                <input value={patientInfo.patient_name}
                  onChange={e => setPatientInfo({...patientInfo, patient_name: e.target.value})}
                  placeholder="您的姓名" />
              </div>
              <div className="q-field">
                <label>手机号 <span>*</span></label>
                <input value={patientInfo.patient_phone}
                  onChange={e => setPatientInfo({...patientInfo, patient_phone: e.target.value})}
                  placeholder="您的手机号" />
              </div>
              <div className="q-field">
                <label>年龄</label>
                <input type="number" value={patientInfo.patient_age}
                  onChange={e => setPatientInfo({...patientInfo, patient_age: e.target.value})}
                  placeholder="年龄" />
              </div>
              <div className="q-field">
                <label>性别</label>
                <select value={patientInfo.patient_gender}
                  onChange={e => setPatientInfo({...patientInfo, patient_gender: e.target.value})}>
                  <option value="">请选择</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
            </div>
          </div>

          {/* 题目 */}
          {questions.map((q, idx) => (
            <div key={q.id} className="q-question">
              <div className="q-question-title">
                <span className="q-num">{idx + 1}</span>
                {q.text}
                {q.required && <span className="q-required">*</span>}
              </div>
              <div className="q-options">
                {(q.options || []).map((opt) => {
                  const isMulti = q.type === 'multi_choice';
                  const selected = (answers[q.id] || []).includes(opt.value);
                  return (
                    <label key={opt.value}
                      className={`q-option ${selected ? 'selected' : ''}`}
                      onClick={() => handleAnswer(q.id, opt.value, isMulti)}>
                      <span className={`q-radio ${isMulti ? 'multi' : ''} ${selected ? 'checked' : ''}`} />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <button type="submit" className="q-submit" disabled={submitting}>
            {submitting ? '提交中...' : '提交问卷'}
          </button>
        </form>
      </div>

      <style>{`
        .q-page {
          min-height: 100vh; padding: 100px 1rem 3rem;
          background: linear-gradient(180deg, #f0f4ff 0%, #fff 50%);
        }
        .q-loading, .q-error {
          text-align: center; padding: 4rem; color: #666;
        }
        .q-error h2 { color: var(--color-primary, #0B3058); margin-bottom: 1rem; }
        .q-back-btn {
          display: inline-block; padding: 0.7rem 2rem;
          background: var(--color-primary, #0B3058); color: #fff;
          border-radius: 8px; text-decoration: none; margin-top: 1rem;
        }
        .q-container {
          max-width: 700px; margin: 0 auto;
        }
        .q-header {
          text-align: center; margin-bottom: 2rem;
        }
        .q-header h1 {
          font-size: 1.8rem; color: var(--color-primary, #0B3058);
          margin-bottom: 0.5rem;
        }
        .q-header p { color: #666; font-size: 0.95rem; }

        .q-section {
          background: #fff; border-radius: 12px; padding: 1.5rem;
          margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .q-section h3 {
          font-size: 1rem; color: var(--color-primary, #0B3058);
          margin-bottom: 1rem; padding-bottom: 0.5rem;
          border-bottom: 2px solid #f0f0f0;
        }
        .q-info-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }
        .q-field label {
          display: block; font-size: 0.85rem; font-weight: 500;
          color: #333; margin-bottom: 0.3rem;
        }
        .q-field label span { color: #EF4444; }
        .q-field input, .q-field select {
          width: 100%; padding: 0.65rem 0.8rem; border: 1px solid #ddd;
          border-radius: 8px; font-size: 0.9rem; background: #fafafa;
          outline: none; box-sizing: border-box;
        }
        .q-field input:focus, .q-field select:focus {
          border-color: var(--color-primary, #0B3058); background: #fff;
        }

        .q-question {
          background: #fff; border-radius: 12px; padding: 1.5rem;
          margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .q-question-title {
          font-size: 1rem; font-weight: 500; color: #222;
          margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;
        }
        .q-num {
          background: var(--color-primary, #0B3058); color: #fff;
          width: 24px; height: 24px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 0.75rem; flex-shrink: 0;
        }
        .q-required { color: #EF4444; }
        .q-options { display: flex; flex-direction: column; gap: 0.5rem; }
        .q-option {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem 1rem; border: 1px solid #e5e5e5;
          border-radius: 8px; cursor: pointer; transition: all 0.2s;
          font-size: 0.9rem;
        }
        .q-option:hover { border-color: var(--color-primary, #0B3058); background: #f8faff; }
        .q-option.selected {
          border-color: var(--color-primary, #0B3058);
          background: rgba(11, 48, 88, 0.05);
        }
        .q-radio {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid #ccc; flex-shrink: 0; transition: all 0.2s;
          position: relative;
        }
        .q-radio.multi { border-radius: 4px; }
        .q-radio.checked {
          border-color: var(--color-primary, #0B3058);
          background: var(--color-primary, #0B3058);
        }
        .q-radio.checked::after {
          content: '✓'; color: #fff; position: absolute;
          inset: 0; display: flex; align-items: center;
          justify-content: center; font-size: 0.65rem;
        }

        .q-submit {
          width: 100%; padding: 1rem; margin-top: 1rem;
          background: var(--color-primary, #0B3058); color: #fff;
          border: none; border-radius: 12px; font-size: 1.05rem;
          font-weight: 600; cursor: pointer; transition: all 0.3s;
        }
        .q-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .q-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 480px) {
          .q-info-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

const resultStyles = `
  .q-result-card {
    max-width: 500px; margin: 0 auto; text-align: center;
    background: #fff; border-radius: 16px; padding: 3rem 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  .q-result-icon { font-size: 3rem; margin-bottom: 1rem; }
  .q-result-card h2 {
    font-size: 1.5rem; color: var(--color-primary, #0B3058);
    margin-bottom: 1.5rem;
  }
  .q-result-score {
    font-size: 3rem; font-weight: 700;
    color: var(--color-primary, #0B3058); margin-bottom: 0.5rem;
  }
  .q-result-text {
    font-size: 1.2rem; font-weight: 600; padding: 0.75rem 1.5rem;
    background: rgba(11, 48, 88, 0.06); border-radius: 8px;
    display: inline-block; margin-bottom: 1.5rem; color: #333;
  }
  .q-result-hint {
    color: #999; font-size: 0.85rem; margin-bottom: 1.5rem;
  }
`;
