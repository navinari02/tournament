// 1. 랜덤 매칭 알고리즘
export function shuffleRandom(members, teamCount) {
  const shuffled = [...members].sort(() => Math.random() - 0.5);
  const teams = Array.from({ length: teamCount }, () => []);
  
  shuffled.forEach((member, index) => {
    teams[index % teamCount].push(member);
  });
  return teams;
}

// 2. 티어 기반 밸런스 매칭 알고리즘 (지그재그 분배)
export function balanceByTier(members, teamCount) {
  // 티어 내림차순 정렬 (별점 높은 순)
  const sorted = [...members].sort((a, b) => b.tier - a.tier);
  const teams = Array.from({ length: teamCount }, () => []);

  sorted.forEach((member, index) => {
    const round = Math.floor(index / teamCount);
    // 홀수 번째 라운드는 역순으로 배치하여 밸런스를 맞춤 (지그재그)
    const teamIndex = round % 2 === 0 ? (index % teamCount) : (teamCount - 1 - (index % teamCount));
    teams[teamIndex].push(member);
  });

  return teams;
}