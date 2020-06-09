  <footer id="footer" class="bg-dark mt100">
    <div class="container-xl">
      Copyright(c) 2020 내집꾸미기. All rights reserved.
    </div>
  </footer>
  <div id="popup-login" title="로그인">
        <form method="post" action="/login">
            <fieldset>
                <div class="row mb-2">
                    <div class="col-4"><label for="user-login-id">아이디</label></div>
                    <div class="col-8"><input type="text" name="id" id="user-login-id" class="form-control" required="required"></div>
                </div>
                <div class="row">
                    <div class="col-4"><label for="user-login-pw">비밀번호</label></div>
                    <div class="col-8"><input type="password" name="pw" id="user-login-pw" class="form-control" required="required"></div>
                </div>
                <button class="submit-button">로그인</button>
            </fieldset>
        </form>
    </div>
    <div id="popup-join" title="회원가입">
        <form method="post" action="/join" enctype="multipart/form-data">
            <fieldset>
                <div class="row mb-2">
                    <div class="col-4"><label for="user-join-id">아이디</label></div>
                    <div class="col-8"><input type="text" name="id" id="user-join-id" class="form-control" required="required"></div>
                </div>
                <div class="row mb-2">
                    <div class="col-4"><label for="user-join-pw">비밀번호</label></div>
                    <div class="col-8"><input type="password" name="pw" id="user-join-pw" class="form-control" required="required"></div>
                </div>
                <div class="row mb-2">
                    <div class="col-4"><label for="user-join-name">이름</label></div>
                    <div class="col-8"><input type="text" name="name" id="user-join-name" class="form-control" required="required"></div>
                </div>
                <div class="row mb-2">
                    <div class="col-4"><label for="user-join-photo">사진</label></div>
                    <div class="col-8"><input type="file" name="photo" id="user-join-photo" class="form-control" required="required"></div>
                </div>
                <div class="row">
                    <div class="col-4"><img src="" class="chaptcha"></div>
                    <div class="col-8"><input type="text" name="captcha" id="captcha-input" class="form-control" required="required"></div>
                </div>
                <button class="submit-button">로그인</button>
            </fieldset>
        </form>
    </div>
</body>
</html>