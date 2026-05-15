import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = React.forwardRef(({ resultTeams, isBalanceMode, onDownloadImage }, ref) => {
  if (resultTeams.length === 0) return null;

  // 카드별 화사한 테마 컬러 배열
  const themes = ['card-blue', 'card-purple', 'card-emerald', 'card-orange', 'card-rose'];

  return (
    <div className="result-section">
      <div className="capture-area" ref={ref}>
        <div className="capture-header">
          <h3>⚡ TEAM MATCHING RESULT</h3>
          <p>{new Date().toLocaleDateString()} 모임 팀 배치표</p>
        </div>
        <div className="team-grid-layout">
          {resultTeams.map((team, tIdx) => (
            <div key={tIdx} className={`team-gradient-card ${themes[tIdx % themes.length]}`}>
              <div className="team-card-title">{tIdx + 1} TEAM</div>
              <div className="team-score">
                {isBalanceMode && `전력 지수: ${team.reduce((sum, m) => sum + m.tier, 0)}p`}
              </div>
              <ul className="team-member-ul">
                {team.map((m, mIdx) => (
                  <li key={mIdx}>
                    <span>{m.name}</span>
                    {isBalanceMode && <span className="mini-badge">★{m.tier}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <button className="btn-download" onClick={onDownloadImage}>
        🖼️ 결과를 이미지 카드 파일로 저장
      </button>
    </div>
  );
});

export default ResultDisplay;