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

      $update = [];
      if (isset($params['place'])) { $update['place'] = $params['place']; }
      if (isset($params['title'])) { $update['title'] = $params['title']; }
      if (isset($params['text'])) { $update['text'] = $params['text']; }
      if (isset($params['icons'])) { $update['icons'] = implode(", ", $params['icons']); }

      $res = $db->update('service', $params['id'], $update);
      if ($res['success']) {
        return json_encode([
          'success' => true,
          'message' => 'Service updated.'
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