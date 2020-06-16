<div class="container-xl">
    <h2 class="display-5 mb-5 mt40">전문가 리스트</h2>
    <div class="row">
        <?php
            $datas = getRowAll('select * from users where user_level=?', array(1));
            foreach ($datas as $data) {
        ?>
        <div class="col-3 text-center">
            <div class="image-wrapper mb-2"><img src="uploads/<?php echo $data->user_photo;?>" width="100%"></div>
            <div class="mb-2"><?php echo $data->user_name;?>(<?php echo $data->user_id;?>)</div>
            <div class="mb-2">
                <?php
                    $grade_avg = getRow('select count(*) as cnt, avg(grade_num) as grade_avg from review where specialist_id=?', array($data->user_id));
                    if ($grade_avg->cnt) {
                        echo floor($grade_avg->grade_avg);
                    } else {
                        echo '0';
                    }
                ?>
            </div>
            <div><input type="button" value="시공 후기작성" class="btn btn-dark" onclick="openReviewPopup('<?php echo $data->user_id;?>', '<?php echo $data->user_name;?>')"></div>
        </div>
        <?php
            }
        ?>
    </div>
    <h2 class="display-5 mb-5 mt40">시공 후기</h2>
    <div class="row">
        <table class="table text-center">
            <thead>
                <tr>
                    <th>전문가<br>이름(아이디)</th>
                    <th>작성자<br>이름(아이디)</th>
                    <th>비용</th>
                    <th>내용</th>
                    <th>평점</th>
                </tr>
            </thead>
            <tbody>
            <?php
                $datas = getRowAll('select * from review order by idx desc', array());
                foreach ($datas as $data) {
            ?>
                <tr>
                    <td><?php echo $data->specialist_name;?>(<?php echo $data->specialist_id;?>)</td>
                    <td><?php echo $data->user_name;?>(<?php echo $data->user_id;?>)</td>
                    <td><?php echo $data->price;?></td>
                    <td><?php echo $data->description;?></td>
                    <td><?php echo $data->grade_num;?></td>
                </tr>
            <?php
                }
            ?>
            </tbody>
        </table>
    </div>
</div>
<div id="popup-review" title="시공 후기 작성">
    <form action="/review" method="post">
        <input type="hidden" name="specialist_id" id="specialist_id">
        <input type="hidden" name="specialist_name" id="specialist_name">
        <div class="row mb-2">
            <div class="col-4">
                <label for="price">비용</label>
            </div>
            <div class="col-8">
                <input type="number" name="price" class="form-control" required="required">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-4">
                <label for="description">내용</label>
            </div>
            <div class="col-8">
                <textarea name="description" class="form-control" required="required"></textarea>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-4">
                <label for="grade_num">평점</label>
            </div>
            <div class="col-8">
                <select name="grade_num" class="form-control" required="required">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
        <input type="submit" value="작성 완료" class="submit-button">
    </form>
</div>
<script src="resources/js/specialist.js"></script>