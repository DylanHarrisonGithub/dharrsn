<?php

  #remove before deployment
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: X-Requested-With");

  $entityBody = json_decode(file_get_contents('php://input'), true);
  if (
    isset($entityBody['route']) &&
    isset($entityBody['params']) 
  ) {

    $route = $entityBody['route'];
    $params = $entityBody['params'];

    $ROUTES = require('config/router.php');
    require_once('components/validation.php');
    if (isset($ROUTES[$route])) {
      if ($ROUTES[$route]['privelege'] === 'guest') {

        $err = validate($params, $ROUTES[$route]['schema']);
        if (count($err) > 0) {
          echo json_encode([
            'success' => false,
            'message' => 'Supplied parameters failed to validate.',
            'errors' => $err
          ]);
        } else {
          echo $ROUTES[$route]['router']($params);
        }

      } else {        
        if ($ROUTES[$route]['privelege'] === 'user') { 
          if (isset($entityBody['token'])) {
            require_once('components/authentication.php');
            if (verifyToken($entityBody['token'])) {

              $err = validate($params, $ROUTES[$route]['schema']);
              if (count($err) > 0) {
                echo json_encode([
                  'success' => false,
                  'message' => 'Supplied parameters failed to validate.',
                  'errors' => $err
                ]);
              } else {
                echo $ROUTES[$route]['router']($params);
              }
              
            } else {
              echo json_encode([
                'success' => false,
                'message' => 'Provided user authentication is not valid.'
              ]);
            }
          } else {
            echo json_encode([
              'success' => false,
              'message' => 'User authentication is required to perform requested action.'
            ]);
          }
        } else {
          echo json_encode([
            'success' => false,
            'message' => 'Privelege to access route is not available.'
          ]);
        }
      }
    } else {
      echo json_encode([
        'success' => false,
        'message' => 'Specified route does not exist.'
      ]);
    }
  } else {
    if (isset($_FILES['img']) && isset($_POST['token'])) {
      require_once('components/authentication.php');
      if (verifyToken(json_decode(stripslashes($_POST['token']), true))) {
        $ROUTES = require('config/router.php');
        echo $ROUTES['uploadPortfolioImg']['router'](null);
      } else {
        echo json_encode([
          'success' => false,
          'message' => 'Provided user authentication is not valid.'
        ]);
      }
    } else {
      echo json_encode([
        'success' => false,
        'message' => 'Required paramater was not provided.'
      ]);
    }
  }
  
?>