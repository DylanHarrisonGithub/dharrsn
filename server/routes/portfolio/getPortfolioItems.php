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
      $res = $db->read('portfolio', []);

      if ($res['success']) {
        foreach($res['result'] as $key => $item) {
          $res['result'][$key]['bullets'] = json_decode($item['bullets']);
          $res['result'][$key]['links'] = json_decode($item['links']);
        }
        return json_encode([
          'success' => true,
          'message' => 'Successfully retrieved portfolio items.',
          'items' => $res['result']
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