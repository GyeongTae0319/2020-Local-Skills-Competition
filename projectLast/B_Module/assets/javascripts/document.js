// 문서 공통 스크립트
// String 함수 및 Number 함수

const CHOSEONG = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
]

/**숫자를 자리수에 맞춰 ,으로 구분
 * 
 * @returns {String}
 */
Number.prototype.format = function() {
    let result = this.valueOf().toString().replace(/(?=(\d{3})+$)/g, ",");
    if (result.startsWith(",")) return result.slice(1);
    return result;
}

/**숫자로 변환이 가능한 경우 숫자로 변환
 * 
 * @returns {Number}
 */
String.prototype.toNumber = function() {
    return Number(this.valueOf().replace(/,/g, ""));
}

/**문자열을 초성으로 변환
 * - 변환할 수 없는 문자는 그대로 반환
 * 
 * @returns {String}
 */
String.prototype.toChoseong = function() {
    var string = this.valueOf(), result = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i].match(/[가-힣]/)) {
            let index = Math.floor((string[i].charCodeAt() - "가".charCodeAt()) / ("깋".charCodeAt() - "가".charCodeAt() + 1));
            result += CHOSEONG[index];
        } else result += string[i];
    }
    return result;
}
