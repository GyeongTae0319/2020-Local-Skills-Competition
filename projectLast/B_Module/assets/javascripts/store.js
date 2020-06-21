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
                        <img src="/assets/images/products/${product.photo}" title="${product.product_name}" alt="${product.product_name}" class="thumbnail">
                        <div class="details">
                            <span class="product-name">${product.product_name}</span>
                            <span class="product-brand">${product.brand}</span>
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
                console.log(ui.draggable);
            },
        });
    });
});