// Admin page - full control
let timerInterval = null;

function updateTimerDisplay() {
    const state = getTimerState();
    let seconds = state.seconds;
    
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

function startTimer() {
    const state = getTimerState();
    if (state.isRunning || state.seconds <= 0) return;
    setTimerState(state.seconds, true);
    updateTimerDisplay();
}

function pauseTimer() {
    const state = getTimerState();
    if (!state.isRunning) return;
    
    const elapsed = Math.floor((Date.now() - state.lastUpdate) / 1000);
    const remaining = Math.max(0, state.seconds - elapsed);
    setTimerState(remaining, false);
    updateTimerDisplay();
}

function resetTimer() {
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const totalSeconds = (hours * 60 * 60) + (minutes * 60);
    setTimerState(totalSeconds || 3 * 60 * 60, false);
    updateTimerDisplay();
}

function setTimer() {
    resetTimer();
}

// Leaderboard Functions
function renderLeaderboard() {
    const teams = getTeams();
    const sorted = [...teams].sort((a, b) => b.score - a.score);
    const body = document.getElementById('leaderboardBody');
    
    body.innerHTML = sorted.map((team, i) => {
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
        return `
            <div class="team-row ${rankClass}">
                <span class="rank">${medal}</span>
                <span class="name">${team.name}</span>
                <span class="mission">${team.mission}</span>
                <span class="score">${team.score}</span>
                <span class="actions">
                    <div class="quick-points">
                        <button class="btn-add" onclick="addPoints('${team.name}', 5)">+5</button>
                        <button class="btn-add" onclick="addPoints('${team.name}', 10)">+10</button>
                        <button class="btn-sub" onclick="addPoints('${team.name}', -5)">-5</button>
                        <input type="number" class="score-input" id="custom-${i}" placeholder="±" onkeypress="handleCustomScore(event, '${team.name}', ${i})">
                        <button class="btn-del" onclick="deleteTeam('${team.name}')">🗑️</button>
                    </div>
                </span>
            </div>
        `;
    }).join('');
}


function handleCustomScore(event, teamName, index) {
    if (event.key === 'Enter') {
        const input = document.getElementById(`custom-${index}`);
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            addPoints(teamName, value);
            input.value = '';
        }
    }
}

function addOrUpdateTeam(e) {
    e.preventDefault();
    const teams = getTeams();
    const name = document.getElementById('teamName').value.trim();
    const score = parseInt(document.getElementById('teamScore').value) || 0;
    const mission = document.getElementById('teamMission').value;
    
    const existing = teams.findIndex(t => t.name.toLowerCase() === name.toLowerCase());
    if (existing >= 0) {
        teams[existing].score = score;
        teams[existing].mission = mission;
    } else {
        teams.push({ name, score, mission });
    }
    
    saveTeams(teams);
    renderLeaderboard();
    document.getElementById('teamForm').reset();
}

function addPoints(teamName, points) {
    const teams = getTeams();
    const team = teams.find(t => t.name === teamName);
    if (team) {
        team.score = Math.max(0, team.score + points);
        saveTeams(teams);
        renderLeaderboard();
    }
}

function deleteTeam(teamName) {
    if (confirm(`Hapus tim "${teamName}"?`)) {
        let teams = getTeams();
        teams = teams.filter(t => t.name !== teamName);
        saveTeams(teams);
        renderLeaderboard();
    }
}

function clearAllTeams() {
    if (confirm('Hapus semua data tim?')) {
        saveTeams([]);
        renderLeaderboard();
    }
}

function exportData() {
    const teams = getTeams();
    const data = {
        timestamp: new Date().toISOString(),
        teams: [...teams].sort((a, b) => b.score - a.score)
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leaderboard-${new Date().toLocaleDateString('id-ID')}.json`;
    a.click();
}

// Auto-refresh timer display
setInterval(updateTimerDisplay, 500);

// Initialize
updateTimerDisplay();
renderLeaderboard();
