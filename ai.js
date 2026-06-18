function executaMutaCalculator() {
    jocTerminat = false; 

    if (modJocSelectat === "easy") {
        mutaEasy();
    } else if (modJocSelectat === "moderate") {
        mutaModerateBacktracking();
    }
    
    verificaCastig(jucator2);
    if (!jocTerminat) {
        schimbaRandul();
    } else {
        jocTerminat = true; 
    }
}

// AI-ul se uită la Jucătorul 1 (Omul) și încearcă să îl blocheze!
function incearcaSaPunaZid() {
    // Luăm coordonatele adversarului (Omul)
    let omX = jucator1.x;
    let omY = jucator1.y;

    // Omul pornește de jos (y=8) și merge în sus. 
    // Deci, vrem să îi punem un zid Orizontal fix deasupra lui (y - 1).
    if (omY > 0) {
        // Încearcă să pună zid fix deasupra lui
        if (poatePuneZid(omY - 1, omX, "O")) {
            ziduriOrizontale[omY - 1][omX] = 1;
            return true; // A reușit să te blocheze
        }
        // Dacă e ocupat fix deasupra, încearcă un pic mai la stânga (tot orizontal)
        if (omX > 0 && poatePuneZid(omY - 1, omX - 1, "O")) {
            ziduriOrizontale[omY - 1][omX - 1] = 1;
            return true; 
        }
    }

    // Dacă fața îți este deja blocată, va încerca să te blocheze pe lateral (Zid Vertical)
    // Încearcă în dreapta ta
    if (poatePuneZid(omY, omX, "V")) {
        ziduriVerticale[omY][omX] = 1;
        return true;
    }
    // Încearcă în stânga ta
    if (omX > 0 && poatePuneZid(omY, omX - 1, "V")) {
        ziduriVerticale[omY][omX - 1] = 1;
        return true;
    }

    // Dacă ești complet înconjurat de ziduri (față, stânga, dreapta), renunță
    return false; 
}

// EASY MODE
function mutaEasy() {
    // 50% șanse să aleagă să te blocheze în loc să mute pionul
    if (Math.random() < 0.50) {
        let aPusZid = incearcaSaPunaZid();
        if (aPusZid) return; // Și-a folosit tura pentru a pune zidul
    }

    // Dacă nu a pus zid, mută la întâmplare
    let mutariPosibile = [
        { x: jucator2.x, y: jucator2.y + 1 }, 
        { x: jucator2.x, y: jucator2.y - 1 }, 
        { x: jucator2.x - 1, y: jucator2.y }, 
        { x: jucator2.x + 1, y: jucator2.y }  
    ];
    
    let mutariValide = [];
    for (let i = 0; i < mutariPosibile.length; i++) {
        let m = mutariPosibile[i];
        if (m.x >= 0 && m.x < coloane && m.y >= 0 && m.y < randuri) {
            if (faraZidInCale(jucator2.x, jucator2.y, m.x, m.y)) {
                mutariValide.push(m);
            }
        }
    }
    
    if (mutariValide.length > 0) {
        let indexAles = Math.floor(Math.random() * mutariValide.length);
        jucator2.x = mutariValide[indexAles].x;
        jucator2.y = mutariValide[indexAles].y;
    }
}

// MODERATE MODE
function mutaModerateBacktracking() {
    let timpStart = Date.now(); 
    let limitaTimp = 100; 

    // 30% șanse să te blocheze (aici preferă să avanseze mai mult decât să blocheze)
    if (Math.random() < 0.30) {
        let aPusZid = incearcaSaPunaZid();
        if (aPusZid) return; 
    }

    let mutariPosibile = [
        { x: jucator2.x, y: jucator2.y + 1 }, 
        { x: jucator2.x, y: jucator2.y - 1 }, 
        { x: jucator2.x - 1, y: jucator2.y }, 
        { x: jucator2.x + 1, y: jucator2.y }  
    ];
    
    let ceaMaiBunaMutare = null;
    let scorMinim = 9999;

    for (let i = 0; i < mutariPosibile.length; i++) {
        if (Date.now() - timpStart > limitaTimp) break; 

        let m = mutariPosibile[i];
        if (m.x >= 0 && m.x < coloane && m.y >= 0 && m.y < randuri) {
            if (faraZidInCale(jucator2.x, jucator2.y, m.x, m.y)) {
                let scor = Math.abs(m.y - jucator2.targetY); 
                
                if (scor < scorMinim) {
                    scorMinim = scor;
                    ceaMaiBunaMutare = m;
                }
            }
        }
    }
    
    if (ceaMaiBunaMutare !== null) {
        jucator2.x = ceaMaiBunaMutare.x;
        jucator2.y = ceaMaiBunaMutare.y;
    } else {
        mutaEasy(); 
    }
}