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
 * - 대소문자를 신경쓰지 않습니다.
 * - 자음만 있는 경우 초성을 비교합니다.
 * @param {String} searcher
 * @returns {Array<StringSearchData>}
 */
String.prototype.searchInaccurate = function (searcher) {
    var result = [];
    var string = this.valueOf();

    // 시작점 찾기
    for (let i = 0; i < string.length - searcher.length + 1; i++) {
        if (!string.charAt(i).compareInaccurate(searcher.charAt(0))) continue;

        var data = new StringSearchData();
        data.startIndex = i;
        var searchIndex = 1,
            matchKeyword = true;
        for (let j = 1; j < searcher.length; j++) {
            let char = string.charAt(i + j);
            if (
                char == " " ||
                char.compareInaccurate(searcher.charAt(searchIndex++))
            ) {
                if (j == searcher.length - 1) data.endIndex = i + j + 1;
                continue;
            }

            matchKeyword = false;
            break;
        }
        if (matchKeyword) result.push(data);
    }

    return result;
};
