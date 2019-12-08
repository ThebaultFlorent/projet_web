function timer(){
  temps--;
  time.innerHTML = temps;
  if (temps == 0) {
    window.location.href= "perdu.html";
  }
}

var temps = 600;
setInterval(timer, 1000);
var time = document.getElementById('timer');


//localisation des lieux impliqués dans cet escape game
var lieux = {
  "Maison": { "lat": 48.853379, "lon": 2.520125 },
  "Mairie": { "lat": 48.849234, "lon": 2.552572 },
  "Ambassade": { "lat": 48.872438, "lon": 2.312434 }
};

//initialisation de la carte
var map = L.map('mapid').setView([48.853379, 2.520125], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//initialisation des marker permettant de voir les lieux remarquables
var maison = L.marker([lieux.Maison.lat, lieux.Maison.lon], {draggable:'true'});
var mairie = L.marker([lieux.Mairie.lat, lieux.Mairie.lon], {draggable:'true'});
var ambassade = L.marker([lieux.Ambassade.lat, lieux.Ambassade.lon], {draggable:'true'});

maison.addTo(map);

//fonction permettant d'afficher ou de supprimer de la carte les marker à partir d'un certain niveau de zoom de la carte
function zoomer() {

  zoom = map.getZoom();

  if (zoom >= 15) {
    mairie.addTo(map);
    ambassade.addTo(map);
  }

  else {
    map.removeLayer(mairie);
    map.removeLayer(ambassade);
  }

}

var zoom = map.getZoom();
//la fonction précédente est activée lorsque la roue de la souri est manipulée (donc que ce soit pour zoomer ou dézoomer)
mapid.addEventListener('wheel', zoomer);

//simple fonction pour faire apparaitre un popup sur le lieu de départ pour donner des instructions simples au joueur
function evenement_maison(){

    var data = "objets=3";

    //ajax verifiant que le joueur possède les 3 documents
    fetch('victoire.php', {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    .then(resu => resu.json())
    .then(resu => {
      //si c'est le cas, le joueur a gagné et on envoie la page de victoire
      if (resu) {

        window.location.href= "victoire.html";

      }

      //sinon le joueur n'a pas fini le jeu
      else {

        var popup = L.popup()
          .setLatLng([48.853379, 2.520125])
          .setContent("<p>Bonjour. Il s'agit de votre maison. Réunissez tous les documents nécessaire pour votre départ au Québec.</p> <p>Vous avez rendez-vous à la mairie de Noisy-le-Grand pour votre passeport. N'oubliez pas, votre numéro de dossier est le 1234.</p> <p> Il vous manque encore des papiers nécessaires pour votre départ.</p>")
          .openOn(map);

      }
    })

}

//on active la fonction précédente seulement si on clique sur le marker maison
maison.on('click', evenement_maison);

//cette fonction crée un popup sur la mairie pour donner les instructions.
//elle crée également un formulaire pour permettre au joueur de donner les réponses
//lorsque le formulaire est validé, une seconde fonction sera appelée
function enigme_mairie() {

  var popup = L.popup()
    .setLatLng([48.849234, 2.552572])
    .setContent('<p> Bonjour, vous aviez rendez-vous pour récupérer votre passeport. Veuillez nous donner votre numéro de dossier.</p>')
    .openOn(map);

  //on créé le formulaire en l'ajoutant au html
  document.getElementById('mairie').innerHTML ='<div id = "formmairie"> <form action="" method="get"><fieldset><legend>Inscription</legend><p><label>Numéro de dossier<input id="f" type="text" name="numero"></label></p><p><input id="CONFIRMER" type="button" name="valider" value="Valider"></p></fieldset> </form> </div>';

  //lorsqu'on clique sur valider la fonction form sera exécutée
  document.getElementById("CONFIRMER").addEventListener('click', form);
  document.getElementById("CONFIRMER").addEventListener('keyup', form);

}

//cette fonction permet de faire lien entre le javascript et le php
function form() {

  if (event.keycode == 13 || event.type == 'click') {

    event.preventDefault();

    //on initialise la donnée que l'on donnera au php. Cette donnée contient ce que l'utilisateur a rentré dans le formulaire
    var data = "reponse=" + document.getElementById('f').value;

    //fonction ajax appelant le php qui vérifie que la réponse entrée par l'utilisateur est la bonne réponse
    fetch('formulaire.php', {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    .then(r => r.json())
    .then(r => {
      console.log(r);
      var data2 = 'inventaire_passeport=0';

      //si la réponse est bonne
      if (r){

        //on exécute le php qui modifie la bdd pour indiquer que le passeport est ajouté à l'inventaire
        fetch('inventaire.php', {
          method: 'post',
          body: data2,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        .then(res => res.json())
        .then(res => {
          console.log(res)
        })

        var popup = L.popup()
          .setLatLng([48.849234, 2.552572])
          .setContent("<p>Vous avez bien reçu votre passeport. Le voici. Dirigez-vous vers l'ambassade du Canada pour ce qui concerne le Certificat d'Acceptation et le Permis d'étude. Au revoir monsieur.</p>")
          .openOn(map);

        //on enlève le formulaire pour qu'il disparaisse de l'écran
        document.getElementById('mairie').innerHTML = "";
        //puis on indique à l'écran que l'inventaire contient le passeport (celui-ci devait être draggable et droppable mais je ne suis pas allé jusqu'au bout)
        document.getElementById('inventaire').innerHTML = "<p>Votre inventaire contient :</p> <ul><li id='draggable' ondrag='drag(event);' ondragstart='dragstart(event);' ondragend='drop(event);' draggable='true'>Passeport</li></ul>";

      }

      //si la réponse est fausse on attend que le joueur entre l'information correcte
      else {

        var popup = L.popup()
          .setLatLng([48.849234, 2.552572])
          .setContent('<p>Le numéro que nous avez fourni ne correspond à aucun dossier. Veuillez vérifier votre information.</p>')
          .openOn(map);

      }
    })
  }
}

mairie.on('click', enigme_mairie);

//fonction codant l'évenement lié au marker de l'ambassade
function enigme_ambassade1(){

  var popup = L.popup()
    .setLatLng([48.872438, 2.312434])
    .setContent("<p> Bonjour, bienvenue à l'ambassade du Canada. Veuillez déposer votre passeport afin que nous puissions vous fournir votre Certificat d'Acceptation du Québec.</p>")
    .openOn(map);

    var data3 = 'inventaire_passeport=1';
    //ajax appelant le php qui vérifie que le passeport est dans notre inventaire
    fetch('inventaire2.php', {
      method: 'post',
      body: data3,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    .then(result => result.json())
    .then(result => {
      console.log(result)

      //si le passeport est dans notre inventaire
      if (result) {

        var popup = L.popup()
          .setLatLng([48.872438, 2.312434])
          .setContent("<p>Merci, vous avez obtenu votre certificat. Au revoir.</p>")
          .openOn(map);

          //on met à jour notre inventaire à l'écran pour afficher également le certificat qu'on vient d'obtenir
        document.getElementById('inventaire').innerHTML = "<p>Votre inventaire contient :</p> <ul><li class='draggable' ondrag='drag(event);' ondragstart='dragstart(event);' ondragend='drop(event);' draggable='true'>Passeport</li> <li class='draggable' ondrag='drag(event);' ondragstart='dragstart(event);' ondragend='drop(event);' draggable='true'>CAQ</li></ul>";

        var data2 = 'inventaire_caq=0';
        //puis on met à jour la bdd pour dire que le caq est dans l'inventaire
        fetch('caq.php', {
            method: 'post',
            body: data2,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(re => re.json())
        .then(re => {
          console.log(re)
        })

        var popup = L.popup()
          .setLatLng([48.872438, 2.312434])
          .setContent("<p>Vous avez obtenu votre Certificat d'Acceptation du Québec. Vous pouvez repassez pour obtenir votre permis d'étude. A bientôt monsieur.</p>")
          .openOn(map);

      }

      else {

        var popup = L.popup()
          .setLatLng([48.872438, 2.312434])
          .setContent("<p>Vous ne possédez pas de passeport. Il vous ce document pour obtenir le Certificat d'Acceptation du Québec. Revenez lorsque vous l'aurez obtenu.</p>")
          .openOn(map);

      }
    })
}

function enigme_ambassade2() {
  var d = "data=0";
  fetch('permis_etude.php', {
      method: 'post',
      body: d,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  })
  .then(re => re.json())
  .then(re => {
    console.log(re);
  })

  document.getElementById('inventaire').innerHTML = "<p>Votre inventaire contient :</p> <ul><li class='draggable' ondrag='drag(event);' ondragstart='dragstart(event);' ondragend='drop(event);' draggable='true'>Passeport</li> <li class='draggable' ondrag='drag(event);' ondragstart='dragstart(event);' ondragend='drop(event);' draggable='true'>CAQ</li> <li class='draggable' ondrag='drag(event);' ondragstart='dragstart(event);' ondragend='drop(event);' draggable='true'>Permis d'étude</li> </ul>";

  var popup = L.popup()
    .setLatLng([48.872438, 2.312434])
    .setContent("<p>Vous avez obtenu votre permis d'étude. Rendez-vous à votre maison pour finir le jeu.</p>")
    .openOn(map);
}

function enigme_ambassade() {
  var dat = "data=0";
  fetch('ambassade.php', {
      method: 'post',
      body: dat,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  })
  .then(re => re.json())
  .then(re => {
    if (re) {
      enigme_ambassade2();
    }
    else {
      enigme_ambassade1();
    }
  })
}

ambassade.on('click', enigme_ambassade);




//tentative de drag&drop ...
/*
//var dropZone = document.getElementById('dropable');
var draggable = document.getElementById('draggable');

function onMapClick(e) {
  console.log(e.latlng);
}

function dragover(e) {
  console.log('dragover');
  e.preventDefault();
}

function dragenter(e) {
  console.log('dragenter');
  e.preventDefault();
}

function dragstart(e) {
  console.log('dragstart');
  map.on('mouseup', onMapClick);
  e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
  console.log('drop');
  console.log(e.latlng);
}

//map.on('mouseup', onMapClick);

function drag(e) {
  console.log('drag');
}
*/
