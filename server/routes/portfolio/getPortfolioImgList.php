<?php

  return function($params) {

    if ($handle = opendir(__DIR__.'/../../assets/')) {
      $imgList = [];
      while (false !== ($entry = readdir($handle))) {
          if ($entry != "." && $entry != "..") {
              array_push($imgList, $entry);
          }
      }
      closedir($handle);
      return json_encode([
        'success' => true,
        'message' => 'Successfully retrieved portfolio image list',
        'list' => $imgList
      ]);
    } else {
      return json_encode([
        'success' => false,
        'message' => 'could not access portfolio image directory'
      ]);
    }
  }

?>