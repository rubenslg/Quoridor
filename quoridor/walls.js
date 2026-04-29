// walls.js
// Deseneaza zidurile plasate si preview-ul zidului inainte de click

function drawWalls(p) {
    const cs = GameState.cellSize;

    for (let wall of GameState.walls) {
        const pColor = GameState.players[wall.player].color;
        const r = parseInt(pColor.slice(1, 3), 16);
        const g = parseInt(pColor.slice(3, 5), 16);
        const b = parseInt(pColor.slice(5, 7), 16);

        p.fill(r, g, b);
        p.noStroke();

        if (wall.dir === "h") {
            // zid orizontal - se intinde pe 2 celule in latime
            p.rect(wall.x * cs + 3, (wall.y + 1) * cs - 5, cs * 2 - 6, 10, 3);
        } else {
            // zid vertical - se intinde pe 2 celule in inaltime
            p.rect((wall.x + 1) * cs - 5, wall.y * cs + 3, 10, cs * 2 - 6, 3);
        }
    }
}

function drawWallPreview(p) {
    if (!GameState.wallPreview) return;

    const cs = GameState.cellSize;
    const w = GameState.wallPreview;
    const pColor = GameState.players[GameState.currentPlayer].color;
    const r = parseInt(pColor.slice(1, 3), 16);
    const g = parseInt(pColor.slice(3, 5), 16);
    const b = parseInt(pColor.slice(5, 7), 16);

    // acelasi desen dar semitransparent
    p.fill(r, g, b, 130);
    p.noStroke();

    if (w.dir === "h" && w.x < GameState.boardSize - 1) {
        p.rect(w.x * cs + 3, (w.y + 1) * cs - 5, cs * 2 - 6, 10, 3);
    } else if (w.dir === "v" && w.y < GameState.boardSize - 1) {
        p.rect((w.x + 1) * cs - 5, w.y * cs + 3, 10, cs * 2 - 6, 3);
    }
}
