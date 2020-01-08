<?php
   class Conection{
      private $host = "127.0.0.1";
      private $database = "blogBrunella";
      private $user = "root";
      private $password = "1234";
      protected $con = null;

      function __construct(){
         try{
            $this->con = new PDO("mysql:host={$this->host};dbname={$this->database}",$this->user,$this->password);
            $this->con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);   
         }catch(PDOException $err){
            die($err->getMessage());
         }
      }
   }