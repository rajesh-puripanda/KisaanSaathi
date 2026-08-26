import React, { useState } from 'react';
import { ArrowLeft, User, Phone, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FARMERS } from '../../data/mockData';

export default function FarmerLogin({ onBack }) {
  const { loginFarmer } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [error, setError] = useState('');

  // Format 12-digit Aadhaar with spaces (XXXX XXXX XXXX)
  const handleAadhaarChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, ' ');
    setAadhaar(formatted);
  };

  const handleMobileChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(raw);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    const cleanAadhaar = aadhaar.replace(/\s+/g, '');
    if (cleanAadhaar.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setError('');
    loginFarmer({
      name: name.trim(),
      mobile: mobile.trim(),
      aadhaar: aadhaar.trim()
    });
  };

  const fillDemo = (farmer) => {
    setName(farmer.name);
    setMobile(farmer.mobile);
    setAadhaar(farmer.aadhaar);
    setError('');
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
        borderRadius: 16,
        padding: '24px 20px',
        boxShadow: '0 4px 16px rgba(43,33,24,0.06)'
      }}>
        <div style={{
          position: 'relative',
          height: 110,
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 16
        }}>
          <img
            src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80"
            alt="Kisan Login"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(43,33,24,0.9) 0%, rgba(43,33,24,0.3) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 12
          }}>
            <div>
              <span style={{ background: '#D9A441', color: '#2B2118', fontSize: 10, fontWeight: 800, padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase' }}>
                Secure Farmer Access
              </span>
              <h2 className="disp" style={{ fontSize: 20, fontWeight: 700, color: '#FAF4E6', marginTop: 2 }}>
                {t('farmerLoginTitle')}
              </h2>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: '#6B5B45', marginBottom: 18, textAlign: 'center' }}>
          {t('farmerLoginSub')}
        </p>

        {error && (
          <div style={{
            background: '#FDE8E8',
            border: '1px solid #F05252',
            color: '#B8492E',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 13,
            marginBottom: 16
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2B2118', marginBottom: 6 }}>
              {t('fullName')} *
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#8A7B68" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
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
              {t('mobileNumber')} *
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} color="#8A7B68" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                placeholder={t('mobilePlaceholder')}
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
              {t('aadhaarNumber')} (12 Digits) *
            </label>
            <div style={{ position: 'relative' }}>
              <CreditCard size={18} color="#8A7B68" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="text"
                value={aadhaar}
                onChange={handleAadhaarChange}
                placeholder={t('aadhaarPlaceholder')}
                className="mono"
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 40px',
                  borderRadius: 10,
                  border: '1px solid #D8CBA8',
                  background: '#FFFDF9',
                  fontSize: 14,
                  letterSpacing: 1,
                  color: '#2B2118'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: 10,
              background: '#D9A441',
              color: '#2B2118',
              padding: '13px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(217,164,65,0.3)'
            }}
          >
            <CheckCircle2 size={18} />
            <span>{t('loginBtn')}</span>
          </button>
        </form>

        {/* Demo profiles for quick testing */}
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #D8CBA8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#8A7B68', marginBottom: 10, textTransform: 'uppercase' }}>
            <Sparkles size={14} color="#D9A441" />
            <span>{t('demoLogins')}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FARMERS.slice(0, 3).map((f) => (
              <button
                key={f.id}
                onClick={() => fillDemo(f)}
                style={{
                  background: '#FFFDF9',
                  border: '1px solid #D8CBA8',
                  borderRadius: 8,
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong>{f.name}</strong> ({f.crop}, {f.village})
                </div>
                <span style={{ color: '#D9A441', fontWeight: 600 }}>Fill Data ➔</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
