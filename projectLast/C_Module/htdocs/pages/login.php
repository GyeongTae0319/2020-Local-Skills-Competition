<?php
$user = DBGetRow("SELECT * FROM users WHERE id=? AND pw=?", array($_POST["login-id"], md5($_POST["login-pw"])));

if ($user) {
    $_SESSION["user-id"] = $user->id;
    $_SESSION["user-name"] = $user->name;
    $_SESSION["user-photo"] = $user->photo;
    $_SESSION["user-lv"] = $user->lv;
    echo "<script>
        alert('로그인 되었습니다.');
        location.href = '/';
    </script>";
} else {
    echo "<script>
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        location.href = '/';
    </script>";
}
