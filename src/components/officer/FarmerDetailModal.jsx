import React, { useState } from 'react';
import { MapPin, Phone, CreditCard, Sprout, AlertTriangle, ShieldCheck, CheckCircle2, UserCheck, X } from 'lucide-react';
import Gauge, { riskColor, riskLabel } from '../common/Gauge';
import TopBar from '../common/TopBar';

export default function FarmerDetailModal({ farmer, onBack }) {
  const [escalated, setEscalated] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  if (!farmer) return null;

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '16px 16px 60px' }}>
      <TopBar title={farmer.name} onBack={onBack} />

      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 16, padding: '20px', textAlign: 'center', marginBottom: 16 }}>
        <Gauge score={farmer.score} size={170} />
        <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: riskColor(farmer.score), marginTop: 4 }}>
          {riskLabel(farmer.score)} Risk • {farmer.score}/100
        </div>
      </div>

      {/* Profile Details */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #D8CBA8', fontSize: 13 }}>
          <span style={{ color: '#6B5B45', display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={14} /> Village / Block
          </span>
          <span style={{ fontWeight: 600 }}>{farmer.village}, {farmer.district || 'Khurda'}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #D8CBA8', fontSize: 13 }}>
          <span style={{ color: '#6B5B45', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sprout size={14} /> Primary Crop & Land
          </span>
          <span style={{ fontWeight: 600 }}>{farmer.crop} ({farmer.acres || 2.5} Acres)</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #D8CBA8', fontSize: 13 }}>
          <span style={{ color: '#6B5B45', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Phone size={14} /> Mobile Contact
          </span>
          <span className="mono" style={{ fontWeight: 600 }}>+91 {farmer.mobile}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
          <span style={{ color: '#6B5B45', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CreditCard size={14} /> Aadhaar Hash
          </span>
          <span className="mono" style={{ fontWeight: 600 }}>{farmer.aadhaar}</span>
        </div>
      </div>

      {/* Distress Risk Metrics */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 14, padding: '16px', marginBottom: 16 }}>
        <h4 className="disp" style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
          Composite Stress Metrics
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFDF9', border: '1px solid #D8CBA8', borderRadius: 8, padding: '10px 12px' }}>
            <span style={{ fontSize: 13, color: '#6B5B45' }}>Rainfall Deficit vs Normal</span>
            <span className="mono" style={{ fontWeight: 700, color: farmer.rainfallDeficit > 25 ? '#B8492E' : '#6B8F5C' }}>
              {farmer.rainfallDeficit}%
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFDF9', border: '1px solid #D8CBA8', borderRadius: 8, padding: '10px 12px' }}>
            <span style={{ fontSize: 13, color: '#6B5B45' }}>Crop Wholesale Price Drop</span>
            <span className="mono" style={{ fontWeight: 700, color: farmer.priceDrop > 25 ? '#B8492E' : '#6B8F5C' }}>
              {farmer.priceDrop}%
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFDF9', border: '1px solid #D8CBA8', borderRadius: 8, padding: '10px 12px' }}>
            <span style={{ fontSize: 13, color: '#6B5B45' }}>Short-Term Debt Due In</span>
            <span className="mono" style={{ fontWeight: 700, color: farmer.loanDueDays < 10 ? '#B8492E' : '#C97D34' }}>
              {farmer.loanDueDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={() => setEscalated(true)}
          disabled={escalated}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: 10,
            background: escalated ? '#6B8F5C' : '#B8492E',
            color: '#FFF',
            fontWeight: 700,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 4px 12px rgba(184,73,46,0.25)'
          }}
        >
          {escalated ? (
            <>
              <CheckCircle2 size={18} />
              <span>Escalated to District Collectorate Emergency Fund ✓</span>
            </>
          ) : (
            <>
              <AlertTriangle size={18} />
              <span>Escalate to District Relief Fund</span>
            </>
          )}
        </button>

        <button
          onClick={() => setDispatched(true)}
          disabled={dispatched}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 10,
            background: dispatched ? '#FAF4E6' : '#2B2118',
            color: dispatched ? '#6B8F5C' : '#FAF4E6',
            border: dispatched ? '1.5px solid #6B8F5C' : 'none',
            fontWeight: 600,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          {dispatched ? (
            <>
              <CheckCircle2 size={16} />
              <span>Field Officer Assigned & Dispatched to Village ✓</span>
            </>
          ) : (
            <>
              <UserCheck size={16} color="#D9A441" />
              <span>Dispatch Village Agriculture Worker (VAW)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
