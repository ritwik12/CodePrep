let editor = null;
let currentProblem = null;
let visualizer = null;
let playbackTimer = null;
let isPlaying = false;
let playbackSpeed = 1000; // ms per step

// Python execution via Pyodide
let pyodide = null;
let pyodidePromise = null;

// Countdown Timer Variables
let timerInterval = null;
let timeLeft = 3600; // 60 minutes in seconds
let timerRunning = false;
let isMockMode = false;

// Navigation States
let activeView = 'dashboard'; // 'dashboard', 'roadmap', 'workspace'
let lastActiveView = 'dashboard';

function initPyodide() {
    if (pyodidePromise) return pyodidePromise;
    console.log("Initializing Pyodide...");
    pyodidePromise = loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
    }).then(py => {
        pyodide = py;
        console.log("Pyodide loaded!");
        return py;
    }).catch(err => {
        console.error("Pyodide failed to load", err);
        pyodidePromise = null;
        throw err;
    });
    return pyodidePromise;
}

// Deep equality utility for checking test case results
function isEqual(a, b) {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) return false;
        }
        return true;
    }
    if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        for (let key of keysA) {
            if (!isEqual(a[key], b[key])) return false;
        }
        return true;
    }
    return false;
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    visualizer = new CalculatorVisualizer();
    window.problems = window.problems || [];
    
    // UI Event Listeners
    setupEventListeners();
    setupNavigation();
    setupTimer();
    setupNotes();
    
    // Render initial views
    renderDashboard();
    
    // Warm up Monaco and Pyodide
    initMonaco();
    initPyodide().catch(() => {});
});

// HTML Safety Helper
function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Monaco Editor Error Markers & Navigation
function updateEditorMarkers(errorInfo) {
    if (!editor || typeof monaco === 'undefined') return;
    if (errorInfo && errorInfo.line_number) {
        const line = Math.max(1, parseInt(errorInfo.line_number));
        const col = Math.max(1, parseInt(errorInfo.column_number || 1));
        const lineContent = editor.getModel().getLineContent(line) || "";
        const maxCol = Math.max(col + 1, lineContent.length + 1);

        monaco.editor.setModelMarkers(editor.getModel(), 'python', [{
            startLineNumber: line,
            startColumn: col,
            endLineNumber: line,
            endColumn: maxCol,
            message: `${errorInfo.error_type}: ${errorInfo.error_message}`,
            severity: monaco.MarkerSeverity.Error
        }]);
    } else {
        monaco.editor.setModelMarkers(editor.getModel(), 'python', []);
    }
}

function jumpToLine(line) {
    if (!editor) return;
    const lineNum = parseInt(line);
    if (isNaN(lineNum)) return;
    editor.revealLineInCenter(lineNum);
    editor.setPosition({ lineNumber: lineNum, column: 1 });
    editor.focus();
}

function toggleTraceback(id) {
    const el = document.getElementById(id);
    const btn = document.getElementById(`btn-${id}`);
    if (!el) return;
    if (el.style.display === "none" || !el.style.display) {
        el.style.display = "block";
        if (btn) btn.innerText = "Hide Traceback";
    } else {
        el.style.display = "none";
        if (btn) btn.innerText = "Show Traceback";
    }
}

window.jumpToLine = jumpToLine;
window.toggleTraceback = toggleTraceback;

// Monaco Editor Initialization
function initMonaco() {
    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });
    require(['vs/editor/editor.main'], () => {
        editor = monaco.editor.create(document.getElementById('editor-container'), {
            value: '',
            language: 'python',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            fontFamily: 'JetBrains Mono',
            minimap: { enabled: false },
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            padding: { top: 10, bottom: 10 }
        });
        
        editor.onDidChangeModelContent(() => {
            updateEditorMarkers(null);
        });

        if (currentProblem) {
            loadProblemCode(currentProblem);
        }
    });
}


// Setup View Switching Navigation
function setupNavigation() {
    const btnDashboard = document.getElementById("tab-nav-dashboard");
    const homeLogo = document.getElementById("home-logo");
    const btnBack = document.getElementById("btn-back");

    if (btnDashboard) {
        btnDashboard.addEventListener("click", () => {
            switchView("dashboard");
        });
    }

    const goHome = () => {
            pauseTimer();
            isMockMode = false;
            switchView("dashboard");
    };

    if (homeLogo) {
        homeLogo.addEventListener("click", goHome);
        homeLogo.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goHome();
            }
        });
    }

    if (btnBack) {
        btnBack.addEventListener("click", () => {
            pauseTimer();
            isMockMode = false;
            switchView("dashboard");
        });
    }
}

function switchView(viewName) {
    activeView = viewName;
    const btnBack = document.getElementById("btn-back");

    // Hide all views
    document.getElementById("dashboard-view").style.display = "none";
    document.getElementById("workspace-view").style.display = "none";

    if (viewName === "dashboard") {
        document.getElementById("dashboard-view").style.display = "block";
        btnBack.style.display = "none";
        lastActiveView = "dashboard";
        renderDashboard();
    } else if (viewName === "workspace") {
        document.getElementById("workspace-view").style.display = "grid";
        btnBack.style.display = "block";
    }
}

