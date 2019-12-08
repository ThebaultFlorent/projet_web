<?php

    //connection à la BDD
    $SERVEUR  = "127.0.0.1";
    $USER     = "Florent";
    $PASSWORD = "Escape_Game168";
    $BASE     = "escapeGame";
    $LINK = mysqli_connect($SERVEUR, $USER, $PASSWORD, $BASE);

    mysqli_set_charset($LINK, "utf8");

    if (isset($_POST['data'])) {
      $requete = "UPDATE Objets SET inventaire = 1 WHERE id = 3;";
      $result = mysqli_query($LINK, $requete);
      if ($result) {
        echo json_encode("succes");
      }
      else {
        echo json_encode("echec");
      }
    }

?>
