<?php
   class User extends Conection{
      private $table;
      function __construct(){
         parent::__construct();
         $this->table = "user";
      }

      function Login($user,$pass){
         try{
            $query = "SELECT * FROM {$this->table} WHERE `name` = :user AND `password` = :pass";
            
            $stm = $this->con->prepare($query);
            $stm->bindValue(":user",$user,PDO::PARAM_STR);
            $stm->bindValue(":pass",$pass,PDO::PARAM_STR);
            $stm->execute();
            
            return $stm->rowCount() == 1 ? "true" : "false";
         }catch(PDOException $err){
            die($err->getMessage());
         }
      }
   }