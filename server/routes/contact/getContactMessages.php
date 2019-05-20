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

    $res = $db->read('contact', []);

    if ($res['success']) {
      return json_encode([
        'success' => true,
        'message' => 'Successfully retrieved contact messages.',
        'messages' => $res['result']
      ]);
    } else {
      return json_encode([
        'success' => false,
        'message' => 'Database error: '.$res['message']
      ]);
    }
  }

?>