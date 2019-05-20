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
      $res = $db->read('service', []);

      if ($res['success']) {
        foreach($res['result'] as $key => $service) {
          $res['result'][$key]['icons'] = explode(", ", $service['icons']);
        }
        return json_encode([
          'success' => true,
          'message' => 'Successfully retrieved services.',
          'services' => $res['result']
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