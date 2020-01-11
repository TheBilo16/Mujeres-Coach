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
            $to = "jhonyvegacuya24@gmail.com";
            $email = $_POST["email"];
            $name = $_POST["name"];
            $phone = $_POST["phone"];
            $message = $_POST["message"];
            $asunt = $message;
            $headers ="MIME-Version: 1.0 ";
            $headers.="from: $email";
            $headers.="Content-type: text/html;charset=utf-8 ";
            $headers.="X-Priority: 3";
            $headers.="X-Mailer: smail-PHP ".phpversion();

            $completeMessage = "
            <html>
               <style>
                     *{ 
                           font-family: arial; 
                           margin: 0;
                           padding: 0;
                           box-sizing: border-box;
                     }
                     html,body {
                           height: 100%;
                           width: 100%;
                     }
                     body {
                           background: rgba(100,100,100,.06);
                     }
                     .root {
                           width: 80%;
                           height: 100%;
                           margin: auto;
                           background: white;
                     }
                     .message-title {
                           margin-bottom: 1em;
                           background: rgb(230,60,90);
                           color: white;
                           padding: 20px;
                     }
                     .message-title .body {
                           font-size: 1.5em;
                           font-weight: bold;
                           text-align: center;
                           margin: auto;
                           width: 50%;
                     }
                     .nombre-title {
                           font-style: oblique;
                     }
                     .row {
                           display: flex;
                           align-items: center;
                           padding: 10px 3em;
                     }
                     .row strong {
                           margin-right: 10px;
                     }
                     .row span {
                           color: rgb(80,80,80);
                     }
                     .message-content {
                           padding: 2em 3em;
                     }
                     .message-content .title-message {
                           font-size: 2em;
                     }
                     .text {
                           color: rgb(80,80,80);
                           font-size: .9em;
                           padding: 10px 0;
                           line-height: 20px;
                     }
               </style>
               <body>
                  <div class='root'>
                     <div class='message-title'>
                           <div class='body'>
                              Hola, tienes un nuevo mensaje de <span class='nombre-title'><q>$name</q></span>
                           </div>
                     </div>
                     <div class='message-content'>
                           <p class='title-message'>Nuevo mensaje...</p>
                           <p class='text'>$message</p>
                     </div>
                     <div class='row'><strong>Nombre:</strong><span>$name</span></div>
                     <div class='row'><strong>Correo electrónico:</strong><span>$email</span></div>
                     <div class='row'><strong>Telefono:</strong><span>$phone</span></div>
                  </div>    
               </body>
            </html>
            ";

            if(mail($to,$asunt,$completeMessage,$headers)) echo "mailSend";               
            else echo "mailFail";               
         }else{
            echo "ErrorPararms";
         }
      }

   }