// Event Listeners for Workspace Elements
function setupEventListeners() {
    // Tab switching in workspace info-pane
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const target = tab.dataset.tab;
            document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
            document.getElementById(target).classList.add("active");
        });
    });

    // Reset editor content
    document.getElementById("btn-reset").addEventListener("click", () => {
        if (!currentProblem) return;
        if (confirm("Are you sure you want to reset the editor? Your current changes will be lost.")) {
            editor.setValue(currentProblem.starterCode || '');
            localStorage.removeItem(`code_python_${currentProblem.id}`);
        }
    });

    // Run & Submit triggers
    document.getElementById("btn-run").addEventListener("click", () => runCode(false));
    document.getElementById("btn-submit").addEventListener("click", () => runCode(true));

    // Success Modal Event Handlers
    const closeSuccessModal = () => {
        document.getElementById("success-modal-overlay").style.display = "none";
    };

    document.getElementById("btn-modal-close").addEventListener("click", () => {
        closeSuccessModal();
        isMockMode = false;
        switchView(lastActiveView);
    });

    const btnStay = document.getElementById("btn-modal-stay");
    if (btnStay) {
        btnStay.addEventListener("click", closeSuccessModal);
    }

    const btnX = document.getElementById("btn-modal-x");
    if (btnX) {
        btnX.addEventListener("click", closeSuccessModal);
    }

    document.getElementById("success-modal-overlay").addEventListener("click", (e) => {
        if (e.target.id === "success-modal-overlay") {
            closeSuccessModal();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeSuccessModal();
            const cpOverlay = document.getElementById("custom-problem-overlay");
            if (cpOverlay) cpOverlay.style.display = "none";
        }
    });

    // Filters & Search
    document.getElementById("search-input").addEventListener("input", renderDashboard);
    document.getElementById("filter-category").addEventListener("change", () => {
        const val = document.getElementById("filter-category").value;
        if (val === "favourites") {
            document.getElementById("pill-all").classList.remove("active");
            document.getElementById("pill-fav").classList.add("active");
        } else {
            document.getElementById("pill-all").classList.add("active");
            document.getElementById("pill-fav").classList.remove("active");
        }
        renderDashboard();
    });
    document.getElementById("filter-difficulty").addEventListener("change", renderDashboard);

    const pillAll = document.getElementById("pill-all");
    const pillFav = document.getElementById("pill-fav");
    if (pillAll && pillFav) {
        pillAll.addEventListener("click", () => {
            pillAll.classList.add("active");
            pillFav.classList.remove("active");
            document.getElementById("filter-category").value = "all";
            renderDashboard();
        });
        pillFav.addEventListener("click", () => {
            pillFav.classList.add("active");
            pillAll.classList.remove("active");
            document.getElementById("filter-category").value = "favourites";
            renderDashboard();
        });
    }

    const btnStarWorkspace = document.getElementById("btn-star-workspace");
    if (btnStarWorkspace) {
        btnStarWorkspace.addEventListener("click", () => {
            if (!currentProblem) return;
            window.toggleFavorite(currentProblem.id);
            updateWorkspaceStarBtn();
            renderDashboard();
        });
    }

    // Custom problem triggers
    document.getElementById("btn-add-problem").addEventListener("click", () => {
        document.getElementById("custom-problem-overlay").style.display = "flex";
    });

    document.getElementById("btn-cp-cancel").addEventListener("click", () => {
        document.getElementById("custom-problem-overlay").style.display = "none";
        document.getElementById("custom-problem-form").reset();
    });

    document.getElementById("custom-problem-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("cp-title").value.trim();
        const difficulty = document.getElementById("cp-difficulty").value;
        const category = document.getElementById("cp-category").value;
        const leetcodeLink = document.getElementById("cp-link").value.trim() || "#";
        const entryPoint = document.getElementById("cp-entry").value.trim();
        const description = document.getElementById("cp-desc").value.trim();
        const pythonStarterCode = document.getElementById("cp-starter-py").value.trim();
        const testCasesRaw = document.getElementById("cp-testcases").value.trim();
        const explanation = document.getElementById("cp-explanation").value.trim() || "<p>Analyze constraints and optimize.</p>";

        let testCases = [];
        try {
            testCases = JSON.parse(testCasesRaw);
            if (!Array.isArray(testCases)) throw new Error("Test cases must be a JSON array");
            testCases.forEach((tc, idx) => {
                if (tc.input === undefined || tc.expected === undefined) {
                    throw new Error(`Test Case ${idx + 1} must contain "input" and "expected" keys.`);
                }
            });
        } catch (err) {
            alert(`JSON Parsing Error in Test Cases:\n${err.message}`);
            return;
        }

        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const newProblem = {
            id,
            title,
            difficulty,
            category,
            leetcodeLink,
            entryPoint,
            description,
            starterCode: pythonStarterCode,
            testCases,
            explanation,
            companyTags: ["Custom"],
            followUps: ["Can you optimize the time complexity further?"]
        };

        if (window.addCustomProblem(newProblem)) {
            window.problems = window.getProblems();
            document.getElementById("custom-problem-overlay").style.display = "none";
            document.getElementById("custom-problem-form").reset();
            renderDashboard();
            alert("Custom question saved successfully!");
        }
    });

    // Restore deleted problems handler
    const restoreBtn = document.getElementById("btn-restore-problems");
    if (restoreBtn) {
        restoreBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to restore all deleted questions?")) {
                window.restoreDeletedProblems();
                renderDashboard();
            }
        });
    }

    // Workspace delete question handler
    const deleteWsBtn = document.getElementById("btn-delete-workspace");
    if (deleteWsBtn) {
        deleteWsBtn.addEventListener("click", () => {
            if (currentProblem && confirm(`Are you sure you want to delete "${currentProblem.title}"?`)) {
                const title = currentProblem.title;
                window.deleteProblem(currentProblem.id);
                currentProblem = null;
                switchView("dashboard");
                renderDashboard();
            }
        });
    }

    // Visualizer sandbox controls
    document.getElementById("btn-visualize").addEventListener("click", startVisualization);
    document.getElementById("visualizer-expr-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") startVisualization();
    });

    document.getElementById("btn-vis-prev").addEventListener("click", () => {
        pausePlayback();
        stepVisualization(-1);
    });
    document.getElementById("btn-vis-next").addEventListener("click", () => {
        pausePlayback();
        stepVisualization(1);
    });
    document.getElementById("btn-vis-play").addEventListener("click", togglePlayback);
    document.getElementById("btn-vis-reset").addEventListener("click", () => {
        pausePlayback();
        resetVisualization();
    });
    document.getElementById("vis-speed").addEventListener("change", (e) => {
        playbackSpeed = parseInt(e.target.value);
        if (isPlaying) {
            pausePlayback();
            playPlayback();
        }
    });
}

// 60-Minute Countdown Timer Widget
function setupTimer() {
    const btnControl = document.getElementById("btn-timer-toggle");
    btnControl.addEventListener("click", () => {
        if (timerRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });
}

function startTimer() {
    if (timerRunning) return;
    // A completed countdown leaves timeLeft at zero. Reset it before a user
    // clicks the visible "Restart" control so the next interval can run.
    if (timeLeft <= 0) {
        resetTimer(3600);
    }
    timerRunning = true;
    document.getElementById("btn-timer-toggle").innerText = "Pause";
    document.getElementById("btn-timer-toggle").classList.add("running");
    
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            document.getElementById("timer-display").innerText = "00:00";
            document.getElementById("btn-timer-toggle").innerText = "Restart";
            document.getElementById("btn-timer-toggle").classList.remove("running");
            alert("Time is up! Let's review the solution complexity and perform a dry run.");
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    if (!timerRunning) return;
    timerRunning = false;
    clearInterval(timerInterval);
    document.getElementById("btn-timer-toggle").innerText = "Resume";
    document.getElementById("btn-timer-toggle").classList.remove("running");
}

function resetTimer(seconds = 3600) {
    clearInterval(timerInterval);
    timerRunning = false;
    timeLeft = seconds;
    updateTimerDisplay();
    document.getElementById("btn-timer-toggle").innerText = "Start";
    document.getElementById("btn-timer-toggle").classList.remove("running");
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById("timer-display").innerText = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Interview Stage Checklist Logic
function setupChecklist() {
    const header = document.getElementById("checklist-toggle");
    const body = document.getElementById("checklist-body");
    const chevron = document.getElementById("checklist-chevron");

    header.addEventListener("click", () => {
        body.classList.toggle("collapsed");
        chevron.style.transform = body.classList.contains("collapsed") ? "rotate(0deg)" : "rotate(180deg)";
    });

    const checkboxes = ["chk-clarify", "chk-constraints", "chk-bruteforce", "chk-optimal", "chk-dryrun", "chk-complexity"];
    checkboxes.forEach(id => {
        document.getElementById(id).addEventListener("change", (e) => {
            if (currentProblem) {
                const checks = JSON.parse(localStorage.getItem(`checklist_${currentProblem.id}`) || "{}");
                checks[id] = e.target.checked;
                localStorage.setItem(`checklist_${currentProblem.id}`, JSON.stringify(checks));
            }
        });
    });
}

function loadChecklistState(problemId) {
    const checks = JSON.parse(localStorage.getItem(`checklist_${problemId}`) || "{}");
    const checkboxes = ["chk-clarify", "chk-constraints", "chk-bruteforce", "chk-optimal", "chk-dryrun", "chk-complexity"];
    checkboxes.forEach(id => {
        document.getElementById(id).checked = !!checks[id];
    });
}

function clearChecklistState(problemId) {
    const checkboxes = ["chk-clarify", "chk-constraints", "chk-bruteforce", "chk-optimal", "chk-dryrun", "chk-complexity"];
    checkboxes.forEach(id => {
        document.getElementById(id).checked = false;
    });
    localStorage.removeItem(`checklist_${problemId}`);
}

// Problem Personal Notes Logic
function setupNotes() {
    const area = document.getElementById("problem-notes-area");
    area.addEventListener("input", (e) => {
        if (currentProblem) {
            localStorage.setItem(`notes_${currentProblem.id}`, e.target.value);
        }
    });
}

function loadNotesState(problemId) {
    const note = localStorage.getItem(`notes_${problemId}`) || "";
    document.getElementById("problem-notes-area").value = note;
}

// Roadmap Tab Navigation
function setupRoadmapTabs() {
    const tabs = document.querySelectorAll(".roadmap-tab-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const target = tab.dataset.roadmapTab;
            document.querySelectorAll(".roadmap-tab-content").forEach(tc => tc.classList.remove("active"));
            document.getElementById(target).classList.add("active");
        });
    });

    document.getElementById("btn-random-mock").addEventListener("click", startRandomMockInterview);
}

