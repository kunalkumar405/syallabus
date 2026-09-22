/**
 * Class 12th Exam Tracker - Enhanced JavaScript Application
 * Features:
 * - Mission Board Exams Tracker (37 chapters, Feb 1st countdown)
 * - Half Yearly Exams Tracker (19 selected chapters, Oct 15 2026 countdown)
 * - Independent LocalStorage Persistence
 * - Enhanced Deep Focus Study Session (Presets, Progress Bar, Audio Chimes, WakeLock)
 * - Advanced Study Analytics (7-Day Chart, Streak Calculation, Weekly Total, Daily Average)
 * - Interactive Chapter Search & Quick Filter
 * - Native PWA Installation Support with Custom Branding
 */

// ============================================================================
// 1. SYLLABUS DEFINITIONS
// ============================================================================

// Full Board Exam Syllabus (37 Chapters Total)
const boardSyllabus = {
    physics: [
        { id: "phy-1", chNum: 1, name: "Electric Charges and Fields" },
        { id: "phy-2", chNum: 2, name: "Electrostatic Potential and Capacitance" },
        { id: "phy-3", chNum: 3, name: "Current Electricity" },
        { id: "phy-4", chNum: 4, name: "Moving Charges and Magnetism" },
        { id: "phy-5", chNum: 5, name: "Magnetism and Matter" },
        { id: "phy-6", chNum: 6, name: "Electromagnetic Induction" },
        { id: "phy-7", chNum: 7, name: "Alternating Current" },
        { id: "phy-8", chNum: 8, name: "Electromagnetic Waves" },
        { id: "phy-9", chNum: 9, name: "Ray Optics and Optical Instruments" },
        { id: "phy-10", chNum: 10, name: "Wave Optics" },
        { id: "phy-11", chNum: 11, name: "Dual Nature of Radiation and Matter" },
        { id: "phy-12", chNum: 12, name: "Atoms" },
        { id: "phy-13", chNum: 13, name: "Nuclei" },
        { id: "phy-14", chNum: 14, name: "Semiconductor Electronics" }
    ],
    chemistry: [
        { id: "chem-1", chNum: 1, name: "Solutions" },
        { id: "chem-2", chNum: 2, name: "Electrochemistry" },
        { id: "chem-3", chNum: 3, name: "Chemical Kinetics" },
        { id: "chem-4", chNum: 4, name: "d -and f -Block Elements" },
        { id: "chem-5", chNum: 5, name: "Coordination Compounds" },
        { id: "chem-6", chNum: 6, name: "Haloalkanes and Haloarenes" },
        { id: "chem-7", chNum: 7, name: "Alcohols, Phenols and Ethers" },
        { id: "chem-8", chNum: 8, name: "Aldehydes, Ketones and Carboxylic Acids" },
        { id: "chem-9", chNum: 9, name: "Amines" },
        { id: "chem-10", chNum: 10, name: "Biomolecules" }
    ],
    biology: [
        { id: "bio-1", chNum: 1, name: "Sexual Reproduction in Flowering Plants" },
        { id: "bio-2", chNum: 2, name: "Human Reproduction" },
        { id: "bio-3", chNum: 3, name: "Reproductive Health" },
        { id: "bio-4", chNum: 4, name: "Principles of Inheritance and Variation" },
        { id: "bio-5", chNum: 5, name: "Molecular Basis of Inheritance" },
        { id: "bio-6", chNum: 6, name: "Evolution" },
        { id: "bio-7", chNum: 7, name: "Human Health and Disease" },
        { id: "bio-8", chNum: 8, name: "Microbes in Human Welfare" },
        { id: "bio-9", chNum: 9, name: "Biotechnology: Principles and Processes" },
        { id: "bio-10", chNum: 10, name: "Biotechnology and its Applications" },
        { id: "bio-11", chNum: 11, name: "Organisms and Populations" },
        { id: "bio-12", chNum: 12, name: "Ecosystem" },
        { id: "bio-13", chNum: 13, name: "Biodiversity and Conservation" }
    ]
};

