<?php

  return function($params) {
    if (file_exists(__DIR__.'/../../assets/'.$params['filename'])) {
      if (unlink(__DIR__.'/../../assets/'.$params['filename'])) {
        return json_encode([
          'success' => true,
          'message' => 'Portfolio image deleted.'
        ]);
      } else {
        return json_encode([
          'success' => false,
          'message' => 'Could not delete file.'
        ]);
      }
    } else {
      return json_encode([
        'success' => false,
        'message' => 'Could not delete file becuase it does not exist.',
      ]);
    }
  }

?>