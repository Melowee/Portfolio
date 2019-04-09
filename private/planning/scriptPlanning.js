let nbAnimes = 0;

function setCommandes(){
    btnAjoutAnime = document.getElementById('submit');
    initEventHandlers(btnAjoutAnime, 'click', ajouterAnime);
    
    btnSavePlanning = document.getElementById('save');
    initEventHandlers(btnSavePlanning, 'click', sauvegarderPlanning);
    
    btnDeleteAnime = document.getElementById('delete');
    initEventHandlers(btnDeleteAnime, 'click', supprimerAnime);
}

function ajouterAnime(){
    selecteurJour = document.getElementById('jour');
    
    jourSortie = selecteurJour.options[selecteurJour.selectedIndex].value;
    heureSortie = document.getElementById('heure').value;
    titreAnime = document.getElementById('titre').value;
    urlJaquette = document.getElementById('urlImg').value;
    
    let newAnime = document.createElement("div");
    let newHTML = "<strong>".concat(titreAnime).concat("</strong>");
    newHTML = newHTML.concat("<br>").concat(heureSortie);
    newHTML = newHTML.concat("<br><img class='jaquette' src='").concat(urlJaquette).concat("' />");
    
    newAnime.innerHTML = newHTML;
    document.getElementById(jourSortie).appendChild(newAnime);
    
    document.getElementById('jour').value="";
    document.getElementById('heure').value="";
    document.getElementById('titre').value="";
    document.getElementById('urlImg').value="";
    
}

function supprimerAnime(){
    
}

function sauvegarderPlanning(){
    let data = {
        animes: []
    }
    
    nodes = document.getElementById('crenaux').childNodes;
    console.log(nodes);
    let dayNodes;
    for(let i = 0; i<nodes.length; i++){
        dayNodes = nodes[i].childNodes;
        console.log(dayNodes);
        for(let j = 0; j<dayNodes.length; j++){
            console.log(dayNodes[j].innerHTML);
            console.log(nodes[i].id);
            data.animes.push(splitHTML(dayNodes[j].innerHTML, nodes[i].id));
        }
    }
    
    console.log(data);
    
    let json = JSON.stringify(data);
    window.location.href = "writeJSON.php?json=" + json;
}

function splitHTML(HTMLLine, jour){
    let titre = HTMLLine.split('>')[1].split('<')[0];
    let heure = HTMLLine.split('<br>')[1];
    let url = HTMLLine.split('src="')[1].split('"')[0];
    
    return {
        jour: jour,
        titre: titre,
        heure: heure,
        url: url
    }
}

function initPlanning(){
    var request = new XMLHttpRequest();
    request.open('GET', 'animes.json');
    request.responseType = 'json';
    request.send();
    
    request.onload = function() {
        var data = request.response;
        console.log(data)
        data.animes.forEach(function (v){
            nbAnimes++;
            let newAnime = document.createElement("div");
            newAnime.setAttribute("id", nbAnimes);
            let newHTML = "<strong>".concat(v.titre).concat("</strong>");
            newHTML = newHTML.concat("<br>").concat(v.heure);
            newHTML = newHTML.concat("<br><img class='jaquette' src='").concat(v.url).concat("' />");
        
            newAnime.innerHTML = newHTML;
            document.getElementById(v.jour).appendChild(newAnime);
            
            let deleteOptn = document.createElement('option');
            deleteOptn.setAttribute('value', nbAnimes);
            deleteOptn.innerHTML = v.titre;
            document.getElementById('selectDelete').appendChild(deleteOptn);
        });
    };
}

function init(){
    console.log("Initialisation du script");
    setCommandes();
    initPlanning();
}

function initEventHandlers(element, event, fx){
    if(element.addEventListener){
        element.addEventListener(event, fx, false);
    }else if (element.attachEvent){
        element.attachEvent('on' + event, fx);
    }
}

initEventHandlers(window, 'load', init);
