<?php
   class Events extends Conection{
      private $table;

      function __construct(){
         parent::__construct();
         $this->table = "events";
      }

      function Insert($keys){
         try{
            $query = "CALL InsertEvent(:image,:title,:text)";  //Request key = $keys :V
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

      function Select($filter = "all",$paramFilter = null){
         try{
            $query = "";
            $data = null;

            switch($filter){
               case "all" : 
                  $query = "select * from {$this->table} order by date_create desc";
                  $stm = $this->con->prepare($query);
                  break;
               case "like":
                  $query = "select * from {$this->table} where title_event LIKE CONCAT('%',:title,'%') order by id_event desc";
                  $stm = $this->con->prepare($query);
                  $stm->bindValue(":title",$paramFilter);
                  break;
            }

            $stm->execute();
            $data = $stm->fetchAll();

            return json_encode($data);
         }
         catch(PDOException $err){
            die($err->getMessage());
         }
      }

      function delete($id){
         try{
            $query = "DELETE FROM {$this->table} WHERE id_event = :id";
            $stm = $this->con->prepare($query);
            $stm->bindValue(":id",$id,PDO::PARAM_INT);
            $stm->execute();

            return $stm->rowCount() > 0 ? "true" : "false";
         }catch(PDOException $err){
            die($err->getMessage());
         }
      }

   }