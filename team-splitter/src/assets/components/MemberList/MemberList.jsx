import React from 'react';
import './MemberList.css';

function MemberList({ members, isBalanceMode, onToggleSelect, onChangeTier }) {
  if (members.length === 0) {
    return <div className="empty-state">인원을 추가하거나 모임을 불러오세요.</div>;
  }

  return (
    <div className="list-container">
      <div className="list-header">참석 명단 ({members.filter(m => m.isSelected).length}명 선택됨)</div>
      <div className="scroll-box">
        {members.map((member, index) => (
          <div key={index} className={`member-row ${!member.isSelected ? 'disabled' : ''}`}>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={member.isSelected} 
                onChange={() => onToggleSelect(index)} 
              />
              <span className="name-text">{member.name}</span>
            </label>
            
            {isBalanceMode && member.isSelected && (
              <div className="tier-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${member.tier >= star ? 'filled' : ''}`}
                    onClick={() => onChangeTier(index, star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberList;