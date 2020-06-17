const CHOSEONG = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
];

/**숫자에 단위를 맞춰 반점을 넣습니다.
 */
Number.prototype.format = function () {
    return this.valueOf()
        .toString()
        .replace(/\d(?=(\d{3})+$)/g, "$&,");
};

/**문자열의 문자를 초성으로 변환해 반환합니다.
 * - 초성이 없는 문자는 그대로 반환됩니다.
 */
String.prototype.toChoseong = function () {
    var result = "";

    for (let i = 0; i < this.length; i++) {
        let char = this.charAt(i);
        if (char.match(/[가-힣]/)) {
            result +=
                CHOSEONG[
                    Math.floor(
                        (char.charCodeAt() - "가".charCodeAt()) /
                            ("깋".charCodeAt() - "가".charCodeAt() + 1)
                    )
                ];
        } else {
            result += char;
        }
    }

    return result;
};

/**문자열의 검색 결과를 나타냅니다.
 * - 기준 문자열
 * - 검색어
 * - 기분 문자열의 일치하는 부분
 * - 일치하는 부분의 시작점
 * - 일치하는 부분의 끝점
 */
class StringSearchData {
    string = "";
    keyword = "";
    match = "";
    startIndex = -1;
    endIndex = -1;
}
/**두 문자열이 포괄적인 범위에서 일치하는지 확인합니다.
 *
 * @param {String} match
 * @returns {Boolean}
 */
String.prototype.compareInaccurate = function (match) {
    var string = this.valueOf().toUpperCase().replace(/ /g, "");
    match = match.toUpperCase().replace(/ /g, "");

    if (string.length != match.length) return false;

    var isMatch = true;
    for (let i = 0; i < string.length; i++) {
        var target = string.charAt(i),
            key = match.charAt(i);
        if (key.match(/[ㄱ-ㅎ]/)) target = target.toChoseong();
        if (target != key) {
            isMatch = false;
            break;
        }
    }
    return isMatch;
};
/**문자열을 포괄적인 범위에서 일치하는 부분을 전부 반환합니다.
 * 일치하는 부분이 없을 경우 빈 배열을 반환합니다.
 * - 대소문자를 신경쓰지 않습니다.
 * - 자음만 있는 경우 초성을 비교합니다.
 * - 검색어의 공백은 생략할 수 있습니다.
 * @param {String} searcher
 * @returns {Array<StringSearchData>}
 */
String.prototype.searchInaccurate = function (searcher) {
    if (!searcher.length) return [];

    var result = [];
    var string = this.valueOf();

    // 일치하는 시작점 찾기
    for (let i = 0; i < string.length - searcher.length + 1; i++) {
        if (!string.charAt(i).compareInaccurate(searcher.charAt(0))) continue;

        // 반환 데이터 생성
        var data = new StringSearchData();
        data.string = string;
        data.keyword = searcher;
        data.startIndex = i;
        data.endIndex = i + 1;

        // 각 글자 당 비교 시작
        var isMatch = true;
        for (let j = 1; j < searcher.length; j++) {
            var target = string.charAt(data.endIndex++);
            // 글자가 같을 경우
            if (target.compareInaccurate(searcher.charAt(j))) {
                if (j == searcher.length - 1) {
                    data.endIndex = data.endIndex;
                    break;
                }
                continue;
            }
            // 생략 가능한 공백일 경우
            else if (target == " ") {
                j--;
                continue;
            }

            // 같지 않을 경우
            isMatch = false;
            break;
        }
        data.match = string.slice(data.startIndex, data.endIndex);

        // 검색어와 일치하는 경우
        if (isMatch) result.push(data);
    }

    return result;
};

