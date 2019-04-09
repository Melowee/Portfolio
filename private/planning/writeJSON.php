<?php
    header('Location: https://dauchez-clement-portfolio.000webhostapp.com/private/planning/planning.html');
    
    $jsonFile = fopen("animes.json", "w");
    fwrite($jsonFile, $_GET['json']);
    fclose($jsonFile);
?>