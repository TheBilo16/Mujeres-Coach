<?php
   class Publications extends Conection{
      private $table;

      function __construct(){
         parent::__construct();
         $this->table = "publications";
      }

      function InsertPublication($keys){
         try{
            $query = "CALL InsertPublication(:image,:title,:text)";  //Request key = $keys :V
            $stm = $this->con->prepare($query);

            foreach($keys as $key => $value){
               $stm->bindValue($key,$value,PDO::PARAM_STR);
            }
            
            $stm->execute();

            return $stm->rowCount() > 0 ? "true" : "false";
         }catch(PDOException $err){
            die($err->getMessage());
         }
      }

      function SelectPublication($filter = "all",$paramFilter = null){
         try{
            $query = "";
            $data = null;

            switch($filter){
               case "all" : 
                  $query = "select * from {$this->table} order by id_publication desc";
                  $stm = $this->con->prepare($query);
                  $stm->execute();
                  $data = $stm->fetchAll();
                  break;
               case "title":
                  $query = "select * from {$this->table} where title_publication = :title";
                  $stm = $this->con->prepare($query);
                  $stm->bindValue(":title",$paramFilter);
                  $stm->execute();
                  $data = $stm->fetchAll();
                  break;
               case "like":
                  $query = "select * from {$this->table} where title_publication LIKE CONCAT('%',:title,'%')";
                  $stm = $this->con->prepare($query);
                  $stm->bindValue(":title",$paramFilter);
                  $stm->execute();
                  $data = $stm->fetchAll();
                  break;

            }

            return json_encode($data);
         }
         catch(PDOException $err){
            die($err->getMessage());
         }
      }
   }