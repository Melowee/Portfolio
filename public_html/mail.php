<?php
     header('Location: https://dauchez-clement-portfolio.000webhostapp.com/index.html#contact');
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      $nom = $_POST['Nom'];
      $prenom = $_POST['Prenom'];
      $mail = $_POST['Mail'];
      $zetesqui = $_POST['zetesqui'];
      $message = $_POST['Message'];

      $content = 'Nom : '.$nom.PHP_EOL.'Prénom : '.$prenom.PHP_EOL.'Adresse e-mail : '.$mail.PHP_EOL.'Type de correspondant : '.$zetesqui.PHP_EOL.PHP_EOL.'Message : '.PHP_EOL.$message;
      $to = 'dauchezclement@live.fr';
      $object = $nom.' '.$prenom.' via Portfolio';
      $headers = 'Prise de contact de '.$prenom.' '.$nom.' via le portfolio';
      mail($to, $object,$content,$headers);

      ?>
    <p>Si vous n'êtes pas redirigé sous 5 secondes, <a href=" https://dauchez-clement-portfolio.000webhostapp.com/index.html#contact">cliquez ici</a></p>
  </body>
</html>
