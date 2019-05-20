<?php

  return [
    'register' => [
      'privelege' => 'guest',
      'schema' => require('schemata/user/register.php'),
      'router' => require(__DIR__.'/../routes/user/register.php')
    ],
    'login' => [
      'privelege' => 'guest',
      'schema' => require('schemata/user/login.php'),
      'router' => require(__DIR__.'/../routes/user/login.php')
    ],
    'submitContactMessage' => [
      'privelege' => 'guest',
      'schema' => require('schemata/contact/submitContactMessage.php'),
      'router' => require(__DIR__.'/../routes/contact/submitContactMessage.php')
    ],
    'getContactMessages' => [
      'privelege' => 'user',
      'schema' => [],
      'router' => require(__DIR__.'/../routes/contact/getContactMessages.php')
    ],
    'deleteContactMessage' => [
      'privelege' => 'user',
      'schema' => require('schemata/contact/deleteContactMessage.php'),
      'router' => require(__DIR__.'/../routes/contact/deleteContactMessage.php')
    ],
    'addService' => [
      'privelege' => 'user',
      'schema' => require('schemata/service/addService.php'),
      'router' => require(__DIR__.'/../routes/service/addService.php')
    ],
    'getServices' => [
      'privelege' => 'guest',
      'schema' => [],
      'router' => require(__DIR__.'/../routes/service/getServices.php')
    ],
    'updateService' => [
      'privelege' => 'user',
      'schema' => require('schemata/service/updateService.php'),
      'router' => require(__DIR__.'/../routes/service/updateService.php')
    ],
    'deleteService' => [
      'privelege' => 'user',
      'schema' => require('schemata/service/deleteService.php'),
      'router' => require(__DIR__.'/../routes/service/deleteService.php')
    ],
    'createPortfolioItem' => [
      'privelege' => 'user',
      'schema' => require('schemata/portfolio/createPortfolioItem.php'),
      'router' => require(__DIR__.'/../routes/portfolio/createPortfolioItem.php')
    ],
    'getPortfolioItems' => [
      'privelege' => 'guest',
      'schema' => [],
      'router' => require(__DIR__.'/../routes/portfolio/getPortfolioItems.php')
    ],
    'updatePortfolioItem' => [
      'privelege' => 'user',
      'schema' => require('schemata/portfolio/updatePortfolioItem.php'),
      'router' => require(__DIR__.'/../routes/portfolio/updatePortfolioItem.php')
    ],
    'deletePortfolioItem' => [
      'privelege' => 'user',
      'schema' => [ 'id' => [ 'required' => true, 'type' => 'integer' ]],
      'router' => require(__DIR__.'/../routes/portfolio/deletePortfolioItem.php')
    ],
    'uploadPortfolioImg' => [ //unused
      'privelege' => 'user',
      'schema' => [],
      'router' => require(__DIR__.'/../routes/portfolio/uploadPortfolioImg.php')
    ],
    'getPortfolioImgList' => [
      'privelege' => 'user',
      'schema' => [],
      'router' => require(__DIR__.'/../routes/portfolio/getPortfolioImgList.php')
    ],
    'deletePortfolioImg' => [
      'privelege' => 'user',
      'schema' => [ 'filename' => [ 'required' =>  true, 'type' => 'string', 'regex' => '/^[a-zA-Z0-9.]*$/' ]],
      'router' => require(__DIR__.'/../routes/portfolio/deletePortfolioImg.php')
    ]

  ];

?>