// Update workspace star button appearance
function updateWorkspaceStarBtn() {
    if (!currentProblem) return;
    const isFav = window.isFavorite(currentProblem.id);
    const btn = document.getElementById("btn-star-workspace");
    const icon = document.getElementById("star-icon-workspace");
    const text = document.getElementById("star-text-workspace");
    if (btn && icon && text) {
        if (isFav) {
            btn.classList.add("active");
            icon.innerText = "★";
            text.innerText = "Favourited";
        } else {
            btn.classList.remove("active");
            icon.innerText = "☆";
            text.innerText = "Favourite";
        }
    }
}

// Render Dashboard View
function renderDashboard() {
    const grid = document.getElementById("problems-grid");
    grid.innerHTML = "";

    const allCountEl = document.getElementById("count-all");
    const favCountEl = document.getElementById("count-fav");
    if (allCountEl) allCountEl.innerText = window.problems.length;
    if (favCountEl) favCountEl.innerText = window.getFavorites().length;

    const restoreBtn = document.getElementById("btn-restore-problems");
    if (restoreBtn) {
        restoreBtn.style.display = window.hasDeletedProblems() ? "inline-flex" : "none";
    }

    const query = document.getElementById("search-input").value.toLowerCase().trim();
    const category = document.getElementById("filter-category").value;
    const difficulty = document.getElementById("filter-difficulty").value;

    const filtered = window.problems.filter(p => {
        const matchesQuery = p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        const matchesCategory = category === "all" ? true :
                                category === "favourites" ? window.isFavorite(p.id) :
                                p.category === category;
        const matchesDifficulty = difficulty === "all" || p.difficulty.toLowerCase() === difficulty.toLowerCase();
        return matchesQuery && matchesCategory && matchesDifficulty;
    });

    if (filtered.length === 0) {
        if (category === "favourites") {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 4rem 2rem; background: rgba(15, 23, 42, 0.3); border-radius: 16px; border: 1px dashed var(--border-color);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⭐</div>
                    <h3 style="color: var(--text-main); margin-bottom: 0.5rem; font-weight: 600;">No Favourite Questions Yet</h3>
                    <p style="font-size: 0.95rem; max-width: 450px; margin: 0 auto; line-height: 1.6;">Click the star icon (<strong style="color: #fbbf24;">☆</strong>) on any question card to save it to your favourites list for quick practice!</p>
                </div>`;
        } else {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No problems match your filters. Try adjusting them or add a new question!</div>`;
        }
        return;
    }

    filtered.forEach(p => {
        const status = localStorage.getItem(`status_${p.id}`) || "unsolved";
        let statusText = "Unsolved";
        let statusClass = "";
        if (status === "solved") {
            statusText = "✓ Solved";
            statusClass = "solved";
        } else if (status === "attempted") {
            statusText = "• Attempted";
            statusClass = "attempted";
        }

        const isFav = window.isFavorite(p.id);

        // Generate company badges HTML
        let companyHTML = "";
        if (p.companyTags) {
            companyHTML = p.companyTags.map(tag => `<span class="company-badge">${tag}</span>`).join(" ");
        }

        const card = document.createElement("div");
        card.className = "problem-card";
        card.innerHTML = `
            <div class="problem-card-header">
                <div style="flex-grow: 1; padding-right: 0.5rem;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;">
                        <div class="problem-title">${p.title}</div>
                        <div style="display: flex; align-items: center; gap: 0.35rem;">
                            <button class="btn-star ${isFav ? 'active' : ''}" title="${isFav ? 'Remove from Favourites' : 'Add to Favourites'}">
                                ${isFav ? '★' : '☆'}
                            </button>
                            <button class="btn-delete-card" title="Delete Question">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--secondary); margin-top: 0.25rem;">${p.category || 'Algorithms'}</div>
                </div>
                <span class="difficulty-badge ${p.difficulty.toLowerCase()}">${p.difficulty}</span>
            </div>
            <div class="problem-card-body">
                ${companyHTML}
            </div>
            <div class="problem-card-footer">
                <div class="status-badge ${statusClass}">${statusText}</div>
                <button class="btn-solve">Solve</button>
            </div>
        `;

        const starBtn = card.querySelector(".btn-star");
        if (starBtn) {
            starBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.toggleFavorite(p.id);
                renderDashboard();
                if (currentProblem && currentProblem.id === p.id) {
                    updateWorkspaceStarBtn();
                }
            });
        }

        const deleteBtn = card.querySelector(".btn-delete-card");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                    window.deleteProblem(p.id);
                    if (currentProblem && currentProblem.id === p.id) {
                        currentProblem = null;
                        switchView("dashboard");
                    }
                    renderDashboard();
                }
            });
        }

        card.addEventListener("click", () => showWorkspaceView(p.id));
        grid.appendChild(card);
    });
}

