<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>내집꾸미기</title>

    <!-- 사이트 아이콘 -->
    <link rel="shortcut icon" href="/assets/images/brand/Logo.svg" type="image/x-icon">

    <!-- CSS 가져오기 -->
    <link rel="stylesheet" href="/assets/stylesheets/font-awesome.min.css">
    <link rel="stylesheet" href="/assets/jquery/jquery-ui.min.css">
    <link rel="stylesheet" href="/assets/jquery/jquery-ui.structure.min.css">
    <link rel="stylesheet" href="/assets/jquery/jquery-ui.theme.min.css">
    <link rel="stylesheet" href="/assets/stylesheets/document.css">
    <link rel="stylesheet" href="/assets/stylesheets/<?= $target ?>.css">

    <!-- JS 가져오기 -->
    <script src="/assets/jquery/jquery-3.4.1.min.js"></script>
    <script src="/assets/jquery/jquery-ui.min.js"></script>
    <script src="/assets/javascripts/document.js"></script>
    <script src="/assets/javascripts/<?= $target ?>.js"></script>
</head>
<body onload="documentLoad()">
<!-- 헤더 영역 -->
<header>
    <div class="contents">
        <!-- 브랜드 로고 -->
        <a href="/" id="brand">
            <img src="/assets/images/brand/Brand.svg" title="내집꾸미기" alt="내집꾸미기">
        </a>
        <!-- 작은 화면에서 동작하는 햄버거 버튼 -->
        <div id="showHeaderMenu">
            <div class="button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
        <!-- 헤더 링크 및 계정 -->
        <div class="menu">
            <!-- 네비게이션 -->
            <nav>
                <a href="/" class="nav-link">홈</a>
                <a href="/housewarming" class="nav-link">온라인 집들이</a>
                <a href="/store" class="nav-link">스토어</a>
                <a href="/specialist" class="nav-link">전문가</a>
                <a href="/estimate" class="nav-link">시공 견적</a>
            </nav>
            <!-- 계정 -->
            <div class="account">
                <?php
                if (isset($_SESSION["user-id"])) {
                ?>
                <div class="user">
                    <span class="user-name"><?= $_SESSION["user-name"] ?></span>
                    <span class="user-id"><?= $_SESSION["user-id"] ?></span>
                </div>
                <hr>
                <a href="/logout" class="link" id="logout">로그아웃</a>
                <?php
                } else {
                ?>
                <button class="link" id="register">회원가입</button>
                <hr>
                <button class="link" id="login">로그인</button>
                <?php
                }
                ?>
            </div>
        </div>
    </div>
</header>

<form style="display: none;" action="/login" method="post" enctype="multipart/form-data" class="dialog" id="dlLogin">
    <label class="text-input">
        <span class="title">아이디</span>
        <input type="text" name="login-id" required id="loginId">
    </label>
    <label class="text-input">
        <span class="title">비밀번호</span>
        <input type="password" name="login-pw" required id="loginPw">
    </label>
    <button type="submit" class="button">로그인</button>
</form>

<form style="display: none;" action="/register" method="post" enctype="multipart/form-data" class="dialog" id="dlRegister">
    <label class="text-input">
        <span class="title">아이디</span>
        <input type="text" name="register-id" required id="registerId">
    </label>
    <label class="text-input">
        <span class="title">비밀번호</span>
        <input type="password" name="register-pw" required id="registerPw">
    </label>
    <label class="text-input">
        <span class="title">비밀번호 확인</span>
        <input type="password" name="register-repw" required id="registerRepw">
    </label>
    <label class="text-input">
        <span class="title">이름</span>
        <input type="text" name="register-name" required id="registerName">
    </label>
    <label class="text-input">
        <span class="title">사진</span>
        <input type="file" accept=".png,.jpg" name="register-photo" required id="registerPhoto">
    </label>
    <label class="text-input">
        <span class="title">자동입력방지</span>
        <img style="image-rendering: pixelated;" width="72" height="26" src="/pages/captcha.php" alt="자동입력방지 문자" class="captcha">
        <input type="text" name="register-captcha" required id="registerCaptcha">
    </label>
    <button type="submit" class="button">회원가입</button>
</form>
