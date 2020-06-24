<?php
session_start();

$target = isset($_GET["target"]) ? $_GET["target"] : "index";

if (!isset($_SESSION["user-id"])) {
    if ($target == "housewarming" || $target == "specialist" || $target == "estimate") {
        echo "<script>
            alert('로그인을 해주세요.');
            location.href = '/';
        </script>";
    }
}

try {
    $db = new PDO("mysql:host=localhost;dbname=myhouse;charset=utf8", "root", "");
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $error) {
    echo $error->getMessage();
}

function DBQuery($query, $array) {
    global $db;
    $state = $db->prepare($query);
    return $state->execute($array);
}

function DBGetRow($query, $array) {
    global $db;
    $state = $db->prepare($query);
    $state->execute($array);
    return $state->fetch(PDO::FETCH_OBJ);
}

function DBGetRowAll($query, $array) {
    global $db;
    $state = $db->prepare($query);
    $state->execute($array);
    return $state->fetchAll(PDO::FETCH_OBJ);
}
