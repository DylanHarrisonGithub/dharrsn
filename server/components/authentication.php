<?php
  
  function generateToken($user) {
    $CONFIG = require(__DIR__.'/../config/config.php');
    if (
      isset($user['id']) &&
      isset($user['username']) &&
      isset($user['email'])
    ) {
      $now = time();
      return [
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'timestamp' => $now,
        'signature' => password_hash(
          $user['id']
          .$user['username']
          .$user['email']
          .$now
          .$CONFIG['SERVER_SECRET'],
          PASSWORD_DEFAULT
        )
      ];
    } 
    return null;
  }

  function verifyToken($token) {
    $CONFIG = require(__DIR__.'/../config/config.php');
    if (
      isset($token['id']) &&
      isset($token['username']) &&
      isset($token['email']) &&
      isset($token['timestamp']) &&
      isset($token['signature'])
    ) {
      if (password_verify(
        $token['id'].$token['username'].$token['email'].$token['timestamp'].$CONFIG['SERVER_SECRET'],
        $token['signature']
      )) {
        return true;
      }
    }
    return false;
  }
  
?>