<?php
$overlap = DBGetRow("SELECT * FROM users WHERE id=?", array($_POST["register-id"]));

if ($_POST["register-captcha"] != $_SESSION["captcha"]) {
    echo "<script>
        alert('자동입력방지 문구를 잘못 입력했습니다.');
        location.href = '/';
    </script>";
} else if ($overlap) {
    echo "<script>
        alert('사용중인 아이디입니다.');
        location.href = '/';
    </script>";
} else if ($_POST["register-pw"] != $_POST["register-repw"]) {
    echo "<script>
        alert('비밀번호 확인이 틀렸습니다.');
        location.href = '/';
    </script>";
} else {
    $photo = $_POST["register-id"]."_".basename($_FILES["register-photo"]["name"]);
    move_uploaded_file($_FILES["register-photo"]["tmp_name"], "/uploads/users/" . $photo);
    DBQuery("INSERT INTO users (id, pw, name, photo) values (?, ?, ?, ?)", array($_POST["register-id"], md5($_POST["register-pw"]), $_POST["register-name"], $photo));
    echo "<script>
    alert('회원가입이 완료되었습니다.');
        location.href = '/';
    </script>";
}
