<?php

  return [
    'id' => [
      'required' => true,
      'type' => 'integer',
      'min' => 0
    ],
    'place' => [
      'required' => false,
      'type' => 'integer',
      'min' => 0
    ],
    'title' => [
      'required' => false,
      'type' => 'string',
      'min-length' => 1,
      'max-length' => 30,
      'regex' => '/^[a-zA-Z0-9 ]*$/'
    ],
    'text' => [
      'required' => false,
      'type' => 'string',
      'min-length' => 1,
      'max-length' => 255,
      'regex' => '/^[a-zA-Z0-9\s!?.,]*$/'
    ],
    'icons' => [
      'required' => false,
      'type' => 'string',
      'min-length' => 1,
      'max-length' => 255,
      'regex' => '/^fa-/'
    ]
  ];

?>