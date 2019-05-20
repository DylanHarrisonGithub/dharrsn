<?php

  return [
    'name' => [
      'required' => true,
      'type' => 'string',
      'min-length' => 3,
      'max-length' => 30,
      'regex' => '/^[a-zA-Z0-9 ]*$/'
    ],
    'email' => [
      'required' => true,
      'type' => 'string',
      'min-length' => 5,
      'max-length' => 30,
      'regex' => '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
    ],
    'message' => [
      'required' => true,
      'type' => 'string',
      'min-length' => '2',
      'max-length' => 255,
      'regex' => '/^[a-zA-Z0-9\s!?.,]*$/'
    ]
  ];

?>