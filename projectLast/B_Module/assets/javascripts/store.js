// 스토어 페이지 스크립트
// - 상품 목록 불러오기

// 스토어 데이터 형식
class ProductJSON {
    id = 0;
    photo = "";
    brand = "";
    product_name = "";
    price = "";
}
// 상품 정보 형식
class ProductData {
    id = 0;
    photo = "";
    name = "";
    brand = "";
    price = 0;
}
// 장바구니 상품 정보 형식
class BasketData {
    id = 0;
    name = "";
    price = 0;
    count = 1;
}

/**전체 상품 목록 저장
 * @type {Array<ProductData>}
 */
var productList = [];
/**장바구니 상품 목록 저장
 * @type {Array<BasketData>}
 */
var basketList = [];
var totalPrice = 0;

// 문서 준비 후
$(document).ready(() => {
    $.getJSON("/assets/json/store.json",
        /**store.json 불러오기 형식
         * 
         * @param {Array<ProductJSON>} data 
         */
        function (data) {
            data.forEach((product) => {
                productList.push({
                    id: product.id,
                    photo: product.photo,
                    name: product.product_name,
                    brand: product.brand,
                    price: product.price.toNumber(),
                });

                var item = $(`
                    <div data-index=${product.id} class="card-ver item">
                        <img src="/assets/images/products/${product.photo}" title="${product.product_name}" alt="${product.product_name}" class="top">
                        <div class="bottom product">
                            <span class="name">${product.product_name}</span>
                            <span class="brand">${product.brand}</span>
                            <span class="price">${product.price}</span>
                        </div>
                    </div>
                `);
                item.draggable({
                    containment: "main",
                    revert: true,
                    revertDuration: 250,
                    zIndex: 512,
                });

                $("#productList .list").append(item);
            })
        }
    ).done(() => {
        $("#dropArea").droppable({
            accept: "#productList .item",
            drop: function(event, ui) {
                var productId = ui.draggable.attr("data-index");
                if (basketList.some((product) => {
                    return product.id == productId;
                })) {
                    alert("이미 장바구니에 담긴 상품입니다.");
                    return;
                }
                /**
                 * @type {ProductData}
                 */
                var data = productList[productId.toNumber() - 1];
                basketList.push({
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    count: 1,
                });

                var item = $(`
                    <div class="card-ver item">
                        <div class="top card-hor">
                            <img src="/assets/images/products/${data.photo}" title="${data.name}" alt="${data.name}" class="left">
                            <div class="right product">
                                <span class="name">${data.name}</span>
                                <span class="brand">${data.brand}</span>
                                <span class="price">${data.price.format()}</span>
                            </div>
                        </div>
                        <div class="bottom">
                            <label class="label-title">
                                <span class="title">수량</span>
                                <input value=1 min=1 type="number" class="value count">
                                <button class="button close"><i class="fa fa-close"></i></button>
                            </label>
                            <div class="label-title">
                                <span class="title">합계</span>
                                <span class="value price">${data.price.format()}</span>
                            </div>
                        </div>
                    </div>
                `);
                item.find(".button.close").click(() => {
                    basketList.splice(basketList.findIndex((value) => {
                        return value.id == data.id;
                    }), 1);
                    item.remove();
                });
                item.find(".count").change((event) => {
                    var count = $(event.target).val().toNumber();
                    var index = basketList.findIndex((value) => {
                        return value.id == data.id;
                    });

                    if (count < 1) {
                        $(event.target).val(1);
                        count = 1;
                    }
                    basketList[index].count = count;

                    item.find(".bottom .price").html((basketList[index].price * basketList[index].count).format());
                    updateTotal();
                })

                $("#basket .list").append(item);
                updateTotal();
            },
        });
    });

    $("#buy").click((event) => {
        if (!basketList.length) {
            alert("장바구니에 상품이 없습니다.");
            return;
        }

        $("#buyInfo").dialog({
            title: "구매 정보",
            position: { my: "center", at: "center", of: window },
            open: () => {},
        })
    });

    $("#doneInfo").click(() => {
        if (!$("#userName").val() || !$("#userAddress").val()) {
            alert("이름과 주소를 입력해주세요.");
            return;
        }
        var name = $("#userName").val(), address = $("#userAddress").val();
        $("#userName").val("");
        $("#userAddress").val("");
        $("#buyInfo").dialog("close");

        var canvas = $("#buyImg");
        /**
         * @type {CanvasRenderingContext2D}
         */
        var context = canvas[0].getContext("2d");

        var width = 512, height = 16 + 24  + 1 + 8 + 16 + 8 + (16 + 8) * basketList.length + 8 + 1 + 8 + 24 + 16;
        canvas.attr({
            width: width,
            height: height
        });
        canvas.css("width", "512px");
        canvas.css("height", `${height}px`);

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);

        context.fillStyle = "#222222";
        context.font = "24px sans-sarif bold";
        context.textBaseline = "top"
        context.textAlign = "center";
        context.fillText("영수증", width / 2, 16);

        context.fillRect(16, 16 + 24 + 8, 512 - 32, 1);

        context.font = "16px sans-sarif bold";
        context.textAlign = "right";
        var today = new Date();
        context.fillText(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`, 512 - 16, 16 + 24 + 8 + 1 + 8);

        for (let i = 0; i < basketList.length; i++) {
            var top = 16 + 24 + 8 + 1 + 8 + 16 + 8 + (16 + 8) * i;
            context.textAlign = "left";
            context.fillText(`${basketList[i].name} x ${basketList[i].count}`, 16, top);

            context.textAlign = "right";
            context.fillText((basketList[i].count * basketList[i].price).format(), 512 - 16, top);
        }

        context.fillRect(16, height - 16 - 24 - 8 - 1, 512 - 32, 1);

        context.textAlign = "right";
        

        $("#buyResult").dialog({
            title: "영수증",
            position: { my: "center", at: "center", of: window },
            width: "auto",
            height: "auto",
            open: () => {
                basketList.splice(0, basketList.length);
                $("#basket .list").children().remove();
                updateTotal();
            },
        });
    })
});

function updateTotal() {
    totalPrice = 0;
    basketList.forEach((data) => {
        totalPrice += data.price * data.count;
    });

    $("#total .price").html(totalPrice.format());
}
