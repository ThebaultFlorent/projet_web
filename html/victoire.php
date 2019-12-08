<?php

    //connection à la BDD
    $SERVEUR  = "127.0.0.1";
    $USER     = "Florent";
    $PASSWORD = "Escape_Game168";
    $BASE     = "escapeGame";
    $LINK = mysqli_connect($SERVEUR, $USER, $PASSWORD, $BASE);

    mysqli_set_charset($LINK, "utf8");

    if (isset($_POST['objets'])) {
        $requete1 = "SELECT inventaire FROM Objets WHERE nom LIKE 'passeport';";
        $result1 = mysqli_query($LINK, $requete1);

        $requete2 = "SELECT inventaire FROM Objets WHERE nom LIKE 'CAQ';";
        $result2 = mysqli_query($LINK, $requete2);

        $requete3 = "SELECT inventaire FROM Objets WHERE nom LIKE 'permis etude';";
        $result3 = mysqli_query($LINK, $requete3);

        $passeport = mysqli_fetch_assoc($result1);
        $caq = mysqli_fetch_assoc($result2);
        $pe = mysqli_fetch_assoc($result3);

        $a = 0;

        if ($passeport['inventaire'] == 1 && $caq['inventaire'] == 1 && $pe['inventaire'] == 1){
          $a = 1;
        }

        echo json_encode($a);
    }

 ?>
