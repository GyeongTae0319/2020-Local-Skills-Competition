<?php
session_start();

$str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ";
$captcha = "";
for ($i = 0; $i < 5; $i++) {
    $captcha .= substr($str, rand(0, strlen($str) - 1), 1);
}

$_SESSION["captcha"] = $captcha;

$img = imagecreatetruecolor(36, 13);
$tCol = imagecolorallocate($img, 34, 34, 34);
$bCol = imagecolorallocate($img, 255, 255, 255);

imagefill($img, 0, 0, $bCol);
imagestring($img, 3, 1, -1, $captcha, $tCol);

header("Cache-Control: no-cache, must-revalidate");
header("Content-type: image/png");
imagepng($img);
imagedestroy($img);