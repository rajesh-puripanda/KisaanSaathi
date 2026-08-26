import React, { useState } from 'react';
import { Calendar, AlertCircle, ShieldAlert, CheckCircle2, FileText, ArrowRight, Percent } from 'lucide-react';
import TopBar from '../common/TopBar';
import { useLanguage } from '../../context/LanguageContext';

export default function LoansView({ farmer, onBack }) {
  const { t } = useLanguage();
  const [moratoriumApplied, setMoratoriumApplied] = useState(false);

  const loans = farmer && farmer.loans ? farmer.loans : [
    { id: "L-101", name: "KCC Crop Loan - Balipatna PGB", amount: 45000, dueDays: 5, rate: "4% (Subsidized)", status: "Critical" },
    { id: "L-102", name: "Drip Irrigation Term Loan - SBI", amount: 18000, dueDays: 45, rate: "7%", status: "Normal" }
  ];

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 60px' }}>
      <TopBar title={t('topicLoans')} onBack={onBack} />

      {/* Active Loans List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        {loans.map((l) => {
          const isUrgent = l.dueDays <= 7;
          return (
            <div
              key={l.id}
              style={{
                background: '#FAF4E6',
                border: '1px solid #D8CBA8',
                borderLeft: `6px solid ${isUrgent ? '#B8492E' : '#6B8F5C'}`,
                borderRadius: 14,
                padding: '16px',
                boxShadow: '0 2px 8px rgba(43,33,24,0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#2B2118' }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: '#6B5B45', marginTop: 2 }}>
                    Interest: {l.rate}
                  </div>
                </div>

                <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: '#2B2118' }}>
                  ₹{l.amount.toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{
                marginTop: 12,
                paddingTop: 10,
                borderTop: '1px solid #D8CBA8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                  <Calendar size={15} color={isUrgent ? '#B8492E' : '#6B8F5C'} />
                  <span style={{ color: isUrgent ? '#B8492E' : '#6B5B45', fontWeight: isUrgent ? 700 : 500 }}>
                    Due in <strong className="mono">{l.dueDays} days</strong>
                  </span>
                </div>

                {isUrgent && (
                  <span style={{ background: '#FDE8E8', color: '#B8492E', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>
                    IMMEDIATE ACTION
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interest Subvention Information */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 14, padding: '16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Percent size={16} color="#D9A441" />
          <h4 className="disp" style={{ fontWeight: 700, fontSize: 15 }}>
            3% Govt Prompt Repayment Benefit
          </h4>
        </div>
        <p style={{ fontSize: 13, color: '#6B5B45', lineHeight: 1.5 }}>
          If your KCC loan of ₹45,000 is settled on or before the due date, Central Govt deposits 3% subvention, reducing your interest to <strong>only 4% p.a.</strong> (saving ₹1,350).
        </p>
      </div>

      {/* Distress Relief Application */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 14, padding: '16px' }}>
        <h4 className="disp" style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
          Drought / Price-Drop Loan Restructure
        </h4>
        <p style={{ fontSize: 13, color: '#6B5B45', lineHeight: 1.5, marginBottom: 14 }}>
          RBI relief guidelines allow smallholders facing &gt;33% rainfall deficit to convert short-term crop loans into a 3-year term loan with a 1-year moratorium.
        </p>

        <button
          onClick={() => setMoratoriumApplied(true)}
          disabled={moratoriumApplied}
          style={{
            width: '100%',
            background: moratoriumApplied ? '#6B8F5C' : '#2B2118',
            color: '#FAF4E6',
            padding: '12px',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          {moratoriumApplied ? (
            <>
              <CheckCircle2 size={18} />
              <span>Moratorium Application Submitted to Lead Bank ✓</span>
            </>
          ) : (
            <>
              <FileText size={18} color="#D9A441" />
              <span>Apply for 1-Year Loan Moratorium</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
