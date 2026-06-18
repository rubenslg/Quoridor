// Definim proprietățile jucătorilor sub formă de obiecte simple
let jucator1 = { x: 4, y: 8, nume: "J1", culoare: "#ff0000", targetY: 0, ziduriRamase: 10 };
let jucator2 = { x: 4, y: 0, nume: "J2", culoare: "#0000ff", targetY: 8, ziduriRamase: 10 };

// Desenează pionii ca cercuri colorate
function deseneazaJucatori() {
    let j1px = jucator1.x * (dimensiuneCelula + grosimeZid) + dimensiuneCelula / 2;
    let j1py = jucator1.y * (dimensiuneCelula + grosimeZid) + dimensiuneCelula / 2;
    fill(jucator1.culoare);
    circle(j1px, j1py, dimensiuneCelula - 10);

    let j2px = jucator2.x * (dimensiuneCelula + grosimeZid) + dimensiuneCelula / 2;
    let j2py = jucator2.y * (dimensiuneCelula + grosimeZid) + dimensiuneCelula / 2;
    fill(jucator2.culoare);
    circle(j2px, j2py, dimensiuneCelula - 10);
}

// Efect vizual de Hover pentru mutarea pionului
function deseneazaHover() {
    if (jocTerminat || (jucatorCurent === 2 && modJocSelectat !== "human")) return;

    let actiune = document.getElementById("tipActiune").value;
    if (actiune !== "muta") return; // Aratam hover doar la mutare

    let col = Math.floor(mouseX / (dimensiuneCelula + grosimeZid));
    let rand = Math.floor(mouseY / (dimensiuneCelula + grosimeZid));
    
    if (col >= 0 && col < coloane && rand >= 0 && rand < randuri) {
        let jucator = jucatorCurent === 1 ? jucator1 : jucator2;
        let dx = Math.abs(jucator.x - col); 
        let dy = Math.abs(jucator.y - rand);
        
        // Luminam celula daca mutarea e valida si nu are zid in cale
        if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            if (faraZidInCale(jucator.x, jucator.y, col, rand)) {
                let px = col * (dimensiuneCelula + grosimeZid);
                let py = rand * (dimensiuneCelula + grosimeZid);
                fill(255, 255, 255, 120); 
                rect(px, py, dimensiuneCelula, dimensiuneCelula);
            }
        }
    }
}