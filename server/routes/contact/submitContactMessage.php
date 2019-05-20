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
    $res = $db->create('contact', [
      'name' => $params['name'],
      'email' => $params['email'],
      'message' => $params['message']
    ]);
    $db->close();

    if ($res['success']) {
      return json_encode([
        'success' => true,
        'message' => 'Your message has been recieved. Please be patient and I will get back to you.'
      ]);
    } else {
      return json_encode([
        'success' => false,
        'message' => 'Database error: '.$res['message']
      ]);
    }
    
  }

?>