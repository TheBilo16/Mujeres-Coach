<?php ob_start(); ?>

<html style='height: 100%;
            width: 100%;
            font-family: arial;'>
    <body style='height: 100%;
                width: 100%;
                margin:0;
                padding:0;
                background: rgba(100,100,100,.06);'>
        <div class='root' style='width: 100%;
                                height: 100%;
                                margin: 0;
                                background: white;'>
            <div class='message-content'>
                    <p class='title-message' style='font-size: 1.8em;
                                                    padding:0;
                                                    margin: 5px 0 10px 0;
                                                    color:#e63c5a'>BrunellaBenavente.com</p>
                </div>
                <div class='row' style='display:flex;align-items:center;font-size:0.9em'>
                            <strong style='margin-right: 10px;'>Asunto:</strong>
                            <span style='color: rgb(80,80,80);'><?php echo $asunt; ?></span>
                </div>
                <div class='row' style='display:flex;align-items:center;font-size:0.9em'>
                            <strong style='margin-right: 10px;'>Nombre:</strong>
                            <span style='color: rgb(80,80,80);'><?php echo $name; ?></span>
                </div>
                <div class='row' style='display:flex;align-items:center;font-size:0.9em'>
                            <strong style='margin-right: 10px;'>Correo electronico:</strong>
                            <span style='color: rgb(80,80,80);'><?php echo $email; ?></span>
                </div>
                <div class='row' style='display:flex;align-items:center;font-size:0.9em'>
                            <strong style='margin-right: 10px;'>Telefono:</strong>
                            <span style='color: rgb(80,80,80);'><?php echo $phone; ?></span>
                </div>
                <p class="text" style="margin: 15px 0 5px 0;font-size:.9em"><strong>Mensaje :</strong></p>
                <p class='text' style='color: rgb(80,80,80);
                                           width:85%;
                                           font-size: .9em;
                                           padding: 0;
                                           margin-left:10px;
                                           line-height: 1.5em;'><?php echo $message; ?></p>

        </div>    
    </body>
</html>

<?php 

$template = ob_get_contents();
ob_end_clean();
return $template;

?>