// Half Yearly Exam Syllabus (19 Chapters Total)
// Physics: Chapters 1 to 8 (8 chapters)
// Chemistry: Chapters 1 to 5 (5 chapters)
// Biology: Chapters 4, 7, 11, 12, 13, 8 (6 chapters)
const halfYearlySyllabus = {
    physics: [
        { id: "hy-phy-1", chNum: 1, name: "Electric Charges and Fields" },
        { id: "hy-phy-2", chNum: 2, name: "Electrostatic Potential and Capacitance" },
        { id: "hy-phy-3", chNum: 3, name: "Current Electricity" },
        { id: "hy-phy-4", chNum: 4, name: "Moving Charges and Magnetism" },
        { id: "hy-phy-5", chNum: 5, name: "Magnetism and Matter" },
        { id: "hy-phy-6", chNum: 6, name: "Electromagnetic Induction" },
        { id: "hy-phy-7", chNum: 7, name: "Alternating Current" },
        { id: "hy-phy-8", chNum: 8, name: "Electromagnetic Waves" }
    ],
    chemistry: [
        { id: "hy-chem-1", chNum: 1, name: "Solutions" },
        { id: "hy-chem-2", chNum: 2, name: "Electrochemistry" },
        { id: "hy-chem-3", chNum: 3, name: "Chemical Kinetics" },
        { id: "hy-chem-4", chNum: 4, name: "d -and f -Block Elements" },
        { id: "hy-chem-5", chNum: 5, name: "Coordination Compounds" }
    ],
    biology: [
        { id: "hy-bio-4", chNum: 4, name: "Principles of Inheritance and Variation" },
        { id: "hy-bio-7", chNum: 7, name: "Human Health and Disease" },
        { id: "hy-bio-11", chNum: 11, name: "Organisms and Populations" },
        { id: "hy-bio-12", chNum: 12, name: "Ecosystem" },
        { id: "hy-bio-13", chNum: 13, name: "Biodiversity and Conservation" },
        { id: "hy-bio-8", chNum: 8, name: "Microbes in Human Welfare" }
    ]
};

// ============================================================================
// 2. STATE & STORAGE MANAGEMENT (STRICTLY SEPARATE KEYS)
// ============================================================================

// Board / Full Syllabus Progress
let boardProgress = JSON.parse(localStorage.getItem('class12_progress_v2')) || {};

// Half Yearly Syllabus Progress
let halfYearlyProgress = JSON.parse(localStorage.getItem('class12_halfyearly_progress_v1')) || {};

// Active Filter Queries
let activeSearchQuery = "";

// Save Board Progress
function saveBoardProgress() {
    localStorage.setItem('class12_progress_v2', JSON.stringify(boardProgress));
    updateBoardDashboard();
}

// Save Half Yearly Progress
function saveHalfYearlyProgress() {
    localStorage.setItem('class12_halfyearly_progress_v1', JSON.stringify(halfYearlyProgress));
    updateHalfYearlyDashboard();
}

// Toggle Board Chapter Completion
function toggleBoardChapter(id, chapterName) {
    if (boardProgress[id]) {
        delete boardProgress[id];
        showToast(`${chapterName || 'Chapter'} uncompleted`, '↩️');
    } else {
        boardProgress[id] = true;
        showToast(`${chapterName || 'Chapter'} marked done!`, '🎉');
    }
    saveBoardProgress();
}

// Toggle Half Yearly Chapter Completion
function toggleHalfYearlyChapter(id, chapterName) {
    if (halfYearlyProgress[id]) {
        delete halfYearlyProgress[id];
        showToast(`${chapterName || 'Chapter'} uncompleted`, '↩️');
    } else {
        halfYearlyProgress[id] = true;
        showToast(`${chapterName || 'Chapter'} marked done!`, '🎉');
    }
    saveHalfYearlyProgress();
}

// ============================================================================
// 3. TOAST NOTIFICATION SYSTEM
// ============================================================================

let toastTimeout = null;

function showToast(message, icon = '🎉') {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    if (toastIcon) toastIcon.innerText = icon;

    toast.classList.add('toast-visible');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('toast-visible');
    }, 2800);
}

// ============================================================================
// 4. UI RENDERING & DASHBOARDS
// ============================================================================

// Render Board Subject Lists with Search Filtering
function renderBoardList(subject, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const chapters = boardSyllabus[subject].filter(ch => 
        ch.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) || 
        `ch ${ch.chNum}`.includes(activeSearchQuery.toLowerCase())
    );

    if (chapters.length === 0) {
        container.innerHTML = `
            <div class="text-center py-6 text-slate-400 text-xs font-medium">
                No matching chapters found
            </div>
        `;
        return;
    }

    chapters.forEach((chapter) => {
        const isChecked = boardProgress[chapter.id] ? 'checked' : '';
        const escapedName = chapter.name.replace(/'/g, "\\'");

        const label = document.createElement('label');
        label.className = 'checkbox-container';
        label.innerHTML = `
            <input type="checkbox" id="${chapter.id}" onchange="toggleBoardChapter('${chapter.id}', '${escapedName}')" ${isChecked}>
            <span class="checkmark"></span>
            <span class="chapter-text flex-1 flex items-center">
                <span class="chapter-badge ${subject === 'physics' ? 'badge-blue' : (subject === 'chemistry' ? 'badge-purple' : 'badge-green')}">
                    Ch ${chapter.chNum}
                </span>
                <span>${chapter.name}</span>
            </span>
        `;
        container.appendChild(label);
    });
}

