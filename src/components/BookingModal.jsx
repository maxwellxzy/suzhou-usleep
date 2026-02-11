import React, { useState } from 'react';
import { X } from 'lucide-react';

const departments = [
  '睡眠门诊', '精神心理科', '儿童青少年心理', '心理咨询', '神经内科'
];

const BookingModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '', phone: '', gender: '', age: '',
    department: '', preferred_time: '', symptoms: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError('请填写姓名和手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      setError('请输入有效的手机号');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          age: form.age ? parseInt(form.age) : 0,
        }),
      });
      const data = await res.json();
      if (data.code === 0) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setForm({ name: '', phone: '', gender: '', age: '', department: '', preferred_time: '', symptoms: '' });
          onClose();
        }, 2500);
      } else {
        setError(data.message || '提交失败');
      }
    } catch {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-close" onClick={onClose}><X size={20} /></button>

        {success ? (
          <div className="booking-success">
            <div className="success-icon">✓</div>
            <h3>预约提交成功</h3>
            <p>我们会尽快与您联系，请保持电话畅通</p>
          </div>
        ) : (
          <>
            <h2 className="booking-title">在线预约</h2>
            <p className="booking-desc">请填写以下信息，我们将尽快与您联系</p>

            {error && <div className="booking-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="booking-row">
                <div className="booking-field">
                  <label>姓名 <span>*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="您的姓名" />
                </div>
                <div className="booking-field">
                  <label>手机号 <span>*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="您的手机号" />
                </div>
              </div>

              <div className="booking-row">
                <div className="booking-field">
                  <label>性别</label>
                  <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">请选择</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>
                <div className="booking-field">
                  <label>年龄</label>
                  <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="年龄" />
                </div>
              </div>

              <div className="booking-field">
                <label>预约科室</label>
                <select name="department" value={form.department} onChange={handleChange}>
                  <option value="">请选择科室</option>
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="booking-field">
                <label>期望就诊时间</label>
                <input name="preferred_time" value={form.preferred_time} onChange={handleChange} placeholder="如：下周一上午" />
              </div>

              <div className="booking-field">
                <label>症状简述</label>
                <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows="3" placeholder="请简要描述您的症状或需求..." />
              </div>

              <button type="submit" className="booking-submit" disabled={loading}>
                {loading ? '提交中...' : '提交预约'}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        .booking-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.2s ease;
          padding: 1rem;
        }
        .booking-modal {
          background: #fff; border-radius: 16px; padding: 2rem;
          width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto;
          position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease;
        }
        .booking-close {
          position: absolute; top: 16px; right: 16px;
          background: #f5f5f5; color: #666; border: none;
          border-radius: 50%; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .booking-close:hover { background: #e0e0e0; }

        .booking-title {
          font-size: 1.5rem; font-weight: 700;
          color: var(--color-primary, #0B3058); margin-bottom: 0.5rem;
        }
        .booking-desc {
          color: #666; font-size: 0.9rem; margin-bottom: 1.5rem;
        }
        .booking-error {
          background: #FEF2F2; color: #EF4444; padding: 0.75rem 1rem;
          border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem;
        }
        .booking-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .booking-field { margin-bottom: 1rem; }
        .booking-field label {
          display: block; font-size: 0.85rem; font-weight: 500;
          color: #333; margin-bottom: 0.4rem;
        }
        .booking-field label span { color: #EF4444; }
        .booking-field input,
        .booking-field select,
        .booking-field textarea {
          width: 100%; padding: 0.7rem 0.9rem; border: 1px solid #ddd;
          border-radius: 8px; font-size: 0.9rem; transition: border 0.2s;
          background: #fafafa; outline: none; box-sizing: border-box;
        }
        .booking-field input:focus,
        .booking-field select:focus,
        .booking-field textarea:focus {
          border-color: var(--color-primary, #0B3058);
          background: #fff;
        }
        .booking-submit {
          width: 100%; padding: 0.85rem; margin-top: 0.5rem;
          background: var(--color-primary, #0B3058); color: #fff;
          border: none; border-radius: 10px; font-size: 1rem;
          font-weight: 600; cursor: pointer; transition: all 0.3s;
        }
        .booking-submit:hover:not(:disabled) {
          background: var(--color-primary-dark, #092545); transform: translateY(-1px);
        }
        .booking-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .booking-success {
          text-align: center; padding: 3rem 1rem;
        }
        .success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: #10B981; color: #fff; font-size: 2rem;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .booking-success h3 {
          font-size: 1.3rem; color: var(--color-primary, #0B3058);
          margin-bottom: 0.5rem;
        }
        .booking-success p { color: #666; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @media (max-width: 480px) {
          .booking-row { grid-template-columns: 1fr; }
          .booking-modal { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
