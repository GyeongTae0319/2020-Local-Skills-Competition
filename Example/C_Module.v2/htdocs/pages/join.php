<?php
    $result = getRow('SELECT * FROM users WHERE user_id=?', array($_POST['join-user-id']));
    if ($_SESSION['CAPTCHA'] !== $_POST['join-user-captcha']) {
        echo "
            <script>
                alert('자동입력방지 문구를 잘못 입력하였습니다.');
                location.href = '/';
            </script>
        ";
    } else if ($result) {
        echo "
            <script>
                alert('중복되는 아이디입니다. 다른 아이디를 사용해주세요.');
                location.href = '/';
            </script>
        ";
    } else {
        // 파일 이름 및 경로
        $target_dir = 'uploads/';
        $target_file = rand()."_".basename($_FILES['join-user-photo']['name']);

        // 파일 업로드
        move_uploaded_file($_FILES['join-user-photo']['tmp_name'], $target_dir.$target_file);

        // DB 추가
        query('INSERT INTO users (user_id, user_password, user_name, user_photo, user_level) values (?, ?, ?, ?, ?)', array($_POST['join-user-id'], md5($_POST['join-user-password']), $_POST['join-user-name'], $target_file, 0));

        echo "
            <script>
                alert('가입이 완료되었습니다.');
                location.href = '/';
            </script>
        ";
    }
?>