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
            $(event.target).dialog('widget')
                .css({ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
        }
    });
}

function openJoinPopup() {
    $('#popup-join').dialog({
        width: 350,
        modal: true,
        buttons: {
            '가입완료': function() {
                $(this).find('.submit-button')[0].click();
            },
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event, ui) {
            $(this).find('.chaptcha').attr('src', '');
            $(this).find('.chaptcha').attr('src', `/pages/captcha.php?rand=${Math.random()}`);
            $(event.target).dialog('widget')
                .css({ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
        }
    });
}