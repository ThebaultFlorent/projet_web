<?php

    //connection à la BDD
    $SERVEUR  = "127.0.0.1";
    $USER     = "Florent";
    $PASSWORD = "Escape_Game168";
    $BASE     = "escapeGame";
    $LINK = mysqli_connect($SERVEUR, $USER, $PASSWORD, $BASE);

    mysqli_set_charset($LINK, "utf8");

    if (isset($_POST['inventaire_passeport'])) {
        $requete = "SELECT inventaire FROM Objets WHERE nom LIKE 'passeport';";
        $result = mysqli_query($LINK, $requete);

        $ligne = mysqli_fetch_assoc($result);

        if ($ligne['inventaire'] == "1") {
          echo json_encode(1);
        }
        else {
          echo json_encode(0);
        }
    }

 ?>
