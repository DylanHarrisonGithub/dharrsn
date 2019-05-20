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
    $res = $db->create('user', [
      'username' => $params['username'],
      'email' => $params['email'],
      'password' => password_hash($params['password'], PASSWORD_DEFAULT)
    ]);
    $db->close();

    if ($res['success']) {
      require_once(__DIR__.'/../../components/authentication.php');
      $token = generateToken([
        'id' => $res['result'],
        'username' => $params['username'],
        'email' => $params['email']
      ], $CONFIG['SERVER_SECRET']);
      
      if (isset($token)) {
        return json_encode([
          'success' => true,
          'message' => 'New user registered.',
          'token' => $token
        ]);
      } else {
        return json_encode([
          'success' => false,
          'message' => 'Error generating token.'
        ]);
      }
    } else {
      return json_encode([
        'success' => false,
        'message' => 'Database error: '.$res['message']
      ]);
    }

  }

?>