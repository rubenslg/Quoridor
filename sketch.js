// Se execută o singură dată la inițializare
function setup() {
    let latimeCanvas = coloane * dimensiuneCelula + (coloane - 1) * grosimeZid;
    let inaltimeCanvas = randuri * dimensiuneCelula + (randuri - 1) * grosimeZid;
    
    let canvas = createCanvas(latimeCanvas, inaltimeCanvas);
    canvas.parent('canvas-container'); 
    
    initializareMatrici();
}

// Buclă de desenare continuă a P5.js
function draw() {
    background(240); 

    deseneazaTabla();    
    deseneazaZiduri();   
    deseneazaJucatori(); 
    deseneazaHover();    
    
    // Verificăm dacă e rândul AI-ului și aplicăm un delay pentru naturalețe
    if (!jocTerminat && jucatorCurent === 2 && modJocSelectat !== "human") {
        jocTerminat = true; // Blocăm clicurile jucătorului uman
        setTimeout(executaMutaCalculator, 600); 
    }
}

// Funcția chemată de butonul din HTML
function startGame() {
    jucator1.nume = document.getElementById("numeJ1").value;
    jucator1.culoare = document.getElementById("culoareJ1").value;
    jucator2.nume = document.getElementById("numeJ2").value;
    jucator2.culoare = document.getElementById("culoareJ2").value;
    modJocSelectat = document.getElementById("modJoc").value;

    jucator1.x = 4; jucator1.y = 8;
    jucator2.x = 4; jucator2.y = 0;
    
    jucatorCurent = 1;
    jocTerminat = false;
    initializareMatrici();
    
    actualizareMesaj("Este rândul lui: " + jucator1.nume);
}

// Interacțiunea umană pe pânză
function mousePressed() {
    if (jocTerminat || (jucatorCurent === 2 && modJocSelectat !== "human")) return;

    let col = Math.floor(mouseX / (dimensiuneCelula + grosimeZid));
    let rand = Math.floor(mouseY / (dimensiuneCelula + grosimeZid));

    let actiune = document.getElementById("tipActiune").value;
    let jucator = jucatorCurent === 1 ? jucator1 : jucator2;

    if (col >= 0 && col < coloane && rand >= 0 && rand < randuri) {
        
        if (actiune === "muta") {
            let dx = Math.abs(jucator.x - col);
            let dy = Math.abs(jucator.y - rand);
            
            // Verificam legalitatea mutării și lipsa zidurilor
            if (((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) && faraZidInCale(jucator.x, jucator.y, col, rand)) {
                jucator.x = col;
                jucator.y = rand;
                verificaCastig(jucator);
                if (!jocTerminat) schimbaRandul();
            }
        } 
        else if (actiune === "zid_O") {
            if (rand < randuri - 1 && col < coloane - 1 && poatePuneZid(rand, col, "O")) {
                ziduriOrizontale[rand][col] = 1;
                schimbaRandul();
            }
        } 
        else if (actiune === "zid_V") {
            if (rand < randuri - 1 && col < coloane - 1 && poatePuneZid(rand, col, "V")) {
                ziduriVerticale[rand][col] = 1;
                schimbaRandul();
            }
        }
    }
}

// Gestionează schimbarea de tură
function schimbaRandul() {
    if (jucatorCurent === 1) {
        jucatorCurent = 2;
        actualizareMesaj("Este rândul lui: " + jucator2.nume);
    } else {
        jucatorCurent = 1;
        actualizareMesaj("Este rândul lui: " + jucator1.nume);
        jocTerminat = false; 
    }
}

// Finalul jocului
function verificaCastig(jucator) {
    if (jucator.y === jucator.targetY) {
        jocTerminat = true;
        actualizareMesaj("Joc Terminat! Felicitări, " + jucator.nume + "!");
    }
}

// Actualizează UI-ul din DOM
function actualizareMesaj(text) {
    document.getElementById("mesajRand").innerText = text;
}