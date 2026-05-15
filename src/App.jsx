import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { shuffleRandom, balanceByTier } from './utils/balancer';

import GroupManager from './components/GroupManager/GroupManager';
import TeamSettings from './components/MemberInput/MemberInput';
import MemberList from './components/MemberList/MemberList';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';

function App() {
  const [members, setMembers] = useState([]);
  const [inputName, setInputName] = useState('');
  const [teamCount, setTeamCount] = useState(2);
  const [isBalanceMode, setIsBalanceMode] = useState(true);
  const [savedGroups, setSavedGroups] = useState({});
  const [resultTeams, setResultTeams] = useState([]);
  
  const resultRef = useRef(null);

  useEffect(() => {
    const groups = localStorage.getItem('saved_groups');
    if (groups) setSavedGroups(JSON.parse(groups));
  }, []);

  const addMember = () => {
    if (!inputName.trim()) return;
    setMembers([...members, { name: inputName.trim(), tier: 3, isSelected: true }]);
    setInputName('');
  };

  const changeTier = (index, tier) => {
    const updated = [...members];
    updated[index].tier = tier;
    setMembers(updated);
  };

  const toggleSelect = (index) => {
    const updated = [...members];
    updated[index].isSelected = !updated[index].isSelected;
    setMembers(updated);
  };

  const saveGroup = () => {
    if (members.length === 0) return;
    const groupName = prompt('그룹 이름을 입력해 주세요:');
    if (!groupName) return;

    const updatedGroups = { ...savedGroups, [groupName]: members };
    setSavedGroups(updatedGroups);
    localStorage.setItem('saved_groups', JSON.stringify(updatedGroups));
  };

  const loadGroup = (groupName) => {
    setMembers(savedGroups[groupName]);
  };

  const handleSplitTeams = () => {
    const activeMembers = members.filter((m) => m.isSelected);
    if (activeMembers.length === 0) return alert('선택된 참가자가 없습니다.');

    const teams = isBalanceMode 
      ? balanceByTier(activeMembers, teamCount) 
      : shuffleRandom(activeMembers, teamCount);
    
    setResultTeams(teams);
  };

  const downloadImage = () => {
    if (!resultRef.current) return;
    html2canvas(resultRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = `team-result-${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <header style={{ margin: '12px 0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>⚡ 원클릭 팀 매칭 시스템</h1>
      </header>
      
      <GroupManager savedGroups={savedGroups} onSaveGroup={saveGroup} onLoadGroup={loadGroup} />
      <TeamSettings 
        inputName={inputName} setInputName={setInputName} onAddMember={addMember}
        teamCount={teamCount} setTeamCount={setTeamCount}
        isBalanceMode={isBalanceMode} setIsBalanceMode={setIsBalanceMode}
      />
      <MemberList members={members} isBalanceMode={isBalanceMode} onToggleSelect={toggleSelect} onChangeTier={changeTier} />

      <button 
        style={{
          width: '100%', padding: '16px', background: 'var(--primary)', color: 'white',
          fontSize: '18px', fontWeight: '700', borderRadius: 'var(--radius)', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
        }} 
        onClick={handleSplitTeams}
      >
        🚀 공정하게 팀 나누기 시작!
      </button>

      <ResultDisplay ref={resultRef} resultTeams={resultTeams} isBalanceMode={isBalanceMode} onDownloadImage={downloadImage} />
    </div>
  );
}

export default App;