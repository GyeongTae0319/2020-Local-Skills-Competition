<?php
    session_start();
    
    $pages = isset($_GET['params']) ? $_GET['params'] : 'index';

    if (!isset($_SESSION['USER_ID'])) {
        if ($pages === 'housewarming' || $pages === 'specialist' || $pages === 'estimate') {
            echo "
                <script>
                    alert('로그인해 주세요');
                    location.href = '/';
                </script>
            ";
        }
    }

    try {
        $db = new PDO("mysql:host=localhost;dbname=db_0606;charset=utf8", "root", "");
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