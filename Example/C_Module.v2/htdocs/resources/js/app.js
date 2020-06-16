function openJoinPopup() {
    $('#popup-join').dialog({
        width: 350,
        modal: true,
        buttons: {
            '가입 완료': function() {
                $(this).find('.submit-button')[0].click();
            },
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event, ui) {
            setDialogPositionCenter(event.target);
            $(this).find('.captcha').attr('src', '');
            $(this).find('.captcha').attr('src', `/pages/captcha.php?rand=${Math.random()}`);
        }
    })
}

function openLoginPopup() {
    $('#popup-login').dialog({
        width: 350,
        modal: true,
        buttons: {
            '로그인': function() {
                $(this).find('.submit-button')[0].click();
            },
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event, ui) {
            setDialogPositionCenter(event.target);
        }
    })
}

function setDialogPositionCenter(target) {
    $(target).dialog('widget')
        .css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        });
}