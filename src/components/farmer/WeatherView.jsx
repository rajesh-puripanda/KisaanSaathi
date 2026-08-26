import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, AlertTriangle, ShieldCheck, Calendar } from 'lucide-react';
import { CURRENT_WEATHER, FIVE_DAY_FORECAST } from '../../data/weatherData';
import TopBar from '../common/TopBar';
import { useLanguage } from '../../context/LanguageContext';

export default function WeatherView({ onBack }) {
  const { t } = useLanguage();
  const w = CURRENT_WEATHER;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 60px' }}>
      <TopBar title={t('topicWeather')} onBack={onBack} />

      {/* Hero Weather Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2B2118 0%, #3D3023 100%)',
          color: '#FAF4E6',
          borderRadius: 16,
          padding: '20px',
          marginBottom: 16,
          boxShadow: '0 8px 24px rgba(43,33,24,0.15)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: '#D8CBA8', fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Current Block Telemetry
            </div>
            <div style={{ fontSize: 13, color: '#FAF4E6', fontWeight: 600, marginTop: 2 }}>
              {w.location}
            </div>
          </div>
          <Sun size={36} color="#D9A441" />
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 0 6px' }}>
          <span className="mono" style={{ fontSize: 44, fontWeight: 700, color: '#D9A441' }}>
            {w.tempC}°C
          </span>
          <span style={{ fontSize: 16, color: '#D8CBA8' }}>
            {w.condition}
          </span>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
          marginTop: 16,
          paddingTop: 14,
          borderTop: '1px solid rgba(216,203,168,0.2)'
        }}>
          <div>
            <div style={{ color: '#D8CBA8', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Droplets size={12} /> Humidity
            </div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
              {w.humidity}%
            </div>
          </div>

          <div>
            <div style={{ color: '#D8CBA8', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Wind size={12} /> Wind
            </div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
              {w.windKmH} km/h
            </div>
          </div>

          <div>
            <div style={{ color: '#D8CBA8', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Thermometer size={12} /> Soil Moist
            </div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: '#FFD166', marginTop: 2 }}>
              {w.soilMoisture}
            </div>
          </div>
        </div>
      </div>

      {/* Rainfall Deficit Status */}
      <div
        style={{
          background: '#FAF4E6',
          border: '1px solid #D8CBA8',
          borderLeft: '6px solid #B8492E',
          borderRadius: 14,
          padding: '16px',
          marginBottom: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertTriangle size={18} color="#B8492E" />
            <span style={{ fontWeight: 700, fontSize: 15, color: '#2B2118' }}>
              Monsoon Rainfall Deficit: {w.rainfallDeficitPercent}%
            </span>
          </div>
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: '#B8492E' }}>
            CRITICAL
          </span>
        </div>

        <p style={{ fontSize: 13, color: '#6B5B45', lineHeight: 1.5, marginBottom: 12 }}>
          {w.advisoryAlert}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFDF9', padding: '10px 12px', borderRadius: 8, border: '1px solid #D8CBA8', fontSize: 12 }}>
          <div>
            <div style={{ color: '#8A7B68' }}>Normal Expected</div>
            <div className="mono" style={{ fontWeight: 700, color: '#2B2118' }}>{w.normalRainfallMm} mm</div>
          </div>
          <div>
            <div style={{ color: '#8A7B68' }}>Actual Received</div>
            <div className="mono" style={{ fontWeight: 700, color: '#B8492E' }}>{w.actualRainfallMm} mm</div>
          </div>
          <div>
            <div style={{ color: '#8A7B68' }}>Deficit Gap</div>
            <div className="mono" style={{ fontWeight: 700, color: '#B8492E' }}>-55 mm</div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 14, padding: '16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <Calendar size={16} color="#D9A441" />
          <span className="disp" style={{ fontWeight: 700, fontSize: 15, color: '#2B2118' }}>
            5-Day Agrometeorological Forecast
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FIVE_DAY_FORECAST.map((f, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: '#FFFDF9',
                border: '1px solid #D8CBA8',
                borderRadius: 8
              }}
            >
              <div style={{ width: 60, fontWeight: 700, fontSize: 13 }}>
                {f.day}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B5B45' }}>
                {f.pop >= 50 ? <CloudRain size={16} color="#6B8F5C" /> : <Sun size={16} color="#D9A441" />}
                <span>{f.condition}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: f.rainMm > 0 ? '#6B8F5C' : '#8A7B68' }} className="mono">
                  {f.rainMm} mm
                </span>
                <span className="mono" style={{ fontWeight: 700, fontSize: 13 }}>
                  {f.tempMax}° / {f.tempMin}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farm Action Plan */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 14, padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <ShieldCheck size={16} color="#6B8F5C" />
          <span className="disp" style={{ fontWeight: 700, fontSize: 15 }}>
            Recommended Agronomic Actions
          </span>
        </div>
        <ul style={{ fontSize: 13, color: '#6B5B45', lineHeight: 1.6, paddingLeft: 18 }}>
          <li>Postpone nitrogenous fertilizer broadcasting till Friday showers.</li>
          <li>Apply straw or plastic mulch around tomato beds to prevent evaporation.</li>
          <li>Use drip irrigation during morning hours (6:00 AM - 9:00 AM) to maximize water absorption.</li>
        </ul>
      </div>
    </div>
  );
}
