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
      if (isset($params['technologies'])) { $update['technologies'] = $params['technologies']; }
      if (isset($params['screenshotSrc'])) { $update['screenshotSrc'] = $params['screenshotSrc']; }
      if (isset($params['bullets'])) { $update['bullets'] = json_encode($params['bullets']); }
      if (isset($params['links'])) { $update['links'] = json_encode($params['links']); }

      $res = $db->update('portfolio', $params['id'], $update);
      if ($res['success']) {
        return json_encode([
          'success' => true,
          'message' => 'Portfolio item updated.'
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