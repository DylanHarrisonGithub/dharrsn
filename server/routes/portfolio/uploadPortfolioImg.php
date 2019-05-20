<?php

  return function($params) {
    if (in_array(pathinfo($_FILES['img']['name'])['extension'], [
      'jpeg', 'jpg', 'png', 'gif' 
    ])) {
      return json_encode([
        'success' => move_uploaded_file($_FILES['img']['tmp_name'], __DIR__.'/../../assets/'.$_FILES['img']['name']),
        'message' => 'Image file successfully uploaded.'
      ]);
    } else {
      return json_encode([
        'success' => false,
        'message' => 'Image format not supported.'
      ]);
    }
  }

?>