<?php

  //connection à la BDD
  $SERVEUR  = "127.0.0.1";
  $USER     = "Florent";
  $PASSWORD = "Escape_Game168";
  $BASE     = "escapeGame";
  $LINK = mysqli_connect($SERVEUR, $USER, $PASSWORD, $BASE);

  mysqli_set_charset($LINK, "utf8");

  function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
    if ($with_script_tags) {
      $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
  }

  if (isset($_POST['reponse'])) {

    $requete = "SELECT reponse FROM Enigmes WHERE reponse LIKE '1234';";
    $result = mysqli_query($LINK, $requete);

    $ligne = mysqli_fetch_assoc($result);

    if ($ligne['reponse'] == $_POST['reponse']) {
      echo json_encode(1);
    }
    else {
      echo json_encode(0);
    }
  }

/*
if (isset($_POST[])) {
  $requete_reponse = "SELECT reponse FROM Enigmes WHERE reponse LIKE '' ";
  $requete_inventaire = "SELECT inventaire FROM Objets WHERE nom LIKE 'passeport'";

  $result_reponse = mysqli_query($LINK, $requete_reponse);
  $result_inventaire = mysqli_query($LINK, $requete_inventaire);

  $ligne_reponse = mysqli_fetch_assoc($result_reponse);
  $ligne_inventaire = mysqli_fetch_assoc($result_inventaire);

  if ($ligne_inventaire && $ligne_reponse == '') {
    echo json_encode("true");
  }
  else {
    echo json_encode("false");
  }
}

if (isset($_POST[])) {
  $requete_reponse = "SELECT reponse FROM Enigmes WHERE reponse LIKE '' ";
  $requete_inventaire = "SELECT inventaire FROM Objets WHERE nom LIKE 'CAQ'";

  $result_reponse = mysqli_query($LINK, $requete_reponse);
  $result_inventaire = mysqli_query($LINK, $requete_inventaire);

  $ligne_reponse = mysqli_fetch_assoc($result_reponse);
  $ligne_inventaire = mysqli_fetch_assoc($result_inventaire);

  if ($ligne_inventaire && $ligne_reponse == '') {
    echo json_encode("true");
  }
  else {
    echo json_encode("false");
  }
}
*/

?>
