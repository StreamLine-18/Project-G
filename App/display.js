// Display page - read-only, auto-refresh
let lastTeamsHash = '';

function updateTimerDisplay() {
    const state = getTimerState();
    let seconds = state.seconds;
    
    // Calculate elapsed time if running
    if (state.isRunning) {
        const elapsed = Math.floor((Date.now() - state.lastUpdate) / 1000);
        seconds = Math.max(0, seconds - elapsed);
    }
    
    const timerEl = document.getElementById('timer');
    const statusEl = document.getElementById('timerStatus');
    
    timerEl.textContent = formatTime(seconds);
    
    timerEl.classList.remove('warning', 'danger');
    if (seconds <= 300) timerEl.classList.add('danger');
    else if (seconds <= 900) timerEl.classList.add('warning');
    
    if (state.isRunning && seconds > 0) {
        statusEl.textContent = '▶ RUNNING';
        statusEl.className = 'timer-status running';
    } else if (seconds <= 0) {
        statusEl.textContent = '⏰ TIME UP!';
        statusEl.className = 'timer-status danger';
    } else {
        statusEl.textContent = '⏸ PAUSED';
        statusEl.className = 'timer-status';
    }
}

function renderLeaderboard() {
    const teams = getTeams();
    const sorted = [...teams].sort((a, b) => b.score - a.score);
    const body = document.getElementById('leaderboardBody');
    
    // Check if data changed
    const hash = JSON.stringify(sorted);
    if (hash === lastTeamsHash) return;
    lastTeamsHash = hash;
    
    body.innerHTML = sorted.map((team, i) => {
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
        return `
            <div class="team-row ${rankClass}">
                <span class="rank">${medal}</span>
                <span class="name">${team.name}</span>
                <span class="mission">${team.mission}</span>
                <span class="score">${team.score}</span>
            </div>
        `;
    }).join('');
}

// Auto-refresh every 500ms
setInterval(() => {
    updateTimerDisplay();
    renderLeaderboard();
}, 500);

// Initial render
updateTimerDisplay();
renderLeaderboard();