// Render Roadmap View Progress Tracker
function renderRoadmap() {
    const statsContainer = document.getElementById("prep-progress-stats");
    statsContainer.innerHTML = "";

    const categories = [
        "Graphs & Cycle Detection",
        "Advanced LLD & Dependencies",
        "Data Structure Design",
        "Stack & Parsers"
    ];

    let totalSolved = 0;
    const catStats = [];

    categories.forEach(cat => {
        const catProblems = window.problems.filter(p => p.category === cat);
        const solved = catProblems.filter(p => localStorage.getItem(`status_${p.id}`) === "solved").length;
        totalSolved += solved;
        
        catStats.push({
            name: cat,
            solved: solved,
            total: catProblems.length
        });
    });

    const percent = window.problems.length > 0 ? Math.round((totalSolved / window.problems.length) * 100) : 0;

    statsContainer.innerHTML = `
        <div class="overall-progress-bar-container">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.9rem;">
                <span>Total Prep Completion</span>
                <strong>${totalSolved} / ${window.problems.length} solved (${percent}%)</strong>
            </div>
            <div class="progress-bar-bg" style="background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden;">
                <div class="progress-bar-fill" style="background: linear-gradient(to right, var(--primary), var(--secondary)); width: ${percent}%; height: 100%; border-radius: 4px;"></div>
            </div>
        </div>
        <div class="cat-progress-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; font-size: 0.8rem;">
            ${catStats.map(stat => {
                const catPercent = stat.total > 0 ? Math.round((stat.solved / stat.total) * 100) : 0;
                return `
                    <div class="cat-stat-card" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); padding: 0.5rem; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-weight: 500;">
                            <span style="color: var(--text-muted);">${stat.name.split(' ')[0]}</span>
                            <span>${stat.solved}/${stat.total}</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.05); height: 4px; border-radius: 2px;">
                            <div style="background: var(--secondary); width: ${catPercent}%; height: 100%; border-radius: 2px;"></div>
                        </div>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

// Start Random Mock Interview
function startRandomMockInterview() {
    isMockMode = true;
    
    // Filter unsolved problems first
    let candidates = window.problems.filter(p => localStorage.getItem(`status_${p.id}`) !== "solved");
    if (candidates.length === 0) {
        candidates = window.problems; // Fallback to all problems if all solved
    }
    
    const randomProblem = candidates[Math.floor(Math.random() * candidates.length)];
    
    // Open the workspace
    showWorkspaceView(randomProblem.id);
    
    
    // Reset and auto-start the timer
    resetTimer(3600);
    startTimer();
    
    alert(`Mock Interview Mode Activated!\nSelected Question: ${randomProblem.title}\nYour 60-minute countdown has started. Hidden test cases are active. Good luck!`);
}

// Transition to Workspace View for a Problem
function showWorkspaceView(problemId) {
    currentProblem = window.problems.find(p => p.id === problemId);
    if (!currentProblem) return;

    switchView("workspace");

    // Populate problem details
    document.getElementById("problem-title").innerText = currentProblem.title;
    document.getElementById("leetcode-link").href = currentProblem.leetcodeLink;
    document.getElementById("problem-desc-container").innerHTML = currentProblem.description;
    document.getElementById("explanation-content").innerHTML = currentProblem.explanation;
    document.getElementById("editorial-content").innerHTML = window.getEditorial(currentProblem);

    // Update workspace star button
    updateWorkspaceStarBtn();

    // Load workspace state
    loadProblemCode(currentProblem);
    loadNotesState(currentProblem.id);

    // Set defaults/reset visualizer tab depending on category
    const visTabBtn = document.getElementById("tab-visualizer");
    if (currentProblem.category === "Stack & Parsers") {
        visTabBtn.style.display = "block";
        const defaultExpr = currentProblem.testCases[0] ? currentProblem.testCases[0].input : "3+(2*4)/2";
        let cleanExpr = defaultExpr;
        
        // Strip string quote markers from default expressions
        if (defaultExpr.startsWith('"') && defaultExpr.endsWith('"')) {
            cleanExpr = defaultExpr.substring(1, defaultExpr.length - 1);
        } else if (defaultExpr.startsWith("'") && defaultExpr.endsWith("'")) {
            cleanExpr = defaultExpr.substring(1, defaultExpr.length - 1);
        } else if (defaultExpr.startsWith('[') && defaultExpr.endsWith(']')) {
            cleanExpr = "2 1 + 3 *";
        }
        document.getElementById("visualizer-expr-input").value = cleanExpr;
        startVisualization();
    } else {
        visTabBtn.style.display = "none";
    }

    // Default tab to Description
    document.querySelector('[data-tab="problem-description"]').click();
    
    // Clear log console placeholder
    document.getElementById("console-content").innerHTML = `<div class="console-placeholder">Press Run Code to see execution results</div>`;

    // Handle timer reset (unless already running in mock mode)
    if (!isMockMode) {
        resetTimer(3600);
    }
}

// Load Cached or Starter Code into Editor
function loadProblemCode(problem) {
    if (!editor) return;
    const cached = localStorage.getItem(`code_python_${problem.id}`);
    if (cached) {
        editor.setValue(cached);
    } else {
        editor.setValue(problem.starterCode || '');
    }
}

