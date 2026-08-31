import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, MapPin, Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function OfficerLogin({ onBack }) {
  const { loginOfficer } = useAuth();
  const { t } = useLanguage();

  const [officerId, setOfficerId] = useState('DAO-OD-7042');
  const [district, setDistrict] = useState('Khurda District (Odisha)');
  const [designation, setDesignation] = useState('District Agriculture Officer (DAO)');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginOfficer({
      officerId,
      name: "Dr. S. K. Mohapatra",
      district,
      designation
    });
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 20px 48px' }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: '#6B5B45',
          fontSize: 14,
          marginBottom: 20
        }}
      >
        <ArrowLeft size={18} />
        <span>Back to Portal Selection</span>
      </button>

      <div style={{
        background: '#FAF4E6',
        border: '1px solid #D8CBA8',
        borderTop: '6px solid #2B2118',
        borderRadius: 16,
        padding: '24px 20px',
        boxShadow: '0 4px 16px rgba(43,33,24,0.06)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 className="disp" style={{ fontSize: 24, fontWeight: 700, color: '#2B2118' }}>
            {t('officerLoginTitle')}
          </h2>
          <p style={{ fontSize: 13, color: '#6B5B45', marginTop: 4 }}>
            {t('officerLoginSub')}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2B2118', marginBottom: 6 }}>
              {t('officerId')}
            </label>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={18} color="#8A7B68" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                className="mono"
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 40px',
                  borderRadius: 10,
                  border: '1px solid #D8CBA8',
                  background: '#FFFDF9',
                  fontSize: 14,
                  color: '#2B2118'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2B2118', marginBottom: 6 }}>
              {t('district')}
            </label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} color="#8A7B68" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 40px',
                  borderRadius: 10,
                  border: '1px solid #D8CBA8',
                  background: '#FFFDF9',
                  fontSize: 14,
                  color: '#2B2118'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2B2118', marginBottom: 6 }}>
              {t('designation')}
            </label>
            <div style={{ position: 'relative' }}>
              <Briefcase size={18} color="#8A7B68" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 40px',
                  borderRadius: 10,
                  border: '1px solid #D8CBA8',
                  background: '#FFFDF9',
                  fontSize: 14,
                  color: '#2B2118'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: 10,
              background: '#2B2118',
              color: '#FAF4E6',
              padding: '13px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(43,33,24,0.25)'
            }}
          >
            <CheckCircle2 size={18} color="#D9A441" />
            <span>Open Command Console</span>
          </button>
        </form>

        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #D8CBA8', fontSize: 12, color: '#8A7B68', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={14} color="#D9A441" />
          <span>Real-time Sentinel satellite telemetry + IMD rainfall deficit link enabled.</span>
        </div>
      </div>
    </div>
  );
}
