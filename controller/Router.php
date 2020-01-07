<?php
   class Router{
      private $routerBase = "view/html/";

      function __construct(){
         
      }

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
   }