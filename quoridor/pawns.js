// pawns.js
// Deseneaza pioanele jucatorilor si highlight-ul celulelor accesibile

function drawPawns(p) {
    const cs = GameState.cellSize;

    for (let pid of [1, 2]) {
        const player = GameState.players[pid];
        const px = player.x * cs + cs / 2;
        const py = player.y * cs + cs / 2;

        // conversie culoare hex -> rgb
        const r = parseInt(player.color.slice(1, 3), 16);
        const g = parseInt(player.color.slice(3, 5), 16);
        const b = parseInt(player.color.slice(5, 7), 16);

        // cerc de glow pentru jucatorul curent
        if (pid === GameState.currentPlayer) {
            p.fill(r, g, b, 70);
            p.noStroke();
            p.circle(px, py, cs * 0.9);
        }

        // pionul in sine
        p.fill(r, g, b);
        p.stroke(0);
        p.strokeWeight(2);
        p.circle(px, py, cs * 0.6);

        // numarul jucatorului pe pion
        p.fill(255);
        p.noStroke();
        p.textSize(cs * 0.25);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(pid, px, py);
    }
}

function drawHoverHighlight(p) {
    if (GameState.mode !== "move") return;

    const cs = GameState.cellSize;
    const cell = getCellFromMouse(p);
    if (!cell) return;

    const player = GameState.players[GameState.currentPlayer];
    const dx = Math.abs(cell.col - player.x);
    const dy = Math.abs(cell.row - player.y);
    const isAdjacent = (dx === 1 && dy === 0) || (dx === 0 && dy === 1);

    if (isAdjacent) {
        p.fill(255, 255, 0, 120);
        p.noStroke();
        p.rect(cell.col * cs + 3, cell.row * cs + 3, cs - 6, cs - 6, 4);
    }
}
