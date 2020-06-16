<?php
    query('insert into estimate (request_idx, specialist_id, price) values (?, ?, ?)', array($_POST['request_idx'], $_SESSION['USER_ID'], $_POST['price']));

    echo "
        <script>
            alert('완료되었습니다.');
            location.href = '/estimate';
        </script>
    ";
?>
