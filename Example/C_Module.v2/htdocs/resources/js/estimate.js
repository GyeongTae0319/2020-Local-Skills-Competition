function openRequestPopup() {
    $('#popup-request').dialog({
        width: 500,
        modal: true,
        buttons: {
            '작성 완료': function() {
                $(this).find('.submit-button')[0].click();
            },
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event) {
            setDialogPositionCenter(event.target);
        }
    });
}

function openEstimatePopup(idx) {
    $('#popup-estimate').dialog({
        width: 500,
        modal: true,
        buttons: {
            '입력 완료': function() {
                $(this).find('.submit-button')[0].click();
            },
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event) {
            setDialogPositionCenter(event.target);
            $('#estimate_request_idx').val(idx);
        }
    });
}

function openChoicePopup(idx) {
    $('#popup-choice-' + idx).dialog({
        width: 500,
        modal: true,
        buttons: {
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event) {
            setDialogPositionCenter(event.target);
        }
    });
}