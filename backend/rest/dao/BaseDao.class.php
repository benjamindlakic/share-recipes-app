<?php

require_once __DIR__ . '/../../config.php';

class BaseDao{
    protected $connection;
    private $table_name;

    public function __construct($table_name){
        $this->table_name = $table_name;
        try{
            $this->connection = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";port=".DB_PORT, DB_USER, DB_PASSWORD, 
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
        }catch(PDOException $e){
            throw $e;
        }
    }

    function query($query, $params = []) {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt;
    }

    function get_all() {
        $stmt = $this->query("SELECT * FROM " . $this->table_name);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function getById($id) {
        $stmt = $this->query("SELECT * FROM " . $this->table_name . " WHERE id = :id", ["id" => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function getById1($id) {
        $stmt = $this->query("SELECT * FROM " . $this->table_name . " WHERE id = :id", ["id" => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function add($entity) {
        $query = "INSERT INTO " . $this->table_name . " (" ;
        foreach ($entity as $column => $value) {
            $query .= $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ") VALUES (";
        foreach ($entity as $column => $value) {
            $query .= ":" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ")";

        $stmt = $this->connection->prepare($query);
        $stmt->execute($entity); 
        $entity['id'] = $this->connection->lastInsertId();
        return $entity;
    }

    public function delete($id) {
        $stmt = $this->connection->prepare("DELETE FROM " . $this->table_name . " WHERE id=:id");
        $stmt->bindParam(':id', $id); 
        $stmt->execute();
    }

    public function update($id, $entity, $id_column = "id") {
        $query = "UPDATE " . $this->table_name . " SET ";
        foreach ($entity as $column => $value) {
            $query .= $column . "= :" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= " WHERE $id_column = :id";

        $stmt = $this->connection->prepare($query);
        $entity['id'] = $id;
        $stmt->execute($entity);
    }

    public function get_user_by_email($email) {
        $stmt = $this->query("SELECT * FROM " . $this->table_name . " WHERE Email = :Email", ["Email" => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function change_password($id, $new_password) {
        $stmt = $this->connection->prepare("UPDATE " . $this->table_name . " SET Password = :new_password WHERE id = :id");
        $stmt->bindParam(':new_password', $new_password);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    }
}