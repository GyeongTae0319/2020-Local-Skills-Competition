<?php
    session_start();

    $code = '';
    $str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDXCFGHJKLZXCVBNM1234567890';
    for ($i = 0; $i < 5; $i++) {
        $code .= substr($str, rand(0, (strlen($str) - 1)), 1);
    }

    $_SESSION["CAPTCHA"] = $code;

    $im = imagecreatetruecolor(70, 30);
    $bg = imagecolorallocate($im, 22, 86, 165);
    $fg = imagecolorallocate($im, 255, 255, 255);

    imagefill($im, 0, 0, $bg);
    imagestring($im, 5, 5, 5,  $code, $fg);
    
    header("Cache-Control: no-cache, must-revalidate");
    header('Content-type: image/png');
    imagepng($im);
    imagedestroy($im);
?>
