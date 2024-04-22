<?php

require_once 'BaseService.class.php';
require_once __DIR__ . "/../dao/LikesDislikesDao.class.php";

class LikesDislikesService extends BaseServices {

    public function __construct()
    {
        parent::__construct(new LikesDislikesDao);
    }
}
?>