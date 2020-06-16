<?php
    query('insert into review (specialist_id, specialist_name, user_id, user_name, price, description, grade_num) values (?, ?, ?, ?, ?, ?, ?)', array($_POST['specialist_id'], $_POST['specialist_name'], $_SESSION['USER_ID'], $_SESSION['USER_NAME'], $_POST['price'], $_POST['description'], $_POST['grade_num']));

    echo "
        <script>
            alert('작성되었습니다.');
            location.href = '/specialist';
        </script>
    ";
?>
