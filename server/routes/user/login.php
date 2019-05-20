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

    $res = $db->read('user', [
      'username' => $params['username']
    ]);
    $db->close();

    if ($res['success']) {
      $users = $res['result'];
      if (count($users) === 1) {
        if (password_verify($params['password'], $users[0]['password'])) {
          require_once(__DIR__.'/../../components/authentication.php');
          $token = generateToken($users[0]);
          return json_encode([
            'success' => true,
            'message' => 'Login success.',
            'token' => $token
          ]);
        } else {
          return json_encode([
            'success' => false,
            'message' => 'Incorrect password.'
          ]);
        }
      } else {
        return json_encode([
          'success' => false,
          'message' => 'User does not exist.'
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