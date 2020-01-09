<?php
   class Comments extends Conection {
      function __construct(){
         parent::__construct();
         $this->table = "comments";
      }
      function InsertComment($keys){

         try{

            $query = $this->con->prepare("call InsertComment(:id_publication,:username,:email,:text_comment)");
            foreach( $keys as $key => $value ) {
               $query->bindValue($key,$value);
            }
            $query->execute();
            if($query->rowCount() > 0) {
               return "true";
            }
            return "false";
            
         }catch(PDOException $err) {
            die($err->getMessage());
            return "false";
         }

      }
      function ViewComment($idPublication){
         $query = $this->con->prepare("SELECT * FROM UsersComments WHERE id_publication = :id_publication");
         $query->bindParam(":id_publication",$idPublication,PDO::PARAM_INT);
         $query->execute();
         return json_encode($query->fetchAll());
      }
   }