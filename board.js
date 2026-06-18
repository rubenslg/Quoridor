// Funcție care populează matricele cu valoarea 0
function initializareMatrici() {
    ziduriOrizontale = [];
    ziduriVerticale = [];
    
    // Alocăm dinamic liniile și coloanele
    for (let r = 0; r < randuri - 1; r++) {
        let rand = [];
        for (let c = 0; c < coloane; c++) {
            rand.push(0);
        }
        ziduriOrizontale.push(rand);
    }
    
    for (let r = 0; r < randuri; r++) {
        let rand = [];
        for (let c = 0; c < coloane - 1; c++) {
            rand.push(0);
        }
        ziduriVerticale.push(rand);
    }
}

// Desenează cele 9x9 celule
function deseneazaTabla() {
    for (let i = 0; i < randuri; i++) {
        for (let j = 0; j < coloane; j++) {
            let px = j * (dimensiuneCelula + grosimeZid);
            let py = i * (dimensiuneCelula + grosimeZid);
            fill(150, 100, 50); // Culoare maro
            noStroke();
            rect(px, py, dimensiuneCelula, dimensiuneCelula);
        }
    }
}

// Parcurge matricele și desenează zidurile active pe ecran
function deseneazaZiduri() {
    fill(0); // Zidurile vor fi reprezentate cu negru
    
    // Randare ziduri orizontale
    for (let r = 0; r < randuri - 1; r++) {
        for (let c = 0; c < coloane; c++) {
            if (ziduriOrizontale[r][c] === 1) {
                let px = c * (dimensiuneCelula + grosimeZid);
                let py = r * (dimensiuneCelula + grosimeZid) + dimensiuneCelula;
                rect(px, py, dimensiuneCelula * 2 + grosimeZid, grosimeZid);
            }
        }
    }
    
    // Randare ziduri verticale
    for (let r = 0; r < randuri; r++) {
        for (let c = 0; c < coloane - 1; c++) {
            if (ziduriVerticale[r][c] === 1) {
                let px = c * (dimensiuneCelula + grosimeZid) + dimensiuneCelula;
                let py = r * (dimensiuneCelula + grosimeZid);
                rect(px, py, grosimeZid, dimensiuneCelula * 2 + grosimeZid);
            }
        }
    }
}

// VERIFICARE COLIZIUNE: Pion cu Zid
function faraZidInCale(x1, y1, x2, y2) {
    // Mutare in JOS
    if (y2 === y1 + 1 && x2 === x1) {
        if (ziduriOrizontale[y1][x1] === 1) return false;
        if (x1 > 0 && ziduriOrizontale[y1][x1 - 1] === 1) return false; 
    }
    // Mutare in SUS
    if (y2 === y1 - 1 && x2 === x1) {
        if (ziduriOrizontale[y2][x1] === 1) return false;
        if (x1 > 0 && ziduriOrizontale[y2][x1 - 1] === 1) return false;
    }
    // Mutare in DREAPTA
    if (x2 === x1 + 1 && y2 === y1) {
        if (ziduriVerticale[y1][x1] === 1) return false;
        if (y1 > 0 && ziduriVerticale[y1 - 1][x1] === 1) return false; 
    }
    // Mutare in STANGA
    if (x2 === x1 - 1 && y2 === y1) {
        if (ziduriVerticale[y1][x2] === 1) return false;
        if (y1 > 0 && ziduriVerticale[y1 - 1][x2] === 1) return false;
    }
    return true; // Drumul este liber
}

// VERIFICARE COLIZIUNE: Zid cu Zid (Suprapuneri)
function poatePuneZid(rand, col, tip) {
    if (tip === "O") {
        if (ziduriOrizontale[rand][col] === 1) return false; 
        if (ziduriVerticale[rand][col] === 1) return false; 
        if (col > 0 && ziduriOrizontale[rand][col-1] === 1) return false; 
        if (col < coloane - 2 && ziduriOrizontale[rand][col+1] === 1) return false; 
    } else {
        if (ziduriVerticale[rand][col] === 1) return false;
        if (ziduriOrizontale[rand][col] === 1) return false;
        if (rand > 0 && ziduriVerticale[rand-1][col] === 1) return false;
        if (rand < randuri - 2 && ziduriVerticale[rand+1][col] === 1) return false;
    }
    return true; // Locul este valid
}