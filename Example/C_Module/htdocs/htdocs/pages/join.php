<?php
    $result = getRow('select * from users where user_id=?', array($_POST['id']));
    if ($_SESSION['CAPTCHA'] !== $_POST['captcha']) {
        echo "
            <script>
                alert('자동입력방지 문구를 잘못 입력하였습니다.');
                location.href = '/';
            </script>
        ";
    } else if ($result) {
        // 중복
        echo "
            <script>
                alert('중복되는 아이디입니다. 다른 아이디를 사용해주세요.');
                location.href = '/';
            </script>
        ";
    } else {
        // 가입완료
        $target_dir = "uploads/";
        $target_file = rand().'_'.basename($_FILES["photo"]["name"]);
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_dir.$target_file)) {
            query('insert into users (user_id, user_pw, user_name, user_photo, user_level) values (?, ?, ?, ?, ?)', array($_POST['id'], $_POST['pw'], $_POST['name'], $target_file, 0));

            $_SESSION['USER_ID'] = $_POST['id'];
            $_SESSION['USER_NAME'] = $_POST['name'];
            $_SESSION['USER_LEVEL'] = 0;
            echo "
                <script>
                    alert('가입되었습니다.');
                    location.href = '/';
                </script>
            ";
        } else {
            echo "
                <script>
                    alert('사진을 확인해주세요.');
                    location.href = '/';
                </script>
            ";
        }
    }
?>