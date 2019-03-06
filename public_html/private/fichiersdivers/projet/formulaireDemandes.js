// Développé par Baptiste BENOIT
// N'hésitez pas à me contacter pour toute question

let nbClients = 0; // Nombre de client
let capaciteVehicule = 0; // Capacité maximale de chaque véhicule
let etape = 1; // Permet de pouvoir pousuivre le formulaire si le nombre de client et la capacité du véhicule ont été saisi
let clients = []; // Tableau contenant tous les clients avec tous leurs intervalles


$.ajax({
    url: "parametre_fixes.json",
    async: false,
    dataType: 'json',
    success: function(value) {
        nbClients = value.C;
    }
});


function init(){
  console.log("Initialisation du script ...");
  setCommandes();
}

function setCommandes(){
  if(etape == 1){
    // Initialisation du bouton de validation du nombre de client et de la capacité des véhicules
    console.log("Initialisation des buttons ...");
    let buttonNbClient = document.getElementById('validerClientVehicule');
    initEvent(buttonNbClient, 'click', traitementPremierFormulaire);
  } else if(etape == 2){
    // Initialisation du bouton de validation des intervalles pour chaque client
    console.log("Poursuite de l'initialisation des buttons ...");
    let buttonFormulaire = document.getElementById('validerFormulaire');
    initEvent(buttonFormulaire, 'click', contenuFormulaire);
  }
}

function traitementPremierFormulaire(){
  // Si le nombre de client est au moins à 1
  if(nbClients > 0){
    capaciteVehicule = document.getElementById('capaciteVehicule').value;
    initIntervalles(); // Retourne la suite du formulaire dans le fichier html
    etape++;
    setCommandes(); // Créé le bouton de validation du formulaire
  }
}

function contenuFormulaire(){
  let ret = "";
  for(let i = 1;i<nbClients+1;i++){
    clients.push(new Array(document.getElementById('minimumFormulaire'+i).value,document.getElementById('maximumFormulaire'+i).value));
    ret += "Client " + i + ": Min " + clients[i][0] + " Max " + clients[i][1] + "<br>";
  }
  capaciteVehicule = document.getElementById('capaciteVehicule').value;
  document.getElementById('retour').innerHTML = "<h3>Capacité " + capaciteVehicule + "</h3><p>" + ret + "</p>";
}

function initIntervalles(){
  document.getElementById('demandeClients').innerHTML = "Demande des clients";
  document.getElementById('colonneDemande').innerHTML = "Minimum Maximum";
  let ret = "";
  for(let i = 1;i<nbClients+1;i++){
    ret += "<p>Client " + i + "</p><input type='number' id='minimumFormulaire" + i + "' min='1'><input type='number' id='maximumFormulaire" + i + "' min='1'><br>";
  }
  document.getElementById('paragrapheFormulaire').innerHTML = ret;
  document.getElementById('validerFormulaire').innerHTML = "<input type='button' id='validerFormulaire' value='Confirmer'>";
}

function initEvent(element, event, fx){
    if(element.addEventListener){
        element.addEventListener(event, fx, false);
    }else if (element.attachEvent){
        element.attachEvent('on' + event, fx);
    }
}

initEvent(window, 'load', init);

var slider = document.getElementById("capaciteVehicule");
var output = document.getElementById("val");
output.innerHTML = slider.value;
slider.oninput = function(){
  output.innerHTML = this.value;
}
