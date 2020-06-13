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
                charIndex = 0;
            for (let i = 0; i < result.length; i++) {
                html += $(element)
                    .text()
                    .substring(charIndex, result[i].startIndex);
                charIndex = result[i].startIndex + result[i].matchString.length;
                html += `<span class="highlight">${result[i].matchString}</span>`;

                if (i === result.length - 1) {
                    html += $(element).text().substring(result[i].endIndex);
                }
            }
            $(element).html(html);

            return true;
        } else {
            $(element).html($(element).text());
            return false;
        }
    };

    $("#productList .contents .list")
        .children()
        .each((index, item) => {
            var name = item.querySelector(".name");
            var brand = item.querySelector(".brand");

            var highlight_name = highlight(name, keyword);
            var highlight_brand = highlight(brand, keyword);
            if (
                highlight_name ||
                highlight_brand ||
                !keyword
            ) {
                $(item).css("display", "flex");
            } else $(item).css("display", "none");
        });
}

function init() {
    $.getJSON("./resources/data/store.json", function (json) {
        for (let i = 0; i < json.length; i++) {
            $("#productList .contents > .list").append(
                `<div class="item">
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
            </div>`
            );
        }
    });
}