// Render Half Yearly Subject Lists with Search Filtering
function renderHalfYearlyList(subject, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const chapters = halfYearlySyllabus[subject].filter(ch => 
        ch.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) || 
        `ch ${ch.chNum}`.includes(activeSearchQuery.toLowerCase())
    );

    if (chapters.length === 0) {
        container.innerHTML = `
            <div class="text-center py-6 text-slate-400 text-xs font-medium">
                No matching chapters found
            </div>
        `;
        return;
    }

    chapters.forEach((chapter) => {
        const isChecked = halfYearlyProgress[chapter.id] ? 'checked' : '';
        const escapedName = chapter.name.replace(/'/g, "\\'");

        const label = document.createElement('label');
        label.className = 'checkbox-container';
        label.innerHTML = `
            <input type="checkbox" id="${chapter.id}" onchange="toggleHalfYearlyChapter('${chapter.id}', '${escapedName}')" ${isChecked}>
            <span class="checkmark"></span>
            <span class="chapter-text flex-1 flex items-center">
                <span class="chapter-badge ${subject === 'physics' ? 'badge-blue' : (subject === 'chemistry' ? 'badge-purple' : 'badge-green')}">
                    Ch ${chapter.chNum}
                </span>
                <span>${chapter.name}</span>
            </span>
        `;
        container.appendChild(label);
    });
}

// Update Board Dashboard Statistics
function updateBoardDashboard() {
    let totalChapters = 0;
    let totalCompleted = 0;

    const stats = {
        physics: { total: boardSyllabus.physics.length, done: 0 },
        chemistry: { total: boardSyllabus.chemistry.length, done: 0 },
        biology: { total: boardSyllabus.biology.length, done: 0 }
    };

    for (const subject in boardSyllabus) {
        totalChapters += boardSyllabus[subject].length;
        boardSyllabus[subject].forEach(chapter => {
            if (boardProgress[chapter.id]) {
                totalCompleted++;
                stats[subject].done++;
            }
        });
    }

    const remaining = totalChapters - totalCompleted;
    const percentage = totalChapters === 0 ? 0 : Math.round((totalCompleted / totalChapters) * 100);

    const percEl = document.getElementById('percentage-text');
    const compEl = document.getElementById('completed-count');
    const remEl = document.getElementById('remaining-count');
    const progFill = document.getElementById('progress-fill');

    if (percEl) percEl.innerText = `${percentage}%`;
    if (compEl) compEl.innerText = totalCompleted;
    if (remEl) remEl.innerText = remaining;
    if (progFill) progFill.style.width = `${percentage}%`;

    const phyStatsEl = document.getElementById('phy-stats');
    const chemStatsEl = document.getElementById('chem-stats');
    const bioStatsEl = document.getElementById('bio-stats');

    if (phyStatsEl) phyStatsEl.innerText = `${stats.physics.done}/${stats.physics.total}`;
    if (chemStatsEl) chemStatsEl.innerText = `${stats.chemistry.done}/${stats.chemistry.total}`;
    if (bioStatsEl) bioStatsEl.innerText = `${stats.biology.done}/${stats.biology.total}`;
}

// Update Half Yearly Dashboard Statistics
function updateHalfYearlyDashboard() {
    let totalChapters = 0;
    let totalCompleted = 0;

    const stats = {
        physics: { total: halfYearlySyllabus.physics.length, done: 0 },
        chemistry: { total: halfYearlySyllabus.chemistry.length, done: 0 },
        biology: { total: halfYearlySyllabus.biology.length, done: 0 }
    };

    for (const subject in halfYearlySyllabus) {
        totalChapters += halfYearlySyllabus[subject].length;
        halfYearlySyllabus[subject].forEach(chapter => {
            if (halfYearlyProgress[chapter.id]) {
                totalCompleted++;
                stats[subject].done++;
            }
        });
    }

    const remaining = totalChapters - totalCompleted;
    const percentage = totalChapters === 0 ? 0 : Math.round((totalCompleted / totalChapters) * 100);

    // Half Yearly Summary Elements
    const hyPercEl = document.getElementById('hy-percentage-text');
    const hyCompEl = document.getElementById('hy-completed-count');
    const hyRemEl = document.getElementById('hy-remaining-count');
    const hyProgFill = document.getElementById('hy-progress-fill');

    if (hyPercEl) hyPercEl.innerText = `${percentage}%`;
    if (hyCompEl) hyCompEl.innerText = totalCompleted;
    if (hyRemEl) hyRemEl.innerText = remaining;
    if (hyProgFill) hyProgFill.style.width = `${percentage}%`;

    // Half Yearly Subject Stats in Mini Hero Cards
    const hyPhyStatsEl = document.getElementById('hy-phy-stats');
    const hyChemStatsEl = document.getElementById('hy-chem-stats');
    const hyBioStatsEl = document.getElementById('hy-bio-stats');

    if (hyPhyStatsEl) hyPhyStatsEl.innerText = `${stats.physics.done}/${stats.physics.total}`;
    if (hyChemStatsEl) hyChemStatsEl.innerText = `${stats.chemistry.done}/${stats.chemistry.total}`;
    if (hyBioStatsEl) hyBioStatsEl.innerText = `${stats.biology.done}/${stats.biology.total}`;

    // Half Yearly Column Headers Dynamic Sync
    const hyColPhyEl = document.getElementById('hy-col-phy-stats');
    const hyColChemEl = document.getElementById('hy-col-chem-stats');
    const hyColBioEl = document.getElementById('hy-col-bio-stats');

    if (hyColPhyEl) hyColPhyEl.innerText = `${stats.physics.done}/${stats.physics.total}`;
    if (hyColChemEl) hyColChemEl.innerText = `${stats.chemistry.done}/${stats.chemistry.total}`;
    if (hyColBioEl) hyColBioEl.innerText = `${stats.biology.done}/${stats.biology.total}`;

    // Half Yearly Mini Progress Bars
    const phyPercent = Math.round((stats.physics.done / stats.physics.total) * 100);
    const chemPercent = Math.round((stats.chemistry.done / stats.chemistry.total) * 100);
    const bioPercent = Math.round((stats.biology.done / stats.biology.total) * 100);

    const phyBar = document.getElementById('hy-phy-progress-fill');
    const chemBar = document.getElementById('hy-chem-progress-fill');
    const bioBar = document.getElementById('hy-bio-progress-fill');

    if (phyBar) phyBar.style.width = `${phyPercent}%`;
    if (chemBar) chemBar.style.width = `${chemPercent}%`;
    if (bioBar) bioBar.style.width = `${bioPercent}%`;
}

