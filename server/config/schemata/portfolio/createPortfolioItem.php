<?php

  return [
    'title' => [
      'required' => true,
      'type' => 'string',
      'minLength' => 3,
      'isCommonWriting' => true
    ],
    'technologies' => [
      'required' => true,
      'type' => 'string',
      'minLength' => 1,
      'isCommonWriting' => true
    ],
    'screenshotSrc' => [
      'required' => true,
      'type' => 'string'
    ],
    'bullets' => [
      'type' => 'string',
      'isCommonWriting' => true
    ],
    'links' => [
      'required' => true,
      'type' => [
        'source' => [
          'required' => false,
          'type' => 'string'
        ],
        'blog' => [
          'required' => false,
          'type' => 'string'
        ],
        'website' => [
          'required' => false,
          'type' => 'string'
        ]
      ]
    ]
  ];

?>