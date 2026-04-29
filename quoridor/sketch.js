// sketch.js
// Setup P5.js: bucla de draw si evenimentele de mouse pe canvas

function getCellFromMouse(p) {
    const cs = GameState.cellSize;
    const bs = GameState.boardSize;
    const col = Math.floor(p.mouseX / cs);
    const row = Math.floor(p.mouseY / cs);

    if (col >= 0 && col < bs && row >= 0 && row < bs) {
        return { col: col, row: row };
    }
    return null;
}

const sketch = function (p) {

    p.setup = function () {
        const cnv = p.createCanvas(GameState.canvasSize, GameState.canvasSize);
        cnv.parent("canvas-container");
        GameState.init();
    };

    p.draw = function () {
        p.background(200);

        drawBoard(p);
        drawWallPreview(p);
        drawWalls(p);
        drawHoverHighlight(p);
        drawPawns(p);
    };

    // preview zid urmareste mouse-ul
    p.mouseMoved = function () {
        if (GameState.mode === "move") {
            GameState.wallPreview = null;
            return;
        }

        const cell = getCellFromMouse(p);
        if (cell) {
            GameState.wallPreview = {
                x: cell.col,
                y: cell.row,
                dir: GameState.mode === "wall-h" ? "h" : "v"
            };
        } else {
            GameState.wallPreview = null;
        }
    };

    // click pe canvas
    p.mousePressed = function () {
        const cell = getCellFromMouse(p);
        if (!cell) return;

        if (GameState.mode === "move") {
            GameState.movePawn(cell.col, cell.row);

        } else if (GameState.mode === "wall-h") {
            if (cell.col < GameState.boardSize - 1) {
                GameState.addWall(cell.col, cell.row, "h");
            }

        } else if (GameState.mode === "wall-v") {
            if (cell.row < GameState.boardSize - 1) {
                GameState.addWall(cell.col, cell.row, "v");
            }
        }
    };
};

new p5(sketch);
