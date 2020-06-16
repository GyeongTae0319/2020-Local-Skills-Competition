<?php
    query('insert into request (user_id, user_name, date, description) values (?, ?, ?, ?)', array($_SESSION['USER_ID'], $_SESSION['USER_NAME'], $_POST['date'], $_POST['description']));

    echo "
        <script>
            alert('작성되었습니다.');
            location.href = '/estimate';
        </script>
    ";
?>
