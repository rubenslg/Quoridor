// gameState.js
// Contine datele jocului si logica de baza (mutari, ziduri, istoric)

const GameState = {
    boardSize: 9,
    cellSize: 60,
    canvasSize: 540,
    currentPlayer: 1,
    mode: "move",       // "move" | "wall-h" | "wall-v"
    walls: [],          // { x, y, dir, player }
    history: [],        // array de stringuri
    wallPreview: null,  // { x, y, dir } - preview zid inainte de click

    players: {
        1: { x: 4, y: 8, color: "#e63946", wallsLeft: 10, name: "Jucător 1" },
        2: { x: 4, y: 0, color: "#2196f3", wallsLeft: 10, name: "Jucător 2" }
    },

    init: function () {
        this.boardSize = parseInt(document.getElementById("board-size").value);
        this.cellSize = Math.floor(this.canvasSize / this.boardSize);
        this.currentPlayer = 1;
        this.mode = "move";
        this.walls = [];
        this.history = [];
        this.wallPreview = null;

        const mid = Math.floor(this.boardSize / 2);
        this.players[1].x = mid;
        this.players[1].y = this.boardSize - 1;
        this.players[1].wallsLeft = 10;
        this.players[2].x = mid;
        this.players[2].y = 0;
        this.players[2].wallsLeft = 10;

        updateUI();
    },

    switchPlayer: function () {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        updateUI();
    },

    movePawn: function (nx, ny) {
        const p = this.players[this.currentPlayer];
        const dx = Math.abs(nx - p.x);
        const dy = Math.abs(ny - p.y);

        // doar celule adiacente (sus/jos/stanga/dreapta)
        if (!((dx === 1 && dy === 0) || (dx === 0 && dy === 1))) return false;
        // sa ramana pe tabla
        if (nx < 0 || nx >= this.boardSize || ny < 0 || ny >= this.boardSize) return false;
        // sa nu se suprapuna cu celalalt jucator
        const other = this.players[this.currentPlayer === 1 ? 2 : 1];
        if (nx === other.x && ny === other.y) return false;

        this.addToHistory(p.name + " a mutat la (" + nx + ", " + ny + ")");
        p.x = nx;
        p.y = ny;
        this.switchPlayer();
        return true;
    },

    addWall: function (wx, wy, dir) {
        const p = this.players[this.currentPlayer];
        if (p.wallsLeft <= 0) return false;

        // nu permite doua ziduri identice in acelasi loc
        for (let w of this.walls) {
            if (w.x === wx && w.y === wy && w.dir === dir) return false;
        }

        this.walls.push({ x: wx, y: wy, dir: dir, player: this.currentPlayer });
        p.wallsLeft--;

        const dirText = dir === "h" ? "orizontal" : "vertical";
        this.addToHistory(p.name + " a pus zid " + dirText + " la (" + wx + ", " + wy + ")");

        document.getElementById("p" + this.currentPlayer + "-walls").textContent = p.wallsLeft;
        this.switchPlayer();
        return true;
    },

    addToHistory: function (msg) {
        this.history.push(msg);
        const histDiv = document.getElementById("history");
        histDiv.innerHTML = this.history.slice().reverse().map(
            m => "<p>" + m + "</p>"
        ).join("");
    },

    undoLast: function () {
        if (this.history.length === 0) return;

        this.history.pop();
        const histDiv = document.getElementById("history");

        if (this.history.length === 0) {
            histDiv.innerHTML = '<p class="italic text-gray-400">Nicio mutare încă...</p>';
        } else {
            histDiv.innerHTML = this.history.slice().reverse().map(
                m => "<p>" + m + "</p>"
            ).join("");
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        updateUI();
    }
};
