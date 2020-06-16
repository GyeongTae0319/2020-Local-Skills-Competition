<div class="container-xl">
    <h2 class="display-5 mb-5 mt40">온라인 집들이</h2>
    <div class="row">
        <div class="col-12">
            <button class="btn btn-dark" onclick="openWritePopup()">글쓰기</button>
        </div>
    </div>
    <div class="row">
        <table class="table">
            <thead>
                <tr>
                    <td>Before</td>
                    <td>After</td>
                    <td>작성자 이름</td>
                    <td>작성자 아이디</td>
                    <td>작성일</td>
                    <td>노하우</td>
                    <td>평점</td>
                    <td>평점 주기</td>
                </tr>
            </thead>
            <tbody>
            <?php
                $datas = getRowAll('select * from housewarming_party order by idx desc', array());
                foreach($datas as $data) {
            ?>
                <tr>
                    <td>
                        <img src="uploads/<?php echo $data->before_photo;?>" width="200">
                    </td>
                    <td>
                        <img src="uploads/<?php echo $data->after_photo;?>" width="200">
                    </td>
                    <td><?php echo $data->user_name;?></td>
                    <td><?php echo $data->user_id;?></td>
                    <td><?php echo $data->date;?></td>
                    <td><?php echo $data->description;?></td>
                    <td>
                        <?php
                            $grade_avg = getRow('select count(*) as cnt, avg(grade_num) as grade_avg from grade where housewarming_idx=?', array($data->idx));
                            if ($grade_avg->cnt) {
                                echo floor($grade_avg->grade_avg);
                            } else {
                                echo '0';
                            }
                        ?>
                    </td>
                    <td>
                        <?php
                            $grade = getRow("select * from grade where housewarming_idx=? and user_id=?", array($data->idx, $_SESSION['USER_ID']));
                            if (!($data->user_id === $_SESSION['USER_ID'] || $grade)) {
                        ?>
                            <button class="btn btn-sm btn-dark" onclick="openGradePopup(<?php echo $data->idx;?>)">평점주기</button>
                        <?php
                            }
                        ?>
                    </td>
                </tr>
            <?php
                }
            ?>
            </tbody>
        </table>
    </div>
</div>
<div id="popup-write" title="온라인 집들이 글쓰기">
    <form method="post" action="/housewarming_write" enctype="multipart/form-data">
        <div class="row mb-2">
            <div class="col-4">
                <label for="before_photo">Before 사진</label>
            </div>
            <div class="col-8">
                <input type="file" class="form-control" id="before_photo" name="before_photo" required="required">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-4">
                <label for="after_photo">After 사진</label>
            </div>
            <div class="col-8">
                <input type="file" class="form-control" id="after_photo" name="after_photo" required="required">
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <label for="description">노하우</label>
            </div>
            <div class="col-8">
                <textarea id="description" name="description" class="form-control" required="required"></textarea>
            </div>
        </div>
        <input type="submit" value="작성 완료" class="submit-button">
    </form>
</div>
<div id="popup-grade" title="평점 주기">
    <form action="/housewarming_grade" method="post">
        <input type="hidden" name="housewarming_idx" id="housewarming_idx">
        <div class="row text-center">
            <input type="hidden" name="grade_num" id="grade_num">
            <input type="button" value="1" class="btn btn-dark mr-2" onclick="submitGrade(1)">
            <input type="button" value="2" class="btn btn-dark mr-2" onclick="submitGrade(2)">
            <input type="button" value="3" class="btn btn-dark mr-2" onclick="submitGrade(3)">
            <input type="button" value="4" class="btn btn-dark mr-2" onclick="submitGrade(4)">
            <input type="button" value="5" class="btn btn-dark" onclick="submitGrade(5)">
        </div>
        <input type="submit" value="평점 선택" class="submit-button">
    </form>
</div>
<script src="resources/js/housewarming.js"></script>