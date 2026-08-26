import React, { useState } from 'react';
import { ShieldCheck, MapPin, Search, ChevronRight, AlertTriangle, CloudRain, TrendingDown, Users } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FARMERS, MANDI_TREND } from '../../data/mockData';
import TopBar from '../common/TopBar';
import StatCard from '../common/StatCard';
import Chip from '../common/Chip';
import { riskColor, riskLabel } from '../common/Gauge';
import RegionalWeatherMap from './RegionalWeatherMap';
import { useLanguage } from '../../context/LanguageContext';

export default function OfficerDashboard({ onSelectFarmer }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const highRiskCount = FARMERS.filter(f => f.score >= 66).length;
  const villageCount = new Set(FARMERS.map(f => f.village)).size;

  const sorted = [...FARMERS].sort((a, b) => b.score - a.score);
  const filtered = sorted
    .filter(f => filter === 'All' || riskLabel(f.score) === filter)
    .filter(f =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.crop.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '16px 18px 60px' }}>
      <TopBar title={t('officerDashboard')} />

      {/* Top Stat Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 18 }}>
        <StatCard
          label={t('trackedFarmers')}
          value={FARMERS.length}
          icon={<Users size={18} color="#2B2118" />}
        />
        <StatCard
          label={t('highRiskCases')}
          value={highRiskCount}
          color="#B8492E"
          icon={<AlertTriangle size={18} color="#B8492E" />}
        />
        <StatCard
          label={t('monitoredVillages')}
          value={villageCount}
          icon={<MapPin size={18} color="#6B8F5C" />}
        />
      </div>

      {/* Regional Block Weather Radar */}
      <RegionalWeatherMap />

      {/* Mandi Price Gluts Radar */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 16, padding: '18px 16px', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <TrendingDown size={18} color="#B8492E" />
            <h3 className="disp" style={{ fontSize: 16, fontWeight: 700, color: '#2B2118' }}>
              Wholesale Mandi Volatility Index
            </h3>
          </div>
          <span style={{ fontSize: 11, color: '#B8492E', fontWeight: 600 }}>Tomato -50% (Distress Alert)</span>
        </div>

        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={MANDI_TREND} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8CBA8" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#6B5B45" />
            <YAxis tick={{ fontSize: 11 }} stroke="#6B5B45" />
            <Tooltip />
            <Line type="monotone" dataKey="tomato" stroke="#B8492E" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="onion" stroke="#C97D34" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="wheat" stroke="#6B8F5C" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Farmer Roster Section */}
      <div style={{ background: '#FAF4E6', border: '1px solid #D8CBA8', borderRadius: 16, padding: '18px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <h3 className="disp" style={{ fontSize: 17, fontWeight: 700, color: '#2B2118' }}>
            Farmer Distress Watchlist
          </h3>

          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'High', 'Medium', 'Low'].map((f) => (
              <Chip key={f} active={filter === f} onClick={() => setFilter(f)} label={f} />
            ))}
          </div>
        </div>

        {/* Search filter */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Search size={16} color="#8A7B68" style={{ position: 'absolute', left: 12, top: 11 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search farmer name, village, or crop..."
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: 8,
              border: '1px solid #D8CBA8',
              background: '#FFFDF9',
              fontSize: 13
            }}
          />
        </div>

        {/* Farmer list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((f) => (
            <button
              key={f.id}
              onClick={() => onSelectFarmer(f)}
              className="card-hover"
              style={{
                background: '#FFFDF9',
                border: '1px solid #D8CBA8',
                borderLeft: `6px solid ${riskColor(f.score)}`,
                borderRadius: 10,
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#2B2118' }}>
                  {f.name}
                </div>
                <div style={{ fontSize: 12, color: '#6B5B45', display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  <MapPin size={12} /> {f.village} • {f.crop} ({f.acres} Acres)
                </div>
                <div style={{ fontSize: 11, color: '#8A7B68', marginTop: 2 }}>
                  Rainfall Deficit: {f.rainfallDeficit}% • Loan due: {f.loanDueDays} days
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: riskColor(f.score) }}>
                    {f.score}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: riskColor(f.score), textTransform: 'uppercase' }}>
                    {riskLabel(f.score)}
                  </div>
                </div>
                <ChevronRight size={18} color="#8A7B68" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
