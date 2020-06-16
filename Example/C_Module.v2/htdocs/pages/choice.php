<?php
    query('insert into choice (request_idx, estimate_idx, specialist_id) values (?, ?, ?)', array($_POST['request_idx'], $_POST['estimate_idx'], $_POST['specialist_id']));

    echo "
        <script>
            alert('선택되었습니다.');
            location.href = '/estimate';
        </script>
    ";
?>
