<div id="popup-join" title="회원가입">
    <form action="/join" method="post" enctype="multipart/form-data">
        <div class="row mb-2">
            <div class="col-4">
                <label for="join-user-id">아이디</label>
            </div>
            <div class="col-8">
                <input type="text" id="join-user-id" name="join-user-id" class="form-control" required="required">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-4">
                <label for="join-user-password">비밀번호</label>
            </div>
            <div class="col-8">
                <input type="password" id="join-user-password" name="join-user-password" class="form-control" required="required">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-4">
                <label for="join-user-name">이름</label>
            </div>
            <div class="col-8">
                <input type="text" id="join-user-name" name="join-user-name" class="form-control" required="required">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-4">
                <label for="join-user-photo">사진</label>
            </div>
            <div class="col-8">
                <input type="file" id="join-user-photo" name="join-user-photo" class="form-control" required="required">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-4">
                <img src="" class="captcha">
            </div>
            <div class="col-8">
                <input type="text" id="join-user-captcha" name="join-user-captcha" class="form-control" required="required">
            </div>
        </div>
        <input type="submit" class="submit-button" value="가입 완료">
    </form>
</div>

<div id="popup-login" title="로그인">
    <form action="/login" method="post">
        <div class="row mb-2">
            <div class="col-4">
                <label for="login-user-id">아이디</label>
            </div>
            <div class="col-8">
                <input type="text" name="login-user-id" id="login-user-id" class="form-control" required="required">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-4">
                <label for="login-user-password">비밀번호</label>
            </div>
            <div class="col-8">
                <input type="password" name="login-user-password" id="login-user-password" class="form-control" required="required">
            </div>
        </div>
        <input type="submit" class="submit-button" value="로그인">
    </form>
</div>