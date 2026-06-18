// CONFIGURAȚII DE DIMENSIUNI PENTRU TABLĂ
let dimensiuneCelula = 50;
let grosimeZid = 15;
let randuri = 9;
let coloane = 9;

// VARIABILE DE STARE ALE JOCULUI
let jucatorCurent = 1; // Poate fi 1 sau 2
let jocTerminat = false;
let modJocSelectat = "human";

// Matricele pentru stocarea stării zidurilor (0 = gol, 1 = ocupat)
let ziduriOrizontale = []; 
let ziduriVerticale = [];