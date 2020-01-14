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

      function contact(){
         $url = $this->routerBase . "contact.html";
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

      function events(){
         $url = $this->routerBase . "events.html";
         require_once($url);
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
      function eventRequest(){
         require_once("model/Conection.php");
         require_once("model/Events.php");
         
         $events = new Events();
         $event = $events->Select();
         
         echo $event;
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
      function SearchByTitleEvent(){
         require_once("model/Conection.php");
         require_once("model/Events.php");
         $events = new Events();
         if(isset($_GET["title"])) {
            echo $events->Select("like",$_GET["title"]);
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
            $path = "public/publications/" . $_FILES["image"]["name"];
            $type = explode("/",$_FILES["image"]["type"]);
            $size = $_FILES["image"]["size"];
   
            if($type[1] == "png" || $type[1] == "jpeg" || $type[1] == "jpg"){
               
               define("MB",1048576);

               if($size < (2 * MB)){
                  require_once("model/Conection.php");
                  require_once("model/Publications.php");
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
                  echo "LimitSize";
               }   

            }else{
               echo "NoImage";
            }
         }else{
            echo "false";
         }
      }

      function AdminCreateEvent(){
         if(isset($_FILES["image"])){

            $path = "public/events/" . $_FILES["image"]["name"];
            $type = explode("/",$_FILES["image"]["type"]);
            $size = $_FILES["image"]["size"];
   
            if($type[1] == "png" || $type[1] == "jpeg" || $type[1] == "jpg"){
               
               define("MB",1048576);

               if($size < (2 * MB)){
                  require_once("model/Conection.php");
                  require_once("model/events.php");
                  $events = new Events();

                  $values = [
                     ":image" => $path,
                     ":title" => $_POST["title"],
                     ":text" => $_POST["text"] 
                  ];  
                  
                  $response = $events->Insert($values);
                  if($response == "true"){
                     $image_path = $_FILES["image"]["tmp_name"];
                     if(move_uploaded_file($image_path,$path)){
                        echo $response;
                     }
                  }else if($response == "false"){
                     echo "ErrorUpdload";
                  }

               }else{
                  echo "LimitSize";
               }   

            }else{
               echo "NoImage";
            }
         }else{
            echo "false";
         }
      }

      function AdminDeletePublication(){
         if(isset($_POST["id_publication"])){
            require_once("model/Conection.php");
            require_once("model/Publications.php");

            $id = intval($_POST["id_publication"]);
            $publications = new Publications();
            $response = $publications->deletePublication($id);

            echo ($response == "true" ? "deleteOk" : "deleteFail");
         }else{
            echo "deleteFail";
         }
      }

      function AdminDeleteEvent(){
         if(isset($_POST["id_publication"])){
            require_once("model/Conection.php");
            require_once("model/Events.php");

            $id = intval($_POST["id_publication"]);
            $events = new Events();
            $response = $events->delete($id);

            echo ($response == "true" ? "deleteOk" : "deleteFail");
         }else{
            echo "deleteFail";
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

      function SendEmail() {
         if(isset($_POST["name"])){
            $to = "Coaching.pnl@brunellabenavente.com";
            $email = $_POST["email"];
            $name = $_POST["name"];
            $phone = $_POST["phone"];
            $message = $_POST["message"];
            $asunt = "Correo de contacto";
            $headers ="MIME-Version: 1.0 \r\n";
            $headers.="from: brunellabenavente.com \r\n";
            $headers.="Reply-To:$email \r\n";
            $headers.="Content-type: text/html;charset=utf-8 ";
            $headers.="X-Priority: 3 \r\n";
            $headers.= "X-MSMail-Priority: Normal\n";
            $headers.="X-Mailer: smail-PHP ".phpversion();
            $completeMessage = include("__template__.php");

            if(mail($to,$asunt,$completeMessage,$headers)) echo "mailSend";               
            else echo "mailFail";               
         }else{
            echo "ErrorPararms";
         }
      }

   }