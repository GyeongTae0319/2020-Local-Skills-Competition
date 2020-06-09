<?php
    session_start();

    $params = isset($_GET['params']) ? explode('/', $_GET['params']) : [];
    $main_menu = isset($params[0]) ? $params[0] : 'index';

    if (!isset($_SESSION['USER_ID'])) {
        if ($main_menu === 'housewarming' || $main_menu === 'specialist' || $main_menu === 'estimate') {
            echo "
                <script>
                    alert('로그인해 주세요.');
                    location.href = '/';
                </script>
            ";
        }
    }
    
    try {
        $db = new PDO("mysql:host=localhost;dbname=db0530;charset=utf8", "root", "");
        $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        echo $e->getMessage();
    }

    function query($query, $array) {
        global $db;
        $stmt = $db->prepare($query);
        return $stmt->execute($array);
    }

    function getRow($query, $array) {
        global $db;
        $stmt = $db->prepare($query);
        $stmt->execute($array);
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        return $result;
    }

    function getRowAll($query, $array) {
        global $db;
        $stmt = $db->prepare($query);
        $stmt->execute($array);
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }
?>