<?php
   if(isset($_GET["url"])){
      require_once("controller/Router.php");
      
      $path = $_GET["url"];
      $router = new Router(); 

      if(method_exists($router,$path))
      {
         $router->{$path}();
      }
      else
      {
         header("location: index.php?url=home");
      }
   }else{
      header("location: index.php?url=home");
   }