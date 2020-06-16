<?php
    query('insert into grade (housewarming_idx, user_id, grade_num) values (?, ?, ?)', array($_POST['housewarming_idx'], $_SESSION['USER_ID'], $_POST['grade_num']));

    echo "
        <script>
            alert('선택되었습니다.');
            location.href = '/housewarming';
        </script>
    ";
?>