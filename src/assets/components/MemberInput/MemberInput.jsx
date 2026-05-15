import React from 'react';
import './MemberInput.css';

function MemberInput({ 
  inputName, setInputName, onAddMember, 
  teamCount, setTeamCount, isBalanceMode, setIsBalanceMode 
}) {
  return (
    <div className="input-card">
      <div className="input-row">
        <input 
          type="text" 
          value={inputName} 
          onChange={(e) => setInputName(e.target.value)} 
          placeholder="참가자 이름 입력 후 엔터"
          onKeyDown={(e) => e.key === 'Enter' && onAddMember()}
        />
        <button className="btn-add" onClick={onAddMember}>추가</button>
      </div>

      <div className="settings-row">
        <div className="setting-item">
          <span className="label">목표 팀 수</span>
          <div className="stepper">
            <button onClick={() => setTeamCount(Math.max(2, teamCount - 1))}>-</button>
            <span>{teamCount}개 팀</span>
            <button onClick={() => setTeamCount(Math.min(8, teamCount + 1))}>+</button>
          </div>
        </div>
        
        <div className="setting-item">
          <span className="label">매칭 방식</span>
          <div className="toggle-group">
            <button 
              className={isBalanceMode ? "active" : ""} 
              onClick={() => setIsBalanceMode(true)}
            >
              ⚖️ 밸런스
            </button>
            <button 
              className={!isBalanceMode ? "active" : ""} 
              onClick={() => setIsBalanceMode(false)}
            >
              🎲 랜덤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberInput;