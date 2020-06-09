$(function() {
    init();
});

function init() {
    // 상품 정보 로드
    var products = [];
    getProducts(function(datas) {
        products = datas;
        products.forEach(function(product, index) {
            appendProduct(product, index);
        });
    });

    // Drop 영역 설정
    $('#drop-area').droppable({
        drop: function(event, ui) {
            var item = $(ui.draggable);
            var index = item.attr('data-index');
            var img = item.find('img');
            var productName = item.find('.product-name').text();
            var brandName = item.find('.brand-name').text();
            var price = item.find('.price').text();

            // 상품 원위치 시키기
            item.css({
                position: 'relative',
                top: 'auto',
                left: 'auto'
            });

            var productInBasket = $(`#basket-list [data-index=${index}]`);
            if (productInBasket.length) {
                // 중복되는 상품이 있을 경우
                alert('이미 장바구니에 담긴 상품입니다.');
                return;
            }

            var newItem = $(`
            <div class="card-deck">
                <div class="card mb-3" style="max-width: 540px;" data-index="${index}">
                    <div class="row no-gutters">
                        <div class="col-md-4 overflow-hidden">
                            <img src="${img.attr('src')}" class="card-img h-100 w-auto" alt="${productName}" title="${productName}">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                            <h5 class="card-title product-name">${productName}</h5>
                            <p class="card-text brand-name">${brandName}</p>
                            <p class="card-text"><small class="text-muted price">${price}</small></p>
                            <p class="card-text">
                                <div class="input-group input-group-sm mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroup-sizing-sm-${index}">수량</span>
                                    </div>
                                    <input type="number" min="1" value="1" class="form-control number" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm-${index}">
                                </div>
                            </p>
                            <p class="card-text">합계 <span class="sum">${price}</span>원</p>
                            </div>
                        </div>
                        <button type="button" class="col-md-1 btn-delete">X</button>
                    </div>
                </div>
            </div>
            `);

            newItem.find("input[type='number']").on('keyup change', function() {
                var sum = parseInt(price, 10) * $(this).val();
                newItem.find('.sum').text(sum);

                setTotalSum();
            });

            newItem.find('button.btn-delete').on('click', function() {
                newItem.remove();
                setTotalSum();
            });

            $('#basket-list').append(newItem);
            setTotalSum();
        }
    });
}

function setTotalSum() {
    var totalSum = 0;

    $('#basket-list .sum').each(function() {
        totalSum += parseInt($(this).text(), 10);
    });

    $('#total-sum').text(totalSum);
}

function getProducts(cb) {
    $.ajax({
        url: 'resources/json/store.json',
        success: function(datas) {
            cb(datas.products);
        }
    });
}

function appendProduct(product, index) {
    var newItem = $(`
        <div class="card col-4 p-0" data-index="${index}">
            <img src="resources/images/${product.photo}" class="card-img-top" alt="${product.product_name}" title="${product.product_name}">
            <div class="card-body">
                <h5 class="card-title product-name">${product.product_name}</h5>
                <p class="card-text brand-name">${product.brand_name}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted price">${product.price}</small>
            </div>
        </div>
    `).draggable({
        zIndex: 999,
        revert: 'invalid'
    });

    $('#product-list').append(newItem);
}

function openBuyPopup() {
    var basketList = $('#basket-list *');
    if (!basketList.length) {
        alert('장바구니가 비어있습니다.');
        return;
    }

    $('#name, #address').val('');
    $('#popup-buy').dialog({
        // autoOpen: false,
        width: 350,
        height: 250,
        modal: true,
        buttons: {
            '구매완료': function() {
                var name = $('#name').val();
                var address = $('#address').val();

                if (!name) {
                    alert('이름을 입력해주세요.');
                    return;
                }

                if (!address) {
                    alert('주소를 입력해주세요.');
                    return;
                }

                $(this).dialog('close');
                buy();
            },
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event, ui) {
            $(event.target).dialog('widget')
                .css({ position: 'fixed' })
                .position({ my: 'center', at: 'center', of: window });
        }
    });
}

function buy() {
    openReceiptPopup();
    $('#basket-list').html('');
    setTotalSum();
}

function openReceiptPopup() {
    // 영수증 이미지 생성
    var cvs = $('#receipt');
    var ctx = cvs[0].getContext('2d');
    var itemLen = $('#basket-list > div').length;

    cvs.attr({
        width: 300,
        height: 200 + (120 * itemLen)
    });

    ctx.font = 'bold 20px Margun Gothic';
    ctx.fillStyle = 'black';
    ctx.fillText('영수증', 10, 20);

    var date = new Date();
    var datetime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    ctx.font = 'bold 14px Margun Gothic';
    ctx.fillText(datetime, 10, 50);
    
    $('#basket-list > div').each(function(i) {
        var productName = $(this).find('.product-name').text();
        var brandName = $(this).find('.brand-name').text();
        var price = $(this).find('.price').text();
        var number = $(this).find('.number').val();
        var sum = $(this).find('.sum').text();

        ctx.fillText(productName, 10, 120 * (i + 1));
        ctx.fillText(brandName, 10, 120 * (i + 1) + 20);
        ctx.fillText(`가격 : ${price}`, 10, 120 * (i + 1) + 40);
        ctx.fillText(`수량 : ${number}`, 10, 120 * (i + 1) + 60);
        ctx.fillText(`합계 : ${sum}`, 10, 120 * (i + 1) + 80);
    });

    var totalSum = $('#total-sum').text();
    ctx.fillText(`총 합계 : ${totalSum}`, 10, 120 * itemLen + 150);

    $('#popup-receipt').dialog({
        width: 500,
        height: 500,
        modal: true,
        buttons: {
            '닫기': function() {
                $(this).dialog('close');
            }
        },
        open: function(event, ui) {
            $(event.target).dialog('widget')
                .css({ position: 'fixed' })
                .position({ my: 'center', at: 'center', of: window });
        }
    })
}

function onSearch(val) {
    var resultCount = 0;

    $('#product-list > div').each(function() {
        var productName = $(this).find('.product-name');
        var brandName = $(this).find('.brand-name');

        if (val === '') {
            $(this).show();
            $('#msg-empty').hide();
            return;
        } else {
            $(this).hide();
        }

        if (productName.text().indexOf(val) !== -1) {
            var pnHighlight = productName.text().replace(val, `<span class='highlight'>${val}</span>`);
            productName.html(pnHighlight);
            $(this).css('display', 'block');
            resultCount++;
        }

        if (brandName.text().indexOf(val) !== -1) {
            var bnHighlight = brandName.text().replace(val, `<span class='highlight'>${val}</span>`);
            brandName.html(bnHighlight);
            $(this).css('display', 'block');
            resultCount++;
        }
    });

    if (resultCount === 0) {
        $('#msg-empty').show();
    } else {
        $('#msg-empty').hide();
    }
}