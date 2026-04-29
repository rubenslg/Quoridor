// board.js
// Deseneaza tabla de joc (celulele + randurile tinta colorate)

function drawBoard(p) {
    const cs = GameState.cellSize;
    const bs = GameState.boardSize;

    for (let row = 0; row < bs; row++) {
        for (let col = 0; col < bs; col++) {

            // culori alternante pentru celule (ca o tabla de sah)
            if ((row + col) % 2 === 0) {
                p.fill(210, 180, 140);
            } else {
                p.fill(185, 148, 108);
            }

            p.stroke(120);
            p.strokeWeight(1);
            p.rect(col * cs, row * cs, cs, cs);
        }
    }

    // randul de sus - tinta jucator 1 (rosu transparent)
    p.noStroke();
    for (let col = 0; col < bs; col++) {
        p.fill(230, 57, 70, 70);
        p.rect(col * cs, 0, cs, cs);
    }

    // randul de jos - tinta jucator 2 (albastru transparent)
    for (let col = 0; col < bs; col++) {
        p.fill(33, 150, 243, 70);
        p.rect(col * cs, (bs - 1) * cs, cs, cs);
    }
}