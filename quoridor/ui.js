// ui.js
// Gestioneaza interfata HTML: butoane, inputuri, culori, update vizual

// --- Actualizare UI dupa fiecare mutare ---

function updateUI() {
    const cp = GameState.currentPlayer;
    const playerName = GameState.players[cp].name;

    document.getElementById("current-player-name").textContent = playerName;
    document.getElementById("p1-walls").textContent = GameState.players[1].wallsLeft;
    document.getElementById("p2-walls").textContent = GameState.players[2].wallsLeft;

    const p1badge = document.getElementById("p1-turn-badge");
    const p2badge = document.getElementById("p2-turn-badge");

    if (cp === 1) {
        p1badge.textContent = "✔ Tura ta!";
        p1badge.className = "turn-badge active mt-3";
        p2badge.textContent = "Așteaptă...";
        p2badge.className = "turn-badge mt-3";
    } else {
        p2badge.textContent = "✔ Tura ta!";
        p2badge.className = "turn-badge active mt-3";
        p1badge.textContent = "Așteaptă...";
        p1badge.className = "turn-badge mt-3";
    }
}

// --- Schimbare mod (muta pion / zid orizontal / zid vertical) ---

function setMode(m) {
    GameState.mode = m;
    GameState.wallPreview = null;

    const normal = "btn";
    const active = "btn btn-active";

    document.getElementById("btn-move").className = normal;
    document.getElementById("btn-wall-h").className = normal;
    document.getElementById("btn-wall-v").className = normal;

    if (m === "move")   document.getElementById("btn-move").className = active;
    if (m === "wall-h") document.getElementById("btn-wall-h").className = active;
    if (m === "wall-v") document.getElementById("btn-wall-v").className = active;
}

// --- Reset joc ---

function resetGame() {
    GameState.init();
    document.getElementById("history").innerHTML = '<p class="italic text-gray-400">Nicio mutare încă...</p>';
    setMode("move");
}

// --- Undo ultima mutare ---

function undoMove() {
    GameState.undoLast();
}

// --- Schimbare dimensiune tabla ---

document.getElementById("board-size").onchange = function () {
    resetGame();
};

// --- Citire nume jucatori din input ---

document.getElementById("p1-name").oninput = function () {
    GameState.players[1].name = this.value || "Jucător 1";
    updateUI();
};

document.getElementById("p2-name").oninput = function () {
    GameState.players[2].name = this.value || "Jucător 2";
    updateUI();
};

// --- Alegere culoare pion ---

document.querySelectorAll("[data-color]").forEach(function (dot) {
    dot.onclick = function () {
        const player = this.dataset.player;
        const color = this.dataset.color;

        GameState.players[player].color = color;

        // reseteaza selectia pentru jucatorul respectiv
        document.querySelectorAll("[data-player='" + player + "']").forEach(function (d) {
            d.classList.remove("selected");
        });
        this.classList.add("selected");
    };
});
