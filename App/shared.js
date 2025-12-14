// Shared storage keys
const STORAGE_KEYS = {
    TEAMS: 'hackathonTeams',
    TIMER_SECONDS: 'hackathonTimerSeconds',
    TIMER_RUNNING: 'hackathonTimerRunning',
    TIMER_LAST_UPDATE: 'hackathonTimerLastUpdate'
};

// Timer Functions
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function getTimerState() {
    const seconds = parseInt(localStorage.getItem(STORAGE_KEYS.TIMER_SECONDS)) || 3 * 60 * 60;
    const isRunning = localStorage.getItem(STORAGE_KEYS.TIMER_RUNNING) === 'true';
    const lastUpdate = parseInt(localStorage.getItem(STORAGE_KEYS.TIMER_LAST_UPDATE)) || Date.now();
    return { seconds, isRunning, lastUpdate };
}

function setTimerState(seconds, isRunning) {
    localStorage.setItem(STORAGE_KEYS.TIMER_SECONDS, seconds);
    localStorage.setItem(STORAGE_KEYS.TIMER_RUNNING, isRunning);
    localStorage.setItem(STORAGE_KEYS.TIMER_LAST_UPDATE, Date.now());
}

function getTeams() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAMS)) || [];
}

function saveTeams(teams) {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
}
