<?php

  return [
    'title' => [
      'required' => false,
      'type' => 'string',
      'minLength' => 3,
      'isCommonWriting' => true
    ],
    'technologies' => [
      'required' => false,
      'type' => 'string',
      'minLength' => 1,
      'isCommonWriting' => true
    ],
    'screenshotSrc' => [
      'required' => false,
      'type' => 'string'
    ],
    'bullets' => [
      'type' => 'string',
      'isCommonWriting' => true
    ],
    'links' => [
      'required' => false,
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