// Pyodide Core Python Execution Sandbox
async function runCode(isSubmit = false) {
    if (!editor || !currentProblem) return;

    const userCode = editor.getValue();
    const consoleContent = document.getElementById("console-content");
    consoleContent.innerHTML = `<div style="color: var(--text-muted)">Running tests...</div>`;

    if (localStorage.getItem(`status_${currentProblem.id}`) !== "solved") {
        localStorage.setItem(`status_${currentProblem.id}`, "attempted");
    }

    localStorage.setItem(`code_python_${currentProblem.id}`, userCode);

    if (!pyodide) {
        consoleContent.innerHTML = `<div style="color: var(--text-muted)">Initializing Python runtime (Pyodide WebAssembly)...</div>`;
        try {
            await initPyodide();
        } catch (e) {
            consoleContent.innerHTML = `<div style="color: var(--difficulty-hard)">Failed to load Python runtime: ${e.message}</div>`;
            return;
        }
    }

    consoleContent.innerHTML = `<div style="color: var(--text-muted)">Running Python tests...</div>`;
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
        pyodide.globals.set("user_code", userCode);
        pyodide.globals.set("test_cases_json", JSON.stringify(currentProblem.testCases));
        pyodide.globals.set("entry_point_name", currentProblem.entryPoint || "calculate");
        pyodide.globals.set("is_class_design", !!currentProblem.isClassDesign);
        pyodide.globals.set("class_name_str", currentProblem.className || "");

        // Inject helper code templates inside the runner script based on problem parameters
        let helpersSnippet = `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        curr = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            curr.left = TreeNode(arr[i])
            queue.append(curr.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            curr.right = TreeNode(arr[i])
            queue.append(curr.right)
        i += 1
    return root

def find_tree_node(root, val):
    if not root: return None
    if root.val == val: return root
    return find_tree_node(root.left, val) or find_tree_node(root.right, val)

globals()['TreeNode'] = TreeNode
`;
        if (currentProblem.id === "clone-graph") {
            helpersSnippet += `
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def build_graph(adj_list):
    if not adj_list: return None
    nodes = {i+1: Node(i+1) for i in range(len(adj_list))}
    for i, neighbors in enumerate(adj_list):
        nodes[i+1].neighbors = [nodes[n] for n in neighbors]
    return nodes[1]

def graph_to_adj(node):
    if not node: return []
    visited = {}
    def dfs(n):
        if n.val in visited: return
        visited[n.val] = sorted([neighbor.val for neighbor in n.neighbors])
        for neighbor in n.neighbors:
            dfs(neighbor)
    dfs(node)
    return [visited[k] for k in sorted(visited.keys())]

globals()['Node'] = Node
`;
        } else if (currentProblem.id === "mini-parser") {
            helpersSnippet += `
class NestedInteger:
    def __init__(self, value=None):
        if value is not None:
            self._integer = value
            self._list = None
        else:
            self._integer = None
            self._list = []
    def isInteger(self):
        return self._integer is not None
    def getInteger(self):
        return self._integer
    def setInteger(self, value):
        self._integer = value
        self._list = None
    def add(self, elem):
        if self._list is None:
            self._list = []
        self._list.append(elem)
    def getList(self):
        return self._list

def serialize_nested(ni):
    if ni.isInteger():
        return ni.getInteger()
    return [serialize_nested(x) for x in ni.getList()]

globals()['NestedInteger'] = NestedInteger
`;
        }

        const runnerScript = `
import json
import sys
import io
import re
import traceback
from collections import defaultdict, deque
from typing import List, Dict, Set, Optional, Tuple
import math
import heapq
import bisect

sys.stdout = io.StringIO()

class StepLimitExceeded(Exception):
    pass

step_counter = 0
MAX_STEPS = 500000

def step_tracer(frame, event, arg):
    global step_counter
    if event == 'line':
        step_counter += 1
        if step_counter > MAX_STEPS:
            raise StepLimitExceeded("Time Limit Exceeded: Maximum execution steps limit (500,000 operations) reached. Check for infinite loops or deep recursion.")
    return step_tracer

def extract_error_details(exc, user_code_str):
    exc_type = type(exc).__name__
    exc_msg = str(exc)
    line_no = None
    col_no = None
    func_name = ""
    
    if isinstance(exc, SyntaxError):
        line_no = exc.lineno
        col_no = exc.offset
        if exc.msg:
            exc_msg = exc.msg
    else:
        tb = exc.__traceback__
        frames = []
        user_lines = user_code_str.split('\\n') if user_code_str else []
        user_lines_count = len(user_lines)
        
        while tb:
            frame = tb.tb_frame
            lineno = tb.tb_lineno
            filename = frame.f_code.co_filename
            co_name = frame.f_code.co_name
            
            if filename == "<string>" and 1 <= lineno <= user_lines_count:
                frames.append((lineno, co_name))
            tb = tb.tb_next
            
        if frames:
            line_no, func_name = frames[-1]

    raw_tb = traceback.format_exception(type(exc), exc, exc.__traceback__)
    clean_lines = []
    prev_line = None
    repeat_count = 0
    
    for l in raw_tb:
        if 'exec(user_code' in l or 'pyodide.runPython' in l or 'json_result =' in l:
            continue
        cleaned_l = l.replace('File "<string>"', 'File "solution.py"')
        
        if cleaned_l == prev_line:
            repeat_count += 1
            if repeat_count == 2:
                clean_lines.append("  [... repeated stack frames collapsed ...]\\n")
            continue
        else:
            prev_line = cleaned_l
            repeat_count = 0
            clean_lines.append(cleaned_l)
            
    clean_tb = "".join(clean_lines).strip()
    
    line_code = ""
    if line_no and user_code_str:
        user_lines = user_code_str.split('\\n')
        if 1 <= line_no <= len(user_lines):
            line_code = user_lines[line_no - 1]
            
    return {
        "error_type": exc_type,
        "error_message": exc_msg,
        "line_number": line_no,
        "column_number": col_no,
        "func_name": func_name,
        "line_code": line_code,
        "traceback": clean_tb
    }

${helpersSnippet}

try:
    exec(user_code, globals())
except Exception as init_err:
    err_details = extract_error_details(init_err, user_code)
    json_result = json.dumps([{
        "success": False,
        "is_init_error": True,
        "error": str(init_err),
        "error_info": err_details,
        "traceback": err_details["traceback"],
        "stdout": sys.stdout.getvalue()
    }])
else:
    test_cases = json.loads(test_cases_json)
    results = []
    for idx, tc in enumerate(test_cases):
        sys.stdout.seek(0)
        sys.stdout.truncate(0)
        step_counter = 0
        sys.settrace(step_tracer)
        
        input_str = tc["input"]
        try:
            parsed_input = json.loads(input_str)
        except:
            parsed_input = input_str
            
        try:
            if is_class_design:
                if isinstance(parsed_input, list) and len(parsed_input) == 2 and isinstance(parsed_input[0], list):
                    commands = parsed_input[0]
                    arguments = parsed_input[1]
                else:
                    commands = parsed_input["commands"]
                    arguments = parsed_input["arguments"]
                obj = None
                outputs = []
                
                ClassEntity = globals().get(class_name_str)
                if ClassEntity is None:
                    raise Exception(f"Class '{class_name_str}' not found in your code.")
                
                for k in range(len(commands)):
                    cmd = commands[k]
                    args = arguments[k]
                    if cmd == class_name_str:
                        obj = ClassEntity(*args)
                        outputs.append(None)
                    else:
                        if obj is None:
                            raise Exception("Instance was not initialized.")
                        method = getattr(obj, cmd)
                        res = method(*args)
                        outputs.append(res if res is not None else None)
                actual_output = outputs
            else:
                SolutionClass = globals().get("Solution")
                if SolutionClass is not None:
                    try:
                        sol_obj = SolutionClass()
                        func = getattr(sol_obj, entry_point_name, None)
                    except:
                        func = None
                else:
                    func = None
                
                if func is None:
                    func = globals().get(entry_point_name)
                
                if func is None:
                    raise Exception(f"Function or method '{entry_point_name}' not found.")
                
                curr_id = "${currentProblem.id}"
                if curr_id == "clone-graph":
                    root_node = build_graph(parsed_input)
                    cloned_root = func(root_node)
                    actual_output = graph_to_adj(cloned_root)
                elif curr_id == "mini-parser":
                    arg = parsed_input[0] if isinstance(parsed_input, list) and len(parsed_input) == 1 else parsed_input
                    res_ni = func(arg)
                    actual_output = serialize_nested(res_ni)
                elif curr_id == "walls-and-gates":
                    rooms = parsed_input[0] if isinstance(parsed_input, list) and len(parsed_input) == 1 else parsed_input
                    func(rooms)
                    actual_output = rooms
                elif curr_id == "lowest-common-ancestor-of-a-binary-tree":
                    root = build_tree(parsed_input[0])
                    p = find_tree_node(root, parsed_input[1])
                    q = find_tree_node(root, parsed_input[2])
                    res_node = func(root, p, q)
                    actual_output = res_node.val if res_node else None
                else:
                    if isinstance(parsed_input, list):
                        import inspect
                        try:
                            params = inspect.signature(func).parameters
                            has_var_positional = any(p.kind == inspect.Parameter.VAR_POSITIONAL for p in params.values())
                            if len(parsed_input) == len(params) or has_var_positional:
                                actual_output = func(*parsed_input)
                            else:
                                actual_output = func(parsed_input)
                        except Exception as sig_err:
                            try:
                                actual_output = func(*parsed_input)
                            except TypeError:
                                actual_output = func(parsed_input)
                    else:
                        actual_output = func(parsed_input)
                        
            captured_stdout = sys.stdout.getvalue()
            results.append({
                "success": True,
                "actual": actual_output,
                "stdout": captured_stdout
            })
        except Exception as e:
            captured_stdout = sys.stdout.getvalue()
            err_details = extract_error_details(e, user_code)
            results.append({
                "success": False,
                "error": str(e),
                "error_info": err_details,
                "traceback": err_details["traceback"],
                "stdout": captured_stdout
            })
        finally:
            sys.settrace(None)
    json_result = json.dumps(results)
json_result
`;
        // Format string interpolation markers
        const compiledScript = runnerScript.replace("# __HELPERS_SNIPPET_PLACEHOLDER__", helpersSnippet).replace(/__PROBLEM_ID_PLACEHOLDER__/g, currentProblem.id);
        const pyResultJson = pyodide.runPython(compiledScript);
        const pyResults = JSON.parse(pyResultJson);
        
        if (pyResults.length === 1 && pyResults[0].is_init_error) {
            const err = pyResults[0];
            const errInfo = err.error_info || {
                error_type: "SyntaxError",
                error_message: err.error || "Compilation/Syntax error",
                traceback: err.traceback || ""
            };

            updateEditorMarkers(errInfo);

            let codePreviewHTML = "";
            if (errInfo.line_code) {
                let pointerStr = "";
                if (errInfo.column_number) {
                    pointerStr = " ".repeat(Math.max(0, errInfo.column_number - 1)) + "^";
                }
                codePreviewHTML = `
                    <div class="error-code-preview">
                        <div class="code-line-num">${errInfo.line_number}</div>
                        <div class="code-line-text">${escapeHtml(errInfo.line_code)}</div>
                        ${pointerStr ? `<div class="code-pointer">${pointerStr}</div>` : ''}
                    </div>
                `;
            }

            let jumpBtnHTML = "";
            if (errInfo.line_number) {
                jumpBtnHTML = `
                    <button class="btn-jump-error" onclick="jumpToLine(${errInfo.line_number})">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        Jump to Line ${errInfo.line_number} in Editor
                    </button>
                `;
            }

            consoleContent.innerHTML = `
                <div class="compilation-error-card">
                    <div class="error-header">
                        <span class="error-badge error-badge-syntax">${escapeHtml(errInfo.error_type || "Compilation Error")}</span>
                        ${errInfo.line_number ? `<span class="error-location">Line ${errInfo.line_number}${errInfo.column_number ? `:${errInfo.column_number}` : ''}</span>` : ''}
                    </div>
                    <div class="error-message-text">${escapeHtml(errInfo.error_type)}: ${escapeHtml(errInfo.error_message)}</div>
                    ${codePreviewHTML}
                    ${jumpBtnHTML}
                    ${errInfo.traceback ? `
                        <div style="margin-top: 0.75rem;">
                            <button class="btn-toggle-traceback" id="btn-tb-init" onclick="toggleTraceback('tb-init')">Show Full Traceback</button>
                            <pre id="tb-init" class="traceback-content-collapsible" style="display: none; margin-top: 0.5rem;">${escapeHtml(errInfo.traceback)}</pre>
                        </div>
                    ` : ''}
                </div>
            `;
            return;
        }

        let allPassed = true;
        let passedCount = 0;
        const totalCount = currentProblem.testCases.length;
        let firstErrorLine = null;
        let resultsHTML = `<div class="testcase-results-grid">`;

        currentProblem.testCases.forEach((tc, idx) => {
            const runResult = pyResults[idx];
            let isSuccess = false;
            let actualStr = "";
            let errorOccurred = false;
            let stdoutHTML = "";
            let statusText = "Passed";
            let statusClass = "passed";
            let errorBoxHTML = "";

            if (runResult && runResult.success) {
                const actualOutput = runResult.actual;
                
                let parsedInput;
                try {
                    parsedInput = JSON.parse(tc.input);
                } catch (e) {
                    parsedInput = tc.input;
                }

                if (currentProblem.id === "course-schedule-ii") {
                    isSuccess = validateCourseScheduleII(parsedInput[0], parsedInput[1], actualOutput);
                } else if (currentProblem.id === "alien-dictionary") {
                    isSuccess = validateAlienDictionary(parsedInput[0], actualOutput);
                } else {
                    isSuccess = isEqual(actualOutput, tc.expected);
                }

                actualStr = typeof actualOutput === "object" ? JSON.stringify(actualOutput) : String(actualOutput);
                if (!isSuccess) {
                    statusText = "Wrong Answer";
                    statusClass = "wrong-answer";
                }
            } else {
                errorOccurred = true;
                isSuccess = false;
                const errInfo = (runResult && runResult.error_info) ? runResult.error_info : {
                    error_type: "RuntimeError",
                    error_message: runResult ? runResult.error : "Execution failed",
                    traceback: runResult ? runResult.traceback : ""
                };

                let tagClass = "runtime-error";
                if (errInfo.error_type === "StepLimitExceeded" || errInfo.error_type === "TimeoutError") {
                    statusText = "Time Limit Exceeded";
                    statusClass = "tle";
                    tagClass = "tle";
                } else {
                    statusText = "Runtime Error";
                    statusClass = "runtime-error";
                }

                if (!firstErrorLine && errInfo.line_number) {
                    firstErrorLine = errInfo;
                }

                errorBoxHTML = `
                    <div class="error-details-box">
                        <div class="error-title">
                            <span class="error-type-tag ${tagClass}">${escapeHtml(errInfo.error_type)}</span>
                            <span class="error-msg-inline">${escapeHtml(errInfo.error_message)}</span>
                        </div>
                        ${errInfo.line_number ? `
                            <div class="error-sub-info">Occurred at <strong>Line ${errInfo.line_number}</strong>${errInfo.func_name ? ` in <code>${escapeHtml(errInfo.func_name)}()</code>` : ''}</div>
                        ` : ''}
                        ${errInfo.line_code ? `
                            <div class="error-code-preview">
                                <div class="code-line-num">${errInfo.line_number}</div>
                                <div class="code-line-text">${escapeHtml(errInfo.line_code)}</div>
                            </div>
                        ` : ''}
                        <div class="error-actions">
                            ${errInfo.line_number ? `<button class="btn-jump-error-sm" onclick="jumpToLine(${errInfo.line_number})">Jump to Line ${errInfo.line_number}</button>` : ''}
                            ${errInfo.traceback ? `<button class="btn-toggle-traceback" id="btn-tb-tc-${idx}" onclick="toggleTraceback('tb-tc-${idx}')">Show Traceback</button>` : ''}
                        </div>
                        ${errInfo.traceback ? `<pre id="tb-tc-${idx}" class="traceback-content-collapsible" style="display: none; margin-top: 0.5rem;">${escapeHtml(errInfo.traceback)}</pre>` : ''}
                    </div>
                `;
            }

            if (isSuccess) {
                passedCount++;
            } else {
                allPassed = false;
            }

            if (runResult && runResult.stdout && runResult.stdout.trim() !== "") {
                stdoutHTML = `
                    <div class="stdout-container" style="margin-top: 0.5rem; background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: 4px; border-left: 3px solid var(--secondary);">
                        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Stdout</div>
                        <pre style="font-family: monospace; font-size: 0.8rem; margin: 0; white-space: pre-wrap; color: var(--text-main);">${escapeHtml(runResult.stdout)}</pre>
                    </div>
                `;
            }

            const expectedStr = typeof tc.expected === "object" ? JSON.stringify(tc.expected) : tc.expected;

            // Hidden testcase display logic (Mock mode hides ALL outputs, normal mode hides tags marked 'hidden')
            const isHidden = tc.hidden || isMockMode;

            if (isHidden) {
                resultsHTML += `
                    <div class="testcase-card ${isSuccess ? 'success' : 'failure'}">
                        <div class="testcase-card-header">
                            <span>Test Case ${idx + 1} (Hidden)</span>
                            <span class="testcase-status ${statusClass}">${statusText}</span>
                        </div>
                        <div class="testcase-card-body">
                            <span style="color: var(--text-muted); font-style: italic;">Outputs hidden for mock/hidden test evaluation.</span>
                            ${errorBoxHTML}
                            ${stdoutHTML}
                        </div>
                    </div>
                `;
            } else {
                resultsHTML += `
                    <div class="testcase-card ${isSuccess ? 'success' : 'failure'}">
                        <div class="testcase-card-header">
                            <span>Test Case ${idx + 1}</span>
                            <span class="testcase-status ${statusClass}">${statusText}</span>
                        </div>
                        <div class="testcase-card-body">
                            <span>Input: <strong>${escapeHtml(tc.input)}</strong></span>
                            ${errorOccurred ? errorBoxHTML : `
                                <span>Expected Output: <strong>${escapeHtml(expectedStr)}</strong></span>
                                <span>Your Output: <strong style="color: ${isSuccess ? 'var(--difficulty-easy)' : 'var(--difficulty-hard)'}">${escapeHtml(actualStr)}</strong></span>
                            `}
                            ${stdoutHTML}
                        </div>
                    </div>
                `;
            }
        });

        resultsHTML += `</div>`;

        const passPercentage = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;
        const summaryTitle = isSubmit ? (allPassed ? "Accepted" : "Submission Failed") : (allPassed ? "All Tests Passed" : "Execution Failed");
        const summaryClass = allPassed ? "accepted" : "rejected";
        const bannerClass = allPassed ? "success" : "failure";

        const summaryBannerHTML = `
            <div class="submission-summary-banner ${bannerClass}">
                <div class="summary-banner-header">
                    <span class="summary-badge-title ${summaryClass}">
                        ${allPassed ? '✓' : '✗'} ${summaryTitle}
                    </span>
                    <span class="summary-count-tag">${passedCount} / ${totalCount} Test Cases Passed (${passPercentage}%)</span>
                </div>
                <div class="summary-progress-bg">
                    <div class="summary-progress-fill ${bannerClass}" style="width: ${passPercentage}%;"></div>
                </div>
            </div>
        `;

        let consoleFollowupHTML = "";
        if (allPassed && isSubmit && currentProblem.followUps && currentProblem.followUps.length > 0) {
            consoleFollowupHTML = `
                <div class="console-followup-card">
                    <div class="console-followup-title">💡 Follow-up Questions to Consider:</div>
                    <ul class="console-followup-list">
                        ${currentProblem.followUps.map(q => `<li>${escapeHtml(q)}</li>`).join("")}
                    </ul>
                </div>
            `;
        }

        consoleContent.innerHTML = summaryBannerHTML + consoleFollowupHTML + resultsHTML;

        // Update Monaco Editor markers: if there's a runtime error, mark the first failing line
        if (firstErrorLine) {
            updateEditorMarkers(firstErrorLine);
        } else {
            updateEditorMarkers(null);
        }

        if (allPassed) {
            if (isSubmit) {
                localStorage.setItem(`status_${currentProblem.id}`, "solved");
                
                // Load follow-up questions into modal
                const fuSection = document.getElementById("followup-section");
                const fuList = document.getElementById("followup-list");
                fuList.innerHTML = "";
                
                if (currentProblem.followUps && currentProblem.followUps.length > 0) {
                    currentProblem.followUps.forEach(q => {
                        const li = document.createElement("li");
                        li.innerText = q;
                        fuList.appendChild(li);
                    });
                    fuSection.style.display = "block";
                } else {
                    fuSection.style.display = "none";
                }
                
                showSuccessModal();
            }
        }


    } catch (pyErr) {
        console.error("Pyodide execution error:", pyErr);
        consoleContent.innerHTML = `
            <div style="color: var(--difficulty-hard); font-weight: 700; margin-bottom: 0.5rem;">Python Execution Error:</div>
            <pre style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 1rem; border-radius: 8px; font-family: monospace; white-space: pre-wrap; color: var(--difficulty-hard);">${pyErr.message || pyErr}</pre>
        `;
    }
}

