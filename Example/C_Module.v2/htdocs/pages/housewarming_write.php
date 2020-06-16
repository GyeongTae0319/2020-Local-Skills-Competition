<?php
    $target_dir = 'uploads/';

    // Before 사진 업로드
    $target_before_file = rand()."_before_".basename($_FILES['before_photo']['name']);
    move_uploaded_file($_FILES['before_photo']['tmp_name'], $target_dir.$target_before_file);

    // After 사진 업로드
    $target_after_file = rand()."_after_".basename($_FILES['after_photo']['name']);
    move_uploaded_file($_FILES['after_photo']['tmp_name'], $target_dir.$target_after_file);
    
    // DB에 추가
    query('INSERT INTO housewarming_party (before_photo, after_photo, user_name, user_id, date, description) values (?, ?, ?, ?, now(), ?)', array($target_before_file, $target_after_file, $_SESSION['USER_NAME'], $_SESSION['USER_ID'], $_POST['description']));

    echo "
        <script>
            alert('등록되었습니다.');
            location.href = '/housewarming';
        </script>
    ";
?>