<?php ob_start(); ?>

<html style='height: 100%;
            width: 100%;
            font-family: arial;'>
    <body style='height: 100%;
                width: 100%;
                margin:0;
                padding:0;
                background: rgba(100,100,100,.06);'>
        <div class='root' style='width: 80%;
                                height: 100%;
                                margin: 0;
                                background: white;'>
            <div class='message-content'>
                    <p class='title-message' style='font-size: 2em;
                                                    padding:0;
                                                    margin:20px 0;
                                                    color:#e63c5a'>Nuevo mensaje</p>
                </div>
                <div class='row' style='display:flex;align-items:center;margin-bottom:20px'>
                            <strong style='margin-right: 10px;'>Asunto:</strong>
                            <span style='color: rgb(80,80,80);'><?php echo $asunt; ?></span>
                </div>
                <div class='row' style='display:flex;align-items:center;'>
                            <strong style='margin-right: 10px;'>Nombre:</strong>
                            <span style='color: rgb(80,80,80);'><?php echo $name; ?></span>
                </div>
                <div class='row' style='display:flex;align-items:center;'>
                            <strong style='margin-right: 10px;'>Correo electrónico:</strong>
                            <span style='color: rgb(80,80,80);'><?php echo $email; ?></span>
                </div>
                <div class='row' style='display:flex;align-items:center;'>
                            <strong style='margin-right: 10px;'>Telefono:</strong>
                            <span style='color: rgb(80,80,80);'><?php echo $phone; ?></span>
                </div>
                <p class='text' style='color: rgb(80,80,80);
                                           font-size: 1.2em;
                                           padding: 0;
                                           margin:30px 0;
                                           line-height: 20px;'><?php echo $message; ?></p>

        </div>    
    </body>
</html>

<?php 

$template = ob_get_contents();
ob_end_clean();
return $template;

?>