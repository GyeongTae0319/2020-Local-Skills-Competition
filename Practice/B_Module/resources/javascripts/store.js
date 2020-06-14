// 초성 모음 및 순서
const cho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅂ",
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

/**문자열을 각 문자의 초성으로 변환합니다.
 * - 한글 이외의 문자는 변환하지 않습니다.
 *
 * @param {String} string
 * @returns {String}
 */
function stringToChoseong(string) {
    var result = "";
    for (let i = 0; i < string.length; i++) {
        var char = string.charAt(i);
        if (char.match(/[가-힣]/)) {
            result +=
                cho[
                    Math.floor(
                        (char.charCodeAt() - "가".charCodeAt()) /
                            ("깋".charCodeAt() - "가".charCodeAt() + 1)
                    )
                ];
        } else {
            result += string.charAt(i);
        }
    }

    return result;
}

class SearchData {
    startIndex = -1;
    endIndex = -1;
    matchString = "";
}
/**문자열과 검색어가 포괄적으로 일치하는 부분을 반환합니다.
 * - 대소문자가 구분되지 않습니다.
 * - 초성 검색이 가능합니다.
 *
 * @param {String} string
 * @param {String} keyword
 *
 * @returns {Array<SearchData> | undefined}
 */
function searchString(string, keyword) {
    if (!string.length || !keyword.length) return undefined;
    if (keyword.length > string.length) return undefined;

    /**두 글자가 규칙에 의거해 일치하는지 확인합니다.
     *
     * @param {String} target
     * @param {String} keyword
     * @returns {Boolean}
     */
    var compareChar = function (target, keyword) {
        target = target.toUpperCase();
        keyword = keyword.toUpperCase();
        if (keyword.match(/[ㄱ-ㅎ]/)) target = stringToChoseong(target);

        if (target === keyword) return true;
        else return false;
    };

    // 검색 시작 문자 찾기
    /**변수 자료형
     * @type {Array<SearchData>}
     */
    var detect = [];
    for (let i = 0; i <= string.length - keyword.length; i++) {
        if (compareChar(string.charAt(i), keyword.charAt(0))) {
            detect.push({
                startIndex: i,
                endIndex: i + 1,
                matchString: string.charAt(i),
            });
        }
    }

    // 검색어 일치 검사
    /**변수 자료형
     * @type {Array<SearchData>}
     */
    var result = [];
    for (let i = 0; i < detect.length; i++) {
        var pass = true;
        for (let j = 1; j < keyword.length; j++) {
            var target = string.charAt(detect[i].endIndex++);
            var compare = keyword.charAt(j);
            if (compareChar(target, compare)) {
                detect[i].matchString += target;
            } else {
                pass = false;
                break;
            }
        }

        if (pass) result.push(detect[i]);
    }

    if (result.length) return result;
    return undefined;
}
/**상품 목록 중 검색 결과가 일치하는 품목만 표시합니다.
 *
 * @param {String} keyword
 */
function searchitemsByKeyword(keyword) {
    /**해당 요소에서 일치하는 문구를 강조합니다.
     * - 일치하는 문구가 있으면 True, 없으면 False를 반환합니다.
     *
     * @param {Element} element
     * @param {String} keyword
     *
     * @returns {Boolean}
     */
    var highlight = function (element, keyword) {
        var result = searchString($(element).text(), keyword);
        if (result) {
            var html = "",
                charIndex = 0,
                resultIndex = 0;
            for (; resultIndex < result.length; resultIndex++) {
                if (result[resultIndex].startIndex < charIndex) break;

                html += $(element)
                    .text()
                    .substring(charIndex, result[resultIndex].startIndex);
                charIndex =
                    result[resultIndex].startIndex +
                    result[resultIndex].matchString.length;
                html += `<span class="highlight">${result[resultIndex].matchString}</span>`;
            }
            html += $(element)
                .text()
                .substring(result[--resultIndex].endIndex);
            $(element).html(html);

            return true;
        } else {
            $(element).html($(element).text());
            return false;
        }
    };

    var hasResult = false;
    $("#productList .contents .list")
        .children()
        .each((index, item) => {
            var name = item.querySelector(".name");
            var brand = item.querySelector(".brand");

            var highlight_name = highlight(name, keyword);
            var highlight_brand = highlight(brand, keyword);
            if (highlight_name || highlight_brand || !keyword) {
                hasResult = true;
                $(item).css("display", "flex");
            } else {
                $(item).css("display", "none");
            }
        });
    if (!hasResult) $("#productList .list .no-result").css("display", "flex");
    else $("#productList .list .no-result").css("display", "none");
}