// Search & Filter Handling
function handleChapterSearch(event) {
    activeSearchQuery = (event.target.value || '').trim();
    renderBoardList('physics', 'physics-list');
    renderBoardList('chemistry', 'chemistry-list');
    renderBoardList('biology', 'biology-list');

    renderHalfYearlyList('physics', 'hy-physics-list');
    renderHalfYearlyList('chemistry', 'hy-chemistry-list');
    renderHalfYearlyList('biology', 'hy-biology-list');
}

// ============================================================================
// 5. SPA NAVIGATION (SECTION SWITCHING)
// ============================================================================

function switchSection(section) {
    const boardView = document.getElementById('board-view');
    const hyView = document.getElementById('halfyearly-view');
    const tabBoardBtn = document.getElementById('tab-btn-board');
    const tabHyBtn = document.getElementById('tab-btn-halfyearly');

    if (!boardView || !hyView) return;

    if (section === 'halfyearly') {
        boardView.classList.add('hidden');
        hyView.classList.remove('hidden');
        hyView.classList.add('section-fade');

        if (tabBoardBtn) {
            tabBoardBtn.classList.remove('active', 'text-indigo-600', 'bg-white', 'shadow-sm');
            tabBoardBtn.classList.add('text-slate-600');
        }
        if (tabHyBtn) {
            tabHyBtn.classList.add('active', 'text-indigo-600', 'bg-white', 'shadow-sm');
            tabHyBtn.classList.remove('text-slate-600');
        }
        localStorage.setItem('class12_active_section', 'halfyearly');
    } else {
        hyView.classList.add('hidden');
        boardView.classList.remove('hidden');
        boardView.classList.add('section-fade');

        if (tabHyBtn) {
            tabHyBtn.classList.remove('active', 'text-indigo-600', 'bg-white', 'shadow-sm');
            tabHyBtn.classList.add('text-slate-600');
        }
        if (tabBoardBtn) {
            tabBoardBtn.classList.add('active', 'text-indigo-600', 'bg-white', 'shadow-sm');
            tabBoardBtn.classList.remove('text-slate-600');
        }
        localStorage.setItem('class12_active_section', 'board');
    }

    // Scroll to top of view smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// 6. COUNTDOWN TIMERS
// ============================================================================

// Target Date Timer (Board Exam: Feb 1st)
function initBoardTimer() {
    const now = new Date();
    let targetYear = now.getFullYear();

    if (now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() >= 1)) {
        targetYear++;
    }

    const targetDate = new Date(`February 1, ${targetYear} 00:00:00`).getTime();

    const timerTick = () => {
        const currentTime = new Date().getTime();
        const timeDifference = targetDate - currentTime;

        const daysEl = document.getElementById('timer-days');
        const hoursEl = document.getElementById('timer-hours');
        const minsEl = document.getElementById('timer-minutes');
        const secsEl = document.getElementById('timer-seconds');

        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            daysEl.innerText = days.toString().padStart(2, '0');
            hoursEl.innerText = hours.toString().padStart(2, '0');
            minsEl.innerText = minutes.toString().padStart(2, '0');
            secsEl.innerText = seconds.toString().padStart(2, '0');
        } else {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minsEl.innerText = "00";
            secsEl.innerText = "00";
        }
    };

    timerTick();
    setInterval(timerTick, 1000);
}