// Show success modal
function showSuccessModal() {
    document.getElementById("success-modal-overlay").style.display = "flex";
}

// Course Schedule II custom validation
function validateCourseScheduleII(numCourses, prerequisites, output) {
    if (!Array.isArray(output)) return false;
    if (output.length === 0) {
        return hasCycleInCourseSchedule(numCourses, prerequisites);
    }
    if (output.length !== numCourses) return false;
    const seen = new Set(output);
    if (seen.size !== numCourses) return false;
    for (let i = 0; i < numCourses; i++) {
        if (output[i] < 0 || output[i] >= numCourses) return false;
    }
    const indices = {};
    for (let i = 0; i < numCourses; i++) {
        indices[output[i]] = i;
    }
    for (let [a, b] of prerequisites) {
        if (indices[b] > indices[a]) return false;
    }
    return true;
}

function hasCycleInCourseSchedule(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = Array(numCourses).fill(0);
    for (let [a, b] of prerequisites) {
        adj[b].push(a);
        inDegree[a]++;
    }
    const q = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) q.push(i);
    }
    let count = 0;
    while (q.length > 0) {
        let u = q.shift();
        count++;
        for (let v of adj[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) q.push(v);
        }
    }
    return count !== numCourses;
}

// Alien Dictionary custom validation
function validateAlienDictionary(words, output) {
    if (typeof output !== 'string') return false;
    
    const uniqueChars = new Set();
    for (let w of words) {
        for (let c of w) {
            uniqueChars.add(c);
        }
    }
    
    if (output === "") {
        return hasCycleInAlienDictionary(words, uniqueChars);
    }
    
    if (output.length !== uniqueChars.size) return false;
    const outputSet = new Set(output);
    if (outputSet.size !== uniqueChars.size) return false;
    for (let c of output) {
        if (!uniqueChars.has(c)) return false;
    }
    
    const indices = {};
    for (let i = 0; i < output.length; i++) {
        indices[output[i]] = i;
    }
    
    for (let i = 0; i < words.length - 1; i++) {
        let w1 = words[i];
        let w2 = words[i+1];
        let len = Math.min(w1.length, w2.length);
        
        if (w1.length > w2.length && w1.startsWith(w2)) {
            return false; 
        }
        
        for (let j = 0; j < len; j++) {
            if (w1[j] !== w2[j]) {
                let idx1 = indices[w1[j]];
                let idx2 = indices[w2[j]];
                if (idx1 === undefined || idx2 === undefined || idx1 > idx2) {
                    return false;
                }
                break;
            }
        }
    }
    return true;
}

