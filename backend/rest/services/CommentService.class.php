<?php

require_once 'BaseService.class.php';
require_once __DIR__ . "/../dao/CommentDao.class.php";

class CommentService extends BaseServices {

    public function __construct()
    {
        parent::__construct(new CommentDao);
    }
}
?>