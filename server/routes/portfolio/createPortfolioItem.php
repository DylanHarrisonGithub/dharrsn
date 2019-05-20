<?php

  return function($params) {

    require_once(__DIR__.'/../../components/CrudDB_PDO.php');
    $CONFIG = require(__DIR__.'/../../config/config.php');
    $db = new CrudDB_PDO(
      $CONFIG['SERVER_NAME'],
      $CONFIG['DB_USERNAME'],
      $CONFIG['DB_PASSWORD'],
      $CONFIG['DB_NAME']
    );

    if ($db->connection_error) {
      return json_encode([
        'success' => false,
        'message' => 'Database error: '.$db->connection_error
      ]);
    } else {

      $res = $db->create('portfolio', [
        'place' => $params['place'],
        'title' => $params['title'],
        'technologies' => $params['technologies'],
        'screenshotSrc' => $params['screenshotSrc'],
        'bullets' => json_encode($params['bullets']),
        'links' => json_encode($params['links'])
      ]);
      $db->close();

      if ($res['success']) {
        return json_encode([
          'success' => true,
          'message' => 'New portfolio item created.'
        ]);
      } else {
        return json_encode([
          'success' => false,
          'message' => 'Database error: '.$res['message']
        ]);
      }

    }
    
  }

?>