// Target Date Timer (Half Yearly Exam: 15 October 2026)
function initHalfYearlyTimer() {
    const targetDate = new Date("October 15, 2026 00:00:00").getTime();

    const timerTick = () => {
        const currentTime = new Date().getTime();
        const timeDifference = targetDate - currentTime;

        const daysEl = document.getElementById('hy-timer-days');
        const hoursEl = document.getElementById('hy-timer-hours');
        const minsEl = document.getElementById('hy-timer-minutes');
        const secsEl = document.getElementById('hy-timer-seconds');

        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            daysEl.innerText = days.toString().padStart(2, '0');
            hoursEl.innerText = hours.toString().padStart(2, '0');
            minsEl.innerText = minutes.toString().padStart(2, '0');
            secsEl.innerText = seconds.toString().padStart(2, '0');
        } else {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minsEl.innerText = "00";
            secsEl.innerText = "00";
        }
    };

    timerTick();
    setInterval(timerTick, 1000);
}

// ============================================================================
// 7. STUDY TIME ANALYTICS & WEEKLY CHART
// ============================================================================

function getLocalISODate(dateObj = new Date()) {
    return new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000).toISOString().split('T')[0];
}

function getAnalyticsData() {
    const rawData = localStorage.getItem('class12_study_analytics_v3');
    return rawData ? JSON.parse(rawData) : {};
}

function saveAnalyticsData(data) {
    localStorage.setItem('class12_study_analytics_v3', JSON.stringify(data));
}

// Calculate Continuous Study Streak (days with >= 1 minute studied)
function calculateStreak(data) {
    let streak = 0;
    const today = new Date();
    let checkDate = new Date(today);

    const todayStr = getLocalISODate(checkDate);
    // If today hasn't had study time yet, check yesterday to keep streak active
    if (!data[todayStr] || data[todayStr].totalTimeSeconds < 60) {
        checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
        const dateStr = getLocalISODate(checkDate);
        if (data[dateStr] && data[dateStr].totalTimeSeconds >= 60) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}

function loadAnalyticsUI() {
    const data = getAnalyticsData();
    const todayStr = getLocalISODate();
    const todayData = data[todayStr] || { totalTimeSeconds: 0, sessionsCount: 0 };

    // Update Dashboard Study Text
    let h = Math.floor(todayData.totalTimeSeconds / 3600);
    let m = Math.floor((todayData.totalTimeSeconds % 3600) / 60);

    const studyTimeEl = document.getElementById('today-study-time');
    const sessionsEl = document.getElementById('today-sessions-count');

    if (studyTimeEl) studyTimeEl.innerText = `${h}h ${m}m`;
    if (sessionsEl) sessionsEl.innerText = `${todayData.sessionsCount} Session${todayData.sessionsCount !== 1 ? 's' : ''}`;

    // Streak and Weekly Total Calculations
    const streak = calculateStreak(data);
    const streakEl = document.getElementById('study-streak-badge');
    if (streakEl) {
        streakEl.innerText = `🔥 ${streak} Day${streak !== 1 ? 's' : ''} Streak`;
    }

    renderWeeklyChart(data);
}

function renderWeeklyChart(data) {
    const chartContainer = document.getElementById('weekly-chart');
    if (!chartContainer) return;
    chartContainer.innerHTML = '';

    const today = new Date();
    const last7Days = [];
    let maxSeconds = 1;
    let weeklyTotalSeconds = 0;

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = getLocalISODate(d);
        const seconds = data[dateStr] ? data[dateStr].totalTimeSeconds : 0;
        weeklyTotalSeconds += seconds;
        last7Days.push({ dateStr, seconds, dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' }) });
        if (seconds > maxSeconds) maxSeconds = seconds;
    }

    // Weekly Summary Label
    const weeklySumEl = document.getElementById('weekly-total-time');
    if (weeklySumEl) {
        const wH = Math.floor(weeklyTotalSeconds / 3600);
        const wM = Math.floor((weeklyTotalSeconds % 3600) / 60);
        weeklySumEl.innerText = `${wH}h ${wM}m`;
    }

    last7Days.forEach((day, index) => {
        const heightPercent = Math.max((day.seconds / maxSeconds) * 100, 6);
        const isToday = index === 6;
        const barColor = isToday ? 'bg-indigo-600' : (day.seconds > 0 ? 'bg-indigo-300' : 'bg-slate-200');

        const col = document.createElement('div');
        col.className = 'flex flex-col items-center justify-end h-full w-full flex-1 group relative cursor-pointer';

        let tooltipMins = Math.floor(day.seconds / 60);
        let tooltipText = tooltipMins >= 60 ? `${Math.floor(tooltipMins / 60)}h ${tooltipMins % 60}m` : `${tooltipMins}m`;

        col.innerHTML = `
            <div class="absolute -top-8 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-md">
                ${tooltipText}
            </div>
            <div class="w-full ${barColor} rounded-md chart-bar" style="height: ${day.seconds > 0 ? heightPercent : 6}%;"></div>
            <span class="text-[9px] font-bold text-slate-400 mt-1 uppercase ${isToday ? 'text-indigo-600 font-extrabold' : ''}">${day.dayName}</span>
        `;
        chartContainer.appendChild(col);
    });
}

function syncLiveSessionAnalytics(elapsedSeconds) {
    if (elapsedSeconds <= 0) return;
    let data = getAnalyticsData();
    const todayStr = getLocalISODate();

    if (!data[todayStr]) {
        data[todayStr] = { totalTimeSeconds: 0, sessionsCount: 0 };
    }

    data[todayStr].totalTimeSeconds += elapsedSeconds;
    saveAnalyticsData(data);
    loadAnalyticsUI();
}

function startNewSessionCount() {
    let data = getAnalyticsData();
    const todayStr = getLocalISODate();
    if (!data[todayStr]) {
        data[todayStr] = { totalTimeSeconds: 0, sessionsCount: 0 };
    }
    data[todayStr].sessionsCount += 1;
    saveAnalyticsData(data);
    loadAnalyticsUI();
}

// ============================================================================
// 8. WAKE LOCK API (SCREEN KEEP-AWAKE)
// ============================================================================

let wakeLock = null;

async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock released');
            });
        }
    } catch (err) {
        console.warn(`Wake Lock request failed: ${err.message}`);
    }
}

