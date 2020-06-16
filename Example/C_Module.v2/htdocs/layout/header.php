<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>내집만들기</title>
  <link rel="stylesheet" href="resources/css/jquery-ui.min.css">
  <link rel="stylesheet" href="resources/css/bootstrap.css">
  <link rel="stylesheet" href="resources/css/app.css">
  <script src="resources/js/jquery-3.5.1.min.js"></script>
  <script src="resources/js/jquery-ui.js"></script>
  <script src="resources/js/bootstrap.js"></script>
  <script src="resources/js/app.js"></script>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-xl">
      <a class="navbar-brand" href="/">
        <img src="resources/images/logo.png" alt="내집꾸미기" title="내집꾸미기">
      </a>
      <!-- 모바일 버전에서 상호작용 가능한 버튼. 마우스를 올리면 메인 메뉴 보임. -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item <?php if($pages === 'index') echo 'active';?>">
            <a class="nav-link" href="/">홈</a>
          </li>
          <li class="nav-item <?php if($pages === 'housewarming') echo 'active';?>">
            <a class="nav-link" href="/housewarming">온라인 집들이</a>
          </li>
          <li class="nav-item <?php if($pages === 'store') echo 'active';?>">
            <a class="nav-link" href="/store">스토어</a>
          </li>
          <li class="nav-item <?php if($pages === 'specialist') echo 'active';?>">
            <a class="nav-link" href="/specialist">전문가</a>
          </li>
          <li class="nav-item <?php if($pages === 'estimate') echo 'active';?>">
            <a class="nav-link" href="/estimate">시공 견적</a>
          </li>
        </ul>
        <?php
          if (isset($_SESSION['USER_ID'])) {
        ?>
          <!-- 로그아웃 -->
          <span class="color-white mr-3"><?php echo $_SESSION['USER_NAME'];?>(<?php echo $_SESSION['USER_ID'];?>)</span>
          <button class="btn btn-sm btn-light" onclick="location.href='/logout';">로그아웃</button>
        <?php
          } else {
        ?>
          <button class="btn btn-sm btn-light mr-2" onclick="openLoginPopup()">로그인</button>
          <button class="btn btn-sm btn-light" onclick="openJoinPopup()">회원가입</button>
        <?php
          }
        ?>
      </div>
    </div>
  </nav>