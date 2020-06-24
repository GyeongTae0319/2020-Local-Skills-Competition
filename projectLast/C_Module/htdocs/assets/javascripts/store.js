// 스토어 페이지 스크립트

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
    photo = "";
    name = "";
    price = 0;
    count = 1;
}

/**전체 상품 목록 저장
 * @type {Array<ProductData>}
 */
var productList = [];
var productNames = [];
/**장바구니 상품 목록 저장
 * @type {Array<BasketData>}
 */
var basketList = [];
var totalPrice = 0;

/**전체 상품 목록 저장
 * @type {Array<ProductData>}
 */
var productList = [];
/**장바구니 상품 목록 저장
 * @type {Array<BasketData>}
 */
var basketList = [];
var totalPrice = 0;

function updateTotal() {
    totalPrice = 0;
    for (let i = 0; i < basketList.length; i++) {
        totalPrice += basketList[i].price * basketList[i].count;
    }

    $("#basket .control .price").html(totalPrice.format());
}

$("article").ready(e => {
    $.getJSON("/assets/json/store.json", data => {
        data.forEach((product) => {
            productList.push({
                id: product.id,
                photo: product.photo,
                name: product.product_name,
                brand: product.brand,
                price: product.price.toNumber(),
            });
            productNames.push(product.product_name);

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
                opacity: 0.5,
                revertDuration: 250,
                zIndex: 512,
            });

            $("#productList .list").append(item);
        })
    });

    $("#search").autocomplete({
        source: productNames,
        focus: (e) => {
            return false;
        },
        select: (e, ui) => {
            $("#search").val(ui.item.value);
        }
    });
    $("#search").keyup(e => {
        let keyword = $("#search").val();

        let noItem = true;
        $("#productList .list").children().each((index, item) => {
            let name = $(item).find(".name");
            let brand = $(item).find(".brand");

            let keys = keyword.split("|");
            let isVisible = false;
            for (let k = 0; k < keys.length; k++) {
                let nr = name.text().searchKeyword(keys[k]);
                let br = brand.text().searchKeyword(keys[k]);

                if (nr != null) {
                    isVisible = true;
                    name.html(`${nr.str.slice(0, nr.start)}<span class="highlight">${nr.match}</span>${nr.str.slice(nr.end)}`)
                } else if (!keyword.length) {
                    isVisible = true;
                    name.html(name.text());
                }

                if (br != null) {
                    isVisible = true;
                    brand.html(`${br.str.slice(0, br.start)}<span class="highlight">${br.match}</span>${br.str.slice(br.end)}`)
                } else if (!keyword.length) {
                    isVisible = true;
                    brand.html(brand.text());
                }
            }
            if (isVisible) {
                $(item).css("display", "flex");
                noItem = false;
            } else {
                $(item).css("display", "none");
            }
        });

        if (noItem) {
            $("#productList .no-item").css("display", "flex");
        } else {
            $("#productList .no-item").css("display", "none");
        }
    })

    $("#dropArea").droppable({
        accept: "#productList .item",
        hoverClass: "hover-item",
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

            item.find(".count").change((e, ui) => {
                let count = $(e.target).val().toNumber();
                if (count < 1) {
                    $(e.target).val(1);
                    count = 1;
                }

                var index = basketList.findIndex(value => {
                    return value.id === data.id;
                });
                basketList[index].count = count;
                item.find(".value.price").html((basketList[index].price * basketList[index].count).format());
                updateTotal();
            });

            item.find(".close").click((e, ui) => {
                var index = basketList.findIndex(value => {
                    return value.id === data.id;
                });
                item.remove();
                basketList.splice(index, 1);
                updateTotal();
            })

            $("#basket .list").append(item);
            updateTotal();
        },
    });

    $("#buy").click(e => {
        if (!basketList.length) {
            alert("장바구니가 비었습니다.");
            return;
        }

        $("#buyInfo").dialog({
            title: "구매 정보 입력",
            position: { my: "center", at: "center", of: window },
            resizable: false,
            open: (e) => {

            }
        })
    })

    $("#buyInfo .submit").click(e => {
        if (!$("#buyName").val().length || !$("#buyAddress").val().length) {
            alert("이름도 주소를 입력해 주세요.");
            return;
        }
        $("#buyInfo").dialog("close");

        $("#buyResult").dialog({
            title: "영수증",
            position: { my: "center", at: "center", of: window },
            width: "auto",
            height: "auto",
            resizable: false,
            open: () => {
                $("#buyName").val("");
                $("#buyAddress").val("");

                let cvs = $("#buyImg");
                /**
                 * @type {CanvasRenderingContext2D}
                 * */
                let ctx = cvs[0].getContext("2d");

                let width = 512;
                let height = 16 + 24 + 8 + 1 + 8 + 16 + 16 + (16 + 8) * basketList.length + 8 + 1 + 16 + 24 + 16;
                cvs.attr({
                    width: width,
                    height: height,
                });

                ctx.fillStyle = "#ffffff";
                ctx.fillText(0, 0, width, height);

                ctx.fillStyle = "#222222";
                ctx.font = "24px sans-serif";
                ctx.textBaseline = "top";
                ctx.textAlign = "center";
                ctx.fillText("영수증", width / 2, 16);

                ctx.fillRect(16, 16 + 24 + 8, width - 32, 1);

                ctx.font = "16px sans-serif";
                ctx.textAlign = "right";
                let date = new Date();
                ctx.fillText(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, width - 16, 16 + 24 + 8 + 1 + 8);

                ctx.font = "16px sans-serif";
                for (let i = 0; i < basketList.length; i++) {
                    let top = 16 + 24 + 8 + 1 + 8 + 16 + 16 + (16 + 8) * i;

                    ctx.textAlign = "left";
                    ctx.fillText(`${basketList[i].name} x ${basketList[i].count}`, 16, top);

                    ctx.textAlign = "right";
                    ctx.fillText(`\\${(basketList[i].count * basketList[i].price).format()}`, width - 16, top);
                }

                ctx.fillRect(16, height - 16 - 24 - 8 - 1, width - 32, 1);

                ctx.font = "24px sans-serif";
                ctx.fillText(`\\${totalPrice.format()}`, width - 16, height - 16 - 24);

                basketList = [];
                $("#basket .list").html("");
            },
        })
    })
})