function hasCycleInAlienDictionary(words, uniqueChars) {
    const adj = {};
    const inDegree = {};
    for (let c of uniqueChars) {
        adj[c] = new Set();
        inDegree[c] = 0;
    }
    
    for (let i = 0; i < words.length - 1; i++) {
        let w1 = words[i];
        let w2 = words[i+1];
        if (w1.length > w2.length && w1.startsWith(w2)) return true;
        let len = Math.min(w1.length, w2.length);
        for (let j = 0; j < len; j++) {
            if (w1[j] !== w2[j]) {
                if (!adj[w1[j]].has(w2[j])) {
                    adj[w1[j]].add(w2[j]);
                    inDegree[w2[j]]++;
                }
                break;
            }
        }
    }
    
    const q = [];
    for (let c in inDegree) {
        if (inDegree[c] === 0) q.push(c);
    }
    
    let count = 0;
    while (q.length > 0) {
        let u = q.shift();
        count++;
        for (let v of adj[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) q.push(v);
        }
    }
    return count !== uniqueChars.size;
}

// ==========================================
// VISUALIZER MODULE LOGIC
// ==========================================
function startVisualization() {
    const expr = document.getElementById("visualizer-expr-input").value.trim();
    if (!expr) return;
    
    if (currentProblem && currentProblem.id === "evaluate-reverse-polish-notation") {
        generateRPNSteps(expr);
    } else {
        visualizer.generateSteps(expr);
    }

    renderVisualizerState();
}