async function releaseWakeLock() {
    if (wakeLock !== null) {
        try {
            await wakeLock.release();
        } catch (e) {
            // Ignore release error
        }
        wakeLock = null;
    }
}

document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && document.body.classList.contains('focus-active') && !isTimerPaused) {
        await requestWakeLock();
    }
});

// ============================================================================
// 9. FULLSCREEN DEEP FOCUS MODE & TIMER
// ============================================================================

let focusInterval;
let targetTotalSeconds = 0;
let expectedEndTimeMs = 0;
let lastLiveSaveMs = 0;
let isTimerPaused = false;
let isTimerFinished = false;
let controlsTimeout = null;
let lastTapTime = 0;

// Set Preset Time from Clickable Chips
function setTimerPreset(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const hoursInput = document.getElementById('input-hours');
    const minsInput = document.getElementById('input-minutes');

    if (hoursInput) hoursInput.value = hours;
    if (minsInput) minsInput.value = mins;

    // Highlight active preset chip visually
    document.querySelectorAll('.timer-preset-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-slate-100', 'text-slate-700');
    });
    const clickedBtn = document.getElementById(`preset-${minutes}`);
    if (clickedBtn) {
        clickedBtn.classList.remove('bg-slate-100', 'text-slate-700');
        clickedBtn.classList.add('bg-indigo-600', 'text-white');
    }
}

function openFocusSetup() {
    const modal = document.getElementById('focus-setup-modal');
    const modalContent = document.getElementById('focus-modal-content');
    if (!modal || !modalContent) return;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
}

function closeFocusSetup() {
    const modal = document.getElementById('focus-setup-modal');
    const modalContent = document.getElementById('focus-modal-content');
    if (!modal || !modalContent) return;

    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function startFocusTimerFromInput() {
    let hours = parseInt(document.getElementById('input-hours').value) || 0;
    let minutes = parseInt(document.getElementById('input-minutes').value) || 0;

    if (hours < 0) hours = 0;
    if (minutes < 0) minutes = 0;
    if (hours === 0 && minutes === 0) return;

    targetTotalSeconds = (hours * 3600) + (minutes * 60);

    closeFocusSetup();
    activateFocusMode();
}

async function activateFocusMode() {
    const overlay = document.getElementById('focus-overlay');
    const display = document.getElementById('focus-time-display');
    const doneMsg = document.getElementById('focus-done-msg');
    const themeColorMeta = document.getElementById('theme-color-meta');
    const sessionStats = document.getElementById('focus-session-stats');
    const progressBar = document.getElementById('focus-session-progress');

    if (!overlay || !display) return;

    // Reset state
    if (doneMsg) doneMsg.classList.add('hidden');
    display.classList.remove('text-emerald-400');
    display.classList.add('text-white');
    if (sessionStats) sessionStats.innerText = "Session Active • Live Syncing";
    if (progressBar) progressBar.style.width = "0%";

    // Initialization
    const now = Date.now();
    expectedEndTimeMs = now + (targetTotalSeconds * 1000);
    lastLiveSaveMs = now;
    isTimerPaused = false;
    isTimerFinished = false;

    startNewSessionCount();
    updatePauseUI();
    updateDisplayString(targetTotalSeconds);

    // UI Transitions
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    document.body.classList.add('focus-active');
    if (themeColorMeta) themeColorMeta.setAttribute('content', '#000000');

    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen().catch(() => {});
    }

    window.scrollTo(0, 0);
    await requestWakeLock();

    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        showControls();
    }, 10);

    clearInterval(focusInterval);
    focusInterval = setInterval(focusTick, 250);
}

function showControls() {
    const controls = document.getElementById('focus-controls');
    const hint = document.getElementById('focus-hint');
    if (!controls || !hint) return;

    controls.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    hint.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');

    clearTimeout(controlsTimeout);

    if (!isTimerPaused && !isTimerFinished) {
        controlsTimeout = setTimeout(() => {
            hideControls();
        }, 5000);
    }
}

function hideControls() {
    const controls = document.getElementById('focus-controls');
    const hint = document.getElementById('focus-hint');
    if (!controls || !hint) return;

    controls.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    hint.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
}

