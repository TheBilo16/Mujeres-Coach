<?php
   class Router{
      private $routerBase = "view/html/";

      function home(){
         $url = $this->routerBase . "home.html";
         require_once($url);
      }

      function about(){
         $url = $this->routerBase . "about.html";
         require_once($url);
      }

      function coaching(){
         $url = $this->routerBase . "coaching.html";
         require_once($url);
      }

      function blog(){
         $url = $this->routerBase . "blog.html";
         require_once($url);
      }

      function login(){
         session_start();
         if(!isset($_SESSION["user"])){
            $url = $this->routerBase . "login.html";
            require_once($url);
         }else{
            header("location: index.php?url=admin");
         }
      }

      function admin(){
         session_start();
         if(isset($_SESSION["user"])){
            $url = $this->routerBase . "admin.html";
            require_once($url);
         }else{
            header("location: index.php?url=login");
         }
      }

      //AJAX
      function blogRequestPublication(){
         require_once("model/Conection.php");
         require_once("model/Publications.php");

         $publications = new Publications();
         $blog = $publications->SelectPublication();

         echo $blog;
      }

      function logout(){
         session_start();
         session_destroy();
         echo "true";
      }

      function LoginRequest(){
         if(isset($_POST["user"])){
            require_once("model/Conection.php");
            require_once("model/User.php");
            
            $user = new User();
            $response = $user->Login($_POST["user"],$_POST["pass"]);

            if($response == "true"){
               session_start();
               $_SESSION["user"] = true;
            }

            echo $response;
         }else{
            echo "false";
         }
      }

      function SearchByTitle() {
         require_once("model/Conection.php");
         require_once("model/Publications.php");
         $publications = new Publications();
         if(isset($_GET["title"])) {
            echo $publications->SelectPublication("like",$_GET["title"]);
         }
         else {
            echo "error";
         }
      }

      function FindPublication(){
         require_once("model/Conection.php");
         require_once("model/Publications.php");
         $publications = new Publications();
         if(isset($_GET["id"])) {
            echo $publications->SelectPublication("find",$_GET["id"]);
         }
         else {
            echo "error";
         }
      }

      function AdminCreatePublication(){
         if(isset($_FILES["image"])){
            require_once("model/Conection.php");
            require_once("model/Publications.php");
   
            $path = "public/image_publications/" . $_FILES["image"]["name"];
            $type = explode("/",$_FILES["image"]["type"]);
   
            if($type[1] == "png" || $type[1] == "jpeg" || $type[1] == "jpg"){
               $publications = new Publications();
               
               $values = [
                  ":image" => $path,
                  ":title" => $_POST["title"],
                  ":text" => $_POST["text"] 
               ];  
               
               $response = $publications->InsertPublication($values);
               if($response == "true"){
                  if(move_uploaded_file($_FILES["image"]["tmp_name"],$path)){
                     echo $response;
                  }
               }else if($response == "false"){
                  echo "ErrorUpdload";
               }
            }else{
               echo "NoImage";
            }
         }else{
            echo "false";
         }
      }
      
      function CreateComment() {
         require_once("model/Conection.php");
         require_once("model/Comments.php");
         $comments = new Comments();
            $values = [
               ":id_publication" => $_POST["id_publication"],
               ":username" => $_POST["username"],
               ":email" => $_POST["email"],
               ":text_comment" => $_POST["text_comment"]
            ];
            $response = $comments->InsertComment($values);
            if($response == "true") {
               echo $response;
            } else {
               echo "error publication";
            }
      }

      function AllComments() {
         require_once("model/Conection.php");
         require_once("model/Comments.php");
         $comments = new Comments();
         if(isset($_GET["id_publication"])){
            echo $comments->ViewComment($_GET["id_publication"]);
         }else {
            echo "error";
         }
      }

   }