<?php

require_once __DIR__ . '/BaseDao.class.php';

class LikesDislikesDao extends BaseDao  {
   
    public function __construct() {
        parent::__construct("LikesDislikes");
    }

}

?>