function focusTick() {
    if (isTimerPaused || isTimerFinished) return;

    const now = Date.now();
    const remainingMs = expectedEndTimeMs - now;
    const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

    // Update Top Progress Bar
    const progressBar = document.getElementById('focus-session-progress');
    if (progressBar && targetTotalSeconds > 0) {
        const elapsed = targetTotalSeconds - remainingSeconds;
        const progressPct = Math.min(100, Math.max(0, (elapsed / targetTotalSeconds) * 100));
        progressBar.style.width = `${progressPct}%`;
    }

    // Live Sync Every ~5 seconds
    if (now - lastLiveSaveMs >= 5000) {
        const elapsedSinceLastSave = Math.floor((now - lastLiveSaveMs) / 1000);
        syncLiveSessionAnalytics(elapsedSinceLastSave);
        lastLiveSaveMs = now;
    }

    if (remainingMs <= 0) {
        const remainder = Math.floor((now - lastLiveSaveMs) / 1000);
        syncLiveSessionAnalytics(remainder);
        handleTimerCompletion();
    } else {
        updateDisplayString(remainingSeconds);
    }
}

function updateDisplayString(totalSeconds) {
    const display = document.getElementById('focus-time-display');
    if (!display) return;

    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = Math.floor(totalSeconds % 60);

    let timeString = "";
    if (h > 0) {
        timeString += h + ":";
        timeString += m.toString().padStart(2, '0') + ":";
    } else {
        timeString += m.toString() + ":";
    }
    timeString += s.toString().padStart(2, '0');
    display.innerText = timeString;
}

function togglePauseFocusTimer(e) {
    if (e) e.stopPropagation();
    if (isTimerFinished) return;

    const now = Date.now();

    if (isTimerPaused) {
        // Resuming
        const pauseDuration = now - lastLiveSaveMs;
        expectedEndTimeMs += pauseDuration;
        lastLiveSaveMs = now;
        isTimerPaused = false;
        const statsEl = document.getElementById('focus-session-stats');
        if (statsEl) statsEl.innerText = "Session Active • Live Syncing";
        requestWakeLock();
        showControls();
    } else {
        // Pausing
        const exactElapsed = Math.floor((now - lastLiveSaveMs) / 1000);
        syncLiveSessionAnalytics(exactElapsed);

        isTimerPaused = true;
        lastLiveSaveMs = now;
        const statsEl = document.getElementById('focus-session-stats');
        if (statsEl) statsEl.innerText = "Session Paused";
        releaseWakeLock();
        showControls();
    }

    updatePauseUI();
}

function updatePauseUI() {
    const btnText = document.getElementById('text-pause-resume');
    const iconPause = document.getElementById('icon-pause');
    const iconResume = document.getElementById('icon-resume');

    if (!btnText || !iconPause || !iconResume) return;

    if (isTimerPaused) {
        document.body.classList.add('focus-paused');
        btnText.innerText = "Resume";
        iconPause.classList.add('hidden');
        iconResume.classList.remove('hidden');
    } else {
        document.body.classList.remove('focus-paused');
        btnText.innerText = "Pause";
        iconPause.classList.remove('hidden');
        iconResume.classList.add('hidden');
    }
}

// Gentle Web Audio API Synthesized Chime (100% offline, zero assets)
function playCelebrationSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        // Note 1: E5 (659.25 Hz)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(659.25, now);
        gain1.gain.setValueAtTime(0.25, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.45);

        // Note 2: A5 (880 Hz)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(880, now + 0.18);
        gain2.gain.setValueAtTime(0.3, now + 0.18);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.18);
        osc2.stop(now + 0.8);
    } catch (e) {
        console.warn('Audio celebration not supported', e);
    }
}

function handleTimerCompletion() {
    isTimerFinished = true;
    clearInterval(focusInterval);

    const display = document.getElementById('focus-time-display');
    const doneMsg = document.getElementById('focus-done-msg');
    const sessionStats = document.getElementById('focus-session-stats');
    const pauseBtn = document.getElementById('toggle-pause-btn');
    const progressBar = document.getElementById('focus-session-progress');

    if (display) {
        display.innerText = "0:00";
        display.classList.remove('text-white');
        display.classList.add('text-emerald-400');
    }

    if (progressBar) progressBar.style.width = "100%";
    if (doneMsg) doneMsg.classList.remove('hidden');
    if (sessionStats) sessionStats.innerText = "🎉 Target Achieved!";
    if (pauseBtn) pauseBtn.classList.add('hidden');

    playCelebrationSound();
    releaseWakeLock();
    showControls();
}

function promptStopTimer(e) {
    if (e) e.stopPropagation();
    if (isTimerFinished) {
        finalizeExit();
        return;
    }

    if (!isTimerPaused) togglePauseFocusTimer();

    const stopModal = document.getElementById('stop-confirm-modal');
    const stopModalContent = document.getElementById('stop-modal-content');
    if (!stopModal || !stopModalContent) return;

    stopModal.classList.remove('hidden');
    setTimeout(() => {
        stopModal.classList.remove('opacity-0');
        stopModalContent.classList.remove('scale-95');
        stopModalContent.classList.add('scale-100');
    }, 10);
}

