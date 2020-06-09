<?php
    $result = getRow('select * from users where user_id=?', array($_POST['id']));
    if ($result) {
        $_SESSION['USER_ID'] = $result->user_id;
        $_SESSION['USER_NAME'] = $result->user_name;
        $_SESSION['USER_LEVEL'] = $result->user_level;
        echo "
            <script>
                alert('로그인 되었습니다.');
                location.href = '/';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                location.href = '/';
            </script>
        ";
    }
?>