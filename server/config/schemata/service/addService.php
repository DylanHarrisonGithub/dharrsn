<?php

  return [
    'place' => [
      'required' => true,
      'type' => 'integer',
      'min' => 0
    ],
    'title' => [
      'required' => true,
      'type' => 'string',
      'min-length' => 1,
      'max-length' => 30,
      'regex' => '/^[a-zA-Z0-9 ]*$/'
    ],
    'text' => [
      'required' => true,
      'type' => 'string',
      'min-length' => 1,
      'max-length' => 255,
      'regex' => '/^[a-zA-Z0-9\s\-!?\'.,]*$/'
    ],
    'icons' => [
      'required' => true,
      'type' => 'string',
      'min-length' => 1,
      'max-length' => 255,
      'regex' => '/^fa-/'
    ]
  ];

?>