/**장바구니에 담긴 상품의 총 가격을 갱신합니다.
 * - 개수가 1보다 작은 상품의 개수는 자동으로 1로 바뀝니다.
 */
function calcTotalPrice() {
    var total = 0;

    basketList.forEach((item) => {
        item.count = $(item.countElement).val();
        if (item.count < 1) {
            $(item.countElement).val(1);
            item.count = 1;
        }
        item.totalPrice = item.price * item.count;
        total += item.totalPrice;
        $(item.totalElement).html(
            item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
    });

    $("#productList .basket .total .total-price").html(
        total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
}

/**현재 장바구니에 담긴 모든 물품을 결제합니다.
 *
 */
function buyList() {}

// 장바구니 목록
class BasketItemData {
    index = 0;
    price = 0;
    count = 1;
    countElement = new Element();
    totalPrice = 0;
    totalElement = new Element();
}
/**
 * @type {Array<BasketItemData>}
 */
var basketList = [];
var alertTimeout = 0;

function init() {
    // 상품 목록 불러오기 //
    $.getJSON("./resources/data/store.json", function (json) {
        for (let i = 0; i < json.length; i++) {
            $("#productList .contents > .list").append(
                $(`
                <div data-index="${i}" class="item">
                    <div
                        style="
                            background-image: url(./resources/images/product/${json[i].photo});
                        "
                        class="image"
                    ></div>
                    <div class="details">
                        <span class="name"
                            >${json[i].product_name}</span
                        >
                        <span class="brand">${json[i].brand}</span>
                        <span class="price">${json[i].price}</span>
                    </div>
                </div>
            `).draggable({
                    containment: "#productList .contents",
                    revert: true,
                    revertDuration: 250,
                    zIndex: 128,
                })
            );
        }
    });

    // 드롭 영역 //
    $("#productList .drop-area").droppable({
        accept: "#productList .list .item",
        drop: function (event, ui) {
            var item = $(ui.draggable),
                index = item.attr("data-index"),
                image = item.find(".image").css("background-image"),
                name = item.find(".name").text(),
                brand = item.find(".brand").text(),
                price = item.find(".price").text();

            if (
                basketList.some((value) => {
                    return value.index === index;
                })
            ) {
                $(event.target).addClass("overlap");
                clearTimeout(alertTimeout);
                alertTimeout = setTimeout(function () {
                    $(event.target).removeClass("overlap");
                }, 3000);
                return;
            }
            var buy_item = $(`
                <div class="buy-item">
                    <div class="info">
                        <div
                            style='background-image: ${image};'
                            class="image"
                        ></div>
                        <div class="details">
                            <span class="name">${name}</span>
                            <span class="brand">${brand}</span>
                            <span class="price">${price}</span>
                            <button class="btn remove"></button>
                        </div>
                    </div>
                    <div class="control">
                        <span class="count-name">수량</span>
                        <input
                            type="number"
                            min="1"
                            value="1"
                            name="count"
                            class="count"
                        />
                    </div>
                    <div class="item-total">
                        <span class="price-name">합계</span>
                        <span class="price"></span>
                    </div>
                </div>
            `);
            /**
             * @type {BasketItemData}
             */
            var buy_data = {
                index: index,
                count: 1,
                countElement: buy_item.find(".count"),
                price: Number(price.replace(/,/g, "")),
                totalElement: buy_item.find(".item-total .price"),
            };
            buy_data.totalPrice = buy_data.price * buy_data.count;
            buy_data.countElement.change(() => calcTotalPrice());
            buy_item.find(".remove").click(() => {
                basketList.splice(basketList.indexOf(buy_data), 1);
                buy_item.remove();
                calcTotalPrice();
            });

            basketList.push(buy_data);
            $("#productList .basket .buy-list").append(buy_item);

            calcTotalPrice();
        },
    });
}
