<?php

  require_once(__DIR__.'/../../components/CrudDB_PDO.php');
  return function($params) {
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
      $res = $db->delete('service', $params['id']);
      if ($res['success']) {
        return json_encode([
          'success' => true,
          'message' => 'Service deleted.'
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