function generateRPNSteps(s) {
    visualizer.states = [];
    visualizer.currentStateIndex = 0;
    
    const tokens = s.split(/[\s,]+/).filter(t => t.length > 0);
    const valuesStack = [];
    
    const pushState = (tokIdx, desc, highlightTok = null) => {
        let highlightedExpr = tokens.map((t, idx) => {
            if (idx === tokIdx) {
                return `<span class="highlight-char">${t}</span>`;
            }
            return t;
        }).join(" ");

        visualizer.states.push({
            index: tokIdx,
            highlightedExpr: highlightedExpr,
            valuesStack: [...valuesStack],
            opsStack: [],
            description: desc,
            completed: false
        });
    };

    pushState(-1, "Start RPN evaluation. Stack is currently empty.");

    tokens.forEach((tok, idx) => {
        if (tok === '+' || tok === '-' || tok === '*' || tok === '/') {
            pushState(idx, `Encountered operator <strong>'${tok}'</strong>. Popping two values from the stack to apply it.`, tok);
            if (valuesStack.length < 2) {
                pushState(idx, `Error: Insufficient operands for operator '${tok}'.`);
                return;
            }
            let b = valuesStack.pop();
            let a = valuesStack.pop();
            let res = 0;
            if (tok === '+') res = a + b;
            else if (tok === '-') res = a - b;
            else if (tok === '*') res = a * b;
            else if (tok === '/') res = Math.trunc(a / b);
            
            valuesStack.push(res);
            pushState(idx, `Popped operands <strong>${a}</strong> and <strong>${b}</strong>. Evaluated <strong>${a} ${tok} ${b} = ${res}</strong>. Pushed result back onto the stack.`, tok);
        } else {
            let num = parseInt(tok);
            if (isNaN(num)) {
                pushState(idx, `Error: Invalid token '${tok}' encountered.`);
            } else {
                valuesStack.push(num);
                pushState(idx, `Encountered number <strong>${num}</strong>. Pushing it onto the stack.`, tok);
            }
        }
    });

    const finalResult = valuesStack.length > 0 ? valuesStack[0] : 0;
    visualizer.states.push({
        index: -1,
        highlightedExpr: tokens.join(" "),
        valuesStack: [...valuesStack],
        opsStack: [],
        description: `Evaluation finished. The final RPN result is <strong>${finalResult}</strong>.`,
        completed: true,
        result: finalResult
    });
}

function renderVisualizerState() {
    const states = visualizer.states;
    const index = visualizer.currentStateIndex;
    if (!states || states.length === 0) return;

    const state = states[index];

    document.getElementById("expr-display").innerHTML = state.highlightedExpr;

    const opsStackEl = document.getElementById("ops-stack-visualizer");
    const valStackEl = document.getElementById("values-stack-visualizer");

    opsStackEl.innerHTML = "";
    valStackEl.innerHTML = "";

    if (state.opsStack && state.opsStack.length > 0) {
        state.opsStack.forEach(op => {
            const div = document.createElement("div");
            div.className = "stack-item operator";
            div.innerText = op;
            opsStackEl.appendChild(div);
        });
    } else {
        opsStackEl.innerHTML = `<span class="stack-empty">Empty</span>`;
    }

    if (state.valuesStack && state.valuesStack.length > 0) {
        state.valuesStack.forEach(val => {
            const div = document.createElement("div");
            div.className = "stack-item operand";
            div.innerText = val;
            valStackEl.appendChild(div);
        });
    } else {
        valStackEl.innerHTML = `<span class="stack-empty">Empty</span>`;
    }

    document.getElementById("step-description").innerHTML = state.description;
    document.getElementById("btn-vis-prev").disabled = (index === 0);
    document.getElementById("btn-vis-next").disabled = (index === states.length - 1);
    
    const playBtn = document.getElementById("btn-vis-play");
    if (isPlaying) {
        playBtn.innerHTML = "⏸";
        playBtn.title = "Pause Auto-play";
    } else {
        playBtn.innerHTML = "▶";
        playBtn.title = "Auto-play";
    }
}

function stepVisualization(direction) {
    const states = visualizer.states;
    if (!states || states.length === 0) return;

    let targetIndex = visualizer.currentStateIndex + direction;
    if (targetIndex >= 0 && targetIndex < states.length) {
        visualizer.currentStateIndex = targetIndex;
        renderVisualizerState();
    }
    
    if (visualizer.currentStateIndex === states.length - 1) {
        pausePlayback();
    }
}

function resetVisualization() {
    visualizer.currentStateIndex = 0;
    renderVisualizerState();
}

function togglePlayback() {
    if (isPlaying) {
        pausePlayback();
    } else {
        playPlayback();
    }
}

function playPlayback() {
    const states = visualizer.states;
    if (!states || states.length === 0) return;

    if (visualizer.currentStateIndex === states.length - 1) {
        visualizer.currentStateIndex = 0;
    }

    isPlaying = true;
    renderVisualizerState();

    playbackTimer = setInterval(() => {
        stepVisualization(1);
    }, playbackSpeed);
}

function pausePlayback() {
    isPlaying = false;
    if (playbackTimer) {
        clearInterval(playbackTimer);
        playbackTimer = null;
    }
    renderVisualizerState();
}