function updateList(keyword) {
    $("#productList .list")
        .children()
        .each((index, element) => {
            var name = $(element).find(".name"),
                brand = $(element).find(".brand");
            var nameSearchData = name.text().searchInaccurate(keyword),
                brandSearchData = brand.text().searchInaccurate(keyword);

            if (nameSearchData.length || brandSearchData.length) {
                element.style.display = "block";

                var endIndex = 0,
                    html = "";
                for (let i = 0; i < nameSearchData.length; i++) {
                    if (nameSearchData[i].startIndex < endIndex) continue;
                    html += `${name
                        .text()
                        .slice(
                            endIndex,
                            nameSearchData[i].startIndex
                        )}<span class="highlight">${
                        nameSearchData[i].match
                    }</span>`;
                    endIndex = nameSearchData[i].endIndex;
                }
                name.html(html + name.text().slice(endIndex));

                endIndex = 0;
                html = "";
                for (let i = 0; i < brandSearchData.length; i++) {
                    if (brandSearchData[i].startIndex < endIndex) continue;
                    html += `${brand
                        .text()
                        .slice(
                            endIndex,
                            brandSearchData[i].startIndex
                        )}<span class="highlight">${
                        brandSearchData[i].match
                    }</span>`;
                    endIndex = brandSearchData[i].endIndex;
                }
                brand.html(html + brand.text().slice(endIndex));
            } else if (!keyword.length) {
                name.html(name.text());
                brand.html(brand.text());
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        });
}

/**상품의 정보
 * - 식별 번호
 * - 사진 이름
 * - 브랜드
 * - 이름
 * - 가격
 */
class ProductData {
    id = 0;
    photo = "";
    brand = "";
    product_name = "";
    price = "";
    count_price = 0;
}
/**장바구니에 담긴 상품들의 목록
 * @type {Array<ProductData>}
 */
var basketList = [];

function updateTotalPrice() {
    var total = 0;
    for (let i = 0; i < basketList.length; i++) {
        total += basketList[i].count_price;
    }
    $("#basket .total-price .value").html(total.format());
}

$(document).ready(function () {
    // 상품 목록 불러오기
    $.getJSON(
        "/resources/json/store.json",
        /**상품 목록을 JSON으로부터 가져옵니다.
         * - 드래그와 드랍 설정
         *
         * @param {Array<ProductData>} data
         */
        function (data) {
            data.forEach((product) => {
                var item = $(`
                <div data-index="${product.id}" class="item">
                    <div
                        style="
                            background-image: url(/resources/image/product/${product.photo});
                        "
                        class="background-cover photo"
                    ></div>
                    <div class="details">
                        <span class="name">${product.product_name}</span>
                        <span class="brand">${product.brand}</span>
                        <span class="price">${product.price}</span>
                    </div>
                </div>
            `);
                $("#productList .list").append(item);
            });

            // 드래그 설정
            $("#productList .list .item").draggable({
                containment: "main", // <main> 안에서만 드래그 가능
                revert: true, // 커서를 놨을 때 제자리로 돌아감
                revertDuration: 250, // 제자리로 돌아가는데 걸리는 시간 (ms)
                zIndex: 128, // 드래그할 때 z-index 값
            });
            // 드랍 설정
            $("#dropArea").droppable({
                accept: "#productList .list .item", // 드랍 가능한 요소
                // 드랍 시 이벤트
                drop: function (event, ui) {
                    var product =
                        data[Number(ui.draggable.attr("data-index")) - 1];
                    product.count_price = Number(
                        product.price.replace(/,/g, "")
                    );

                    if (basketList.indexOf(product) > -1) {
                        alert("이미 장바구니에 담긴 상품입니다.");
                        return;
                    }
                    // 목록 항목 생성
                    var item = $(`
                        <div class="item">
                            <div class="info">
                                <div
                                    style="
                                        background-image: url(/resources/image/product/${product.photo});
                                    "
                                    class="background-cover photo"
                                ></div>
                                <div class="details">
                                    <span class="name"
                                        >${product.product_name}</span
                                    >
                                    <span class="brand">${product.brand}</span>
                                    <span class="price">${product.price}</span>
                                </div>
                            </div>
                            <div class="control">
                                <div class="label count">
                                    <span class="name">개수</span>
                                    <div class="value">
                                        <input
                                            type="number"
                                            value="1"
                                            min="1"
                                            name="count"
                                            class="product-count"
                                        />
                                        <button class="button remove"><i class="fa fa-close"></i></button>
                                    </div>
                                </div>
                                <div class="label count-price">
                                    <span class="name">가격</span>
                                    <span class="value">${product.price}</span>
                                </div>
                            </div>
                        </div>
                    `);
                    // 개수 변경
                    item.find(".product-count").change((e) => {
                        var count = e.target.value;
                        if (count < 1) {
                            count = e.target.value = 1;
                        }

                        product.count_price =
                            Number(product.price.replace(/,/g, "")) * count;
                        item.find(".count-price .value").html(
                            product.count_price.format()
                        );

                        updateTotalPrice();
                    });
                    // 항목 제거 버튼
                    item.find(".remove").click(() => {
                        basketList.splice(basketList.indexOf(product), 1);
                        item.remove();
                    });

                    basketList.push(product);
                    $("#basket .list").append(item);
                    updateTotalPrice();
                },
            });
        }
    );

    // 구매 버튼
    $("#basket .buy").click(() => {
        if (!basketList.length) {
            alert("구매할 상품을 골라주세요.");
            return;
        }

        $("#buyInfo").dialog({
            open: true,
            resizable: false,
            title: "구매 정보",
            position: { my: "center", at: "center", of: window },
            buttons: [
                {
                    text: "구매",
                    click: function () {
                        $(this).dialog("close");
                    },
                },
            ],
        });
    });
});
