<?php

require_once 'BaseService.class.php';
require_once __DIR__ . "/../dao/ImageDao.class.php";

class ImageService extends BaseServices {

    public function __construct()
    {
        parent::__construct(new ImageDao);
    }
}
?>