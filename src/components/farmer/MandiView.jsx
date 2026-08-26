import React, { useState } from 'react';
import { TrendingDown, MapPin, AlertCircle, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { MANDI_TREND, MANDI_COMPARISON } from '../../data/mockData';
import TopBar from '../common/TopBar';
import Chip from '../common/Chip';
import { useLanguage } from '../../context/LanguageContext';

export default function MandiView({ onBack }) {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('tomato');

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 60px' }}>
      <TopBar title={t('topicMarket')} onBack={onBack} />

      {/* Mandi Chart Card */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 16, padding: '18px 16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8A7B68', textTransform: 'uppercase' }}>
              AGMARKNET Live Feeds
            </div>
            <h3 className="disp" style={{ fontSize: 16, fontWeight: 700, color: '#2B2118' }}>
              7-Day Price Trend (₹/kg)
            </h3>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {['tomato', 'onion', 'wheat'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedCrop(c)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  background: selectedCrop === c ? '#2B2118' : '#FAF4E6',
                  color: selectedCrop === c ? '#FAF4E6' : '#6B5B45',
                  border: '1px solid #D8CBA8'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={190}>
          <LineChart data={MANDI_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8CBA8" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#6B5B45" />
            <YAxis tick={{ fontSize: 11 }} stroke="#6B5B45" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={selectedCrop}
              stroke={selectedCrop === 'tomato' ? '#B8492E' : selectedCrop === 'onion' ? '#C97D34' : '#6B8F5C'}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Warning Banner */}
        <div style={{ marginTop: 12, background: '#FDE8E8', border: '1px solid #F05252', borderRadius: 8, padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#B8492E' }}>
          <TrendingDown size={18} />
          <span>Tomato wholesale price dropped 50% locally this week due to local oversupply.</span>
        </div>
      </div>

      {/* Comparison Across Nearby Markets */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 16, padding: '18px 16px' }}>
        <h3 className="disp" style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
          Compare Nearby Mandis
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MANDI_COMPARISON.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFDF9',
                border: '1px solid #D8CBA8',
                borderRadius: 10,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#2B2118' }}>{m.mandi}</div>
                <div style={{ fontSize: 11, color: '#8A7B68', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <MapPin size={11} /> {m.distanceKm} km away
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: m.tomatoPrice >= 14 ? '#6B8F5C' : '#B8492E' }}>
                  ₹{m.tomatoPrice}/kg
                </div>
                <div style={{ fontSize: 11, color: '#6B5B45' }}>
                  Tomato Rate
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
