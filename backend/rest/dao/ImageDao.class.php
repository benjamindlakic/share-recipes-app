<?php

require_once __DIR__ . '/BaseDao.class.php';

class ImageDao extends BaseDao  {
   
    public function __construct() {
        parent::__construct("Images");
    }

}

?>
