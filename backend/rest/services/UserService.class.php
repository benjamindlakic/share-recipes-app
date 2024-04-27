<?php

require_once 'BaseService.class.php';
require_once __DIR__ . "/../dao/UserDao.class.php";

class UserService extends BaseServices {

    public function __construct()
    {
        parent::__construct(new UserDao);
    }
}
?>