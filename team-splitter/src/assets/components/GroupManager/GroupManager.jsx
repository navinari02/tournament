import React from 'react';
import './GroupManager.css';

function GroupManager({ savedGroups, onSaveGroup, onLoadGroup }) {
  return (
    <div className="group-card">
      <button className="btn-secondary" onClick={onSaveGroup}>
        💾 현재 명단 새 그룹으로 저장
      </button>
      {Object.keys(savedGroups).length > 0 && (
        <div className="select-wrapper">
          <select onChange={(e) => onLoadGroup(e.target.value)} defaultValue="">
            <option value="" disabled>📂 저장된 모임 불러오기</option>
            {Object.keys(savedGroups).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default GroupManager;