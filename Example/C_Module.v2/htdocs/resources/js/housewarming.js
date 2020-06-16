function openWritePopup() {
    $('#popup-write').dialog({
        width: 400,
        modal: true,
        buttons: {
            '작성 완료': function() {
                $(this).find('.submit-button')[0].click();
            },
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event, ui) {
            setDialogPositionCenter(event.target);
        }
    });
}

function openGradePopup(idx) {
    $('#popup-grade').dialog({
        width: 250,
        modal: true,
        open: function(event) {
            setDialogPositionCenter(event.target);
            $('#housewarming_idx').val(idx);
        }
    });
}

function submitGrade(num) {
    $('#grade_num').val(num);
    $('#popup-grade .submit-button')[0].click();
}

