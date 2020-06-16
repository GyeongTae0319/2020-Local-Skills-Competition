<div class="container-xl">
    <h2 class="display-5 mb-5 mt40">시공 견적 요청</h2>
    <div class="row mb-2">
        <input type="button" value="견적 요청" onclick="openRequestPopup()" class="btn btn-dark">
    </div>
    <div class="row">
        <table class="table text-center">
            <thead>
                <tr>
                    <th>요청 회원<br>이름(아이디)</th>
                    <th>시공일</th>
                    <th>내용</th>
                    <th>상태</th>
                    <th>견적 개수</th>
                    <th>견적</th>
                </tr>
            </thead>
            <tbody>
            <?php
                $datas = getRowAll('select * from request order by idx desc', array());
                foreach ($datas as $data) {
            ?>
                <tr>
                    <td><?php echo $data->user_name;?>(<?php echo $data->user_id;?>)</td>
                    <td><?php echo $data->date;?></td>
                    <td><?php echo $data->description;?></td>
                    <td>
                        <?php
                            $choice = getRow('select count(*) as cnt from choice where request_idx=?', array($data->idx));
                            if ($choice->cnt) {
                                echo '완료';
                            } else {
                                echo '진행 중';
                            }
                        ?>
                    </td>
                    <td>
                        <?php
                            $estimate = getRow('select count(*) as cnt from estimate where request_idx=?', array($data->idx));
                            if ($estimate->cnt) {
                                echo $estimate->cnt;
                            } else {
                                echo '0';
                            }
                        ?>
                    </td>
                    <td>
                        <?php
                            $already_extimate = getRow('select count(*) as cnt from estimate where request_idx=? and specialist_id=?', array($data->idx, $_SESSION['USER_ID']));

                            if ($_SESSION['USER_LEVEL'] === 1 && $choice->cnt === 0 && $already_extimate->cnt === 0) {
                        ?>
                            <input type="button" value="견적 보내기" class="btn btn-dark" onclick="openEstimatePopup(<?php echo $data->idx;?>)">
                        <?php
                            }
                        ?>
                        
                        <?php
                            if ($data->user_id === $_SESSION['USER_ID']) {
                        ?>
                            <input type="button" value="견적 보기" class="btn btn-dark" onclick="openChoicePopup(<?php echo $data->idx;?>)">
                            <div id="popup-choice-<?php echo $data->idx;?>" title="견적 보기">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>전문가<br>이름(아이디)</th>
                                            <th>비용</th>
                                            <th>선택</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                            $estimate_datas = getRowAll('select * from estimate where request_idx=? order by idx desc', array($data->idx));
                                            foreach($estimate_datas as $estimate_data) {
                                                $specialist = getRow('select * from users where user_id=?', array($estimate_data->specialist_id));
                                        ?>
                                        <tr>
                                            <td><?php echo $specialist->user_name;?>(<?php echo $estimate_data->specialist_id;?>)</td>
                                            <td><?php echo $estimate_data->price;?></td>
                                            <td>
                                                <?php
                                                    if ($choice->cnt === 0) {
                                                ?>
                                                <form action="/choice" method="post">
                                                    <input type="hidden" name="request_idx" value="<?php echo $data->idx;?>">
                                                    <input type="hidden" name="estimate_idx" value="<?php echo $estimate_data->idx;?>">
                                                    <input type="hidden" name="specialist_id" value="<?php echo  $estimate_data->specialist_id;?>">
                                                    <input type="submit" value="선택" class="btn btn-dark">
                                                </form>
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
    
    <?php
        if($_SESSION['USER_LEVEL'] === 1) {
    ?>
    <h2 class="display-5 mb-5 mt40">보낸 견적 리스트</h2>
    <div class="row">
        <table class="table">
            <thead>
                <tr>
                    <th>요청 회원<br>이름(아이디)</th>
                    <th>시공일</th>
                    <th>내용</th>
                    <th>입력한 비용</th>
                    <th>선택 여부</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $datas = getRowAll('select * from estimate where specialist_id=? order by idx desc', array($_SESSION['USER_ID']));
                    foreach ($datas as $data) {
                        $request_info = getRow('select * from request where idx=?', array($data->request_idx));
                ?>
                <tr>
                    <td>
                        <?php
                            echo $request_info->user_name.'('.$request_info->user_id.')';
                        ?>
                    </td>
                    <td><?php echo $request_info->date;?></td>
                    <td><?php echo $request_info->description;?></td>
                    <td><?php echo $data->price;?></td>
                    <td>
                        <?php
                            $all_choice_cnt = getRow('select count(*) as cnt from choice where request_idx=?', array($data->request_idx));
                            $choice_cnt = getRow('select count(*) as cnt from choice where estimate_idx=?', array($data->idx));

                            if ($all_choice_cnt->cnt) {
                                if ($choice_cnt->cnt) {
                                    echo '선택';
                                } else {
                                    echo '미선택';
                                }
                            } else {
                                echo '진행 중';
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
    <?php
        }
    ?>
</div>
<div id="popup-request" title="시공 견적 요청">
    <form action="/request" method="post">
        <div class="row mb-2">
            <div class="col-4">
                <label for="date">시공일</label>
            </div>
            <div class="col-8">
                <input type="date" name="date" class="form-control" required="required">
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
        <input type="submit" value="작성 완료" class="submit-button">
    </form>
</div>
<div id="popup-estimate" title="견적 보내기">
    <form action="/estimate_add" method="post">
        <input type="hidden" name="request_idx" id="estimate_request_idx">
        <div class="row mb-2">
            <div class="col-4">
                <label for="price">비용</label>
            </div>
            <div class="col-8">
                <input type="number" name="price" class="form-control" required="required">
            </div>
        </div>
        <input type="submit" value="입력 완료" class="submit-button">
    </form>
</div>

<script src="resources/js/estimate.js"></script>