function cancelStopTimer() {
    const stopModal = document.getElementById('stop-confirm-modal');
    const stopModalContent = document.getElementById('stop-modal-content');
    if (!stopModal || !stopModalContent) return;

    stopModal.classList.add('opacity-0');
    stopModalContent.classList.remove('scale-100');
    stopModalContent.classList.add('scale-95');
    setTimeout(() => {
        stopModal.classList.add('hidden');
    }, 300);
}

function confirmStopTimer() {
    const stopModal = document.getElementById('stop-confirm-modal');
    if (stopModal) {
        stopModal.classList.add('hidden');
        stopModal.classList.add('opacity-0');
    }
    finalizeExit();
}

function finalizeExit() {
    clearInterval(focusInterval);
    isTimerFinished = true;
    document.body.classList.remove('focus-paused');
    clearTimeout(controlsTimeout);

    releaseWakeLock();

    const overlay = document.getElementById('focus-overlay');
    const themeColorMeta = document.getElementById('theme-color-meta');
    const pauseBtn = document.getElementById('toggle-pause-btn');
    const controls = document.getElementById('focus-controls');
    const hint = document.getElementById('focus-hint');

    if (overlay) overlay.classList.add('opacity-0');

    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => { });
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => { });
    }

    setTimeout(() => {
        if (overlay) {
            overlay.classList.remove('flex');
            overlay.classList.add('hidden');
        }
        document.body.classList.remove('focus-active');
        if (themeColorMeta) themeColorMeta.setAttribute('content', '#4f46e5');

        if (pauseBtn) pauseBtn.classList.remove('hidden');
        if (controls) controls.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        if (hint) hint.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
    }, 500);
}

// Double click/tap listener setup for overlay
function initOverlayListeners() {
    const overlay = document.getElementById('focus-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', (e) => {
        if (e.target.closest('#focus-controls') || e.target.closest('#focus-done-msg')) return;

        const currentTime = Date.now();
        const tapGap = currentTime - lastTapTime;

        if (tapGap < 400 && tapGap > 0) {
            showControls();
        }
        lastTapTime = currentTime;
    });
}

// ============================================================================
// 10. PROGRESSIVE WEB APP (PWA) SUPPORT WITH LOGO
// ============================================================================

function initPWA() {
    const manifestJSON = {
        "name": "Class 12th Tracker",
        "short_name": "Class12",
        "start_url": window.location.href,
        "display": "standalone",
        "background_color": "#030712",
        "theme_color": "#4f46e5",
        "icons": [
            {
                "src": "logo.png",
                "sizes": "512x512",
                "type": "image/png"
            },
            {
                "src": "logo.png",
                "sizes": "192x192",
                "type": "image/png"
            }
        ]
    };
    const manifestBlob = new Blob([JSON.stringify(manifestJSON)], { type: 'application/manifest+json' });
    const manifestLink = document.getElementById('manifest-link');
    if (manifestLink) manifestLink.href = URL.createObjectURL(manifestBlob);

    const swCode = `
        self.addEventListener('install', (e) => self.skipWaiting());
        self.addEventListener('activate', (e) => self.clients.claim());
        self.addEventListener('fetch', (e) => {});
    `;
    const swBlob = new Blob([swCode], { type: 'text/javascript' });
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(URL.createObjectURL(swBlob)).catch(() => console.log('SW registration bypassed'));
    }

    let deferredPrompt;
    const installBtn = document.getElementById('install-app-btn');

    if (installBtn && !window.matchMedia('(display-mode: standalone)').matches) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.classList.remove('hidden');
        });

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.classList.add('hidden');
                }
                deferredPrompt = null;
            }
        });
    }
}

// ============================================================================
// 11. APP INITIALIZATION
// ============================================================================

window.onload = function () {
    // 1. Render Full Board Syllabus Lists
    renderBoardList('physics', 'physics-list');
    renderBoardList('chemistry', 'chemistry-list');
    renderBoardList('biology', 'biology-list');
    updateBoardDashboard();

    // 2. Render Half Yearly Syllabus Lists
    renderHalfYearlyList('physics', 'hy-physics-list');
    renderHalfYearlyList('chemistry', 'hy-chemistry-list');
    renderHalfYearlyList('biology', 'hy-biology-list');
    updateHalfYearlyDashboard();

    // 3. Start Both Dynamic Countdown Timers
    initBoardTimer();
    initHalfYearlyTimer();

    // 4. Load 7-Day Study Analytics & Streaks
    loadAnalyticsUI();

    // 5. Setup Overlay and PWA
    initOverlayListeners();
    initPWA();

    // 6. Restore Active Tab (Board or Half Yearly)
    const savedSection = localStorage.getItem('class12_active_section') || 'board';
    switchSection(savedSection);
};
