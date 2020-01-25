<?php
   class Conection{
      private $host = "localhost";
      private $database = "legisdam_emcEvents";
      private $user = "legisdam_admin";
      private $password = "admin2020"; 
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