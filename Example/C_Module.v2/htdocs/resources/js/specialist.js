function openReviewPopup(id, name) {
    $('#popup-review').dialog({
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
            $('#specialist_id').val(id);
            $('#specialist_name').val(name);
        }
    });
}