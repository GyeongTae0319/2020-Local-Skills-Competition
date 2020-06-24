// 모든 문서 공통 스크립트

const CHOSEONG = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

/**
 * @return {Number}
 * */
String.prototype.toNumber = function () {
    return Number(this.valueOf().replace(/,/g, ""));
}

/**
 * @return {String}
 * */
String.prototype.toChoseong = function() {
    let result = "";
    let str = this.valueOf();
    for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[가-힣]/)) {
            result += CHOSEONG[Math.floor((str[i].charCodeAt() - "가".charCodeAt()) / ("깋".charCodeAt() - "가".charCodeAt() + 1))];
        } else result += str[i];
    }
    return result;
}

/**
 * @param {String} char
 *
 * @return {Boolean}
 * */
String.prototype.matchKeyChar = function (char) {
    let str = this.valueOf().toUpperCase();
    char = char.toUpperCase();
    if (char.match(/[ㄱ-ㅎ]/)) str = str.toChoseong();
    return str === char;
}

class SearchData {
    str = "";
    key = "";
    match = "";
    start = 0;
    end = 1;
}
/**
 * @param {String} keyword
 * @return {SearchData}
 * */
String.prototype.searchKeyword = function(keyword) {
    if (!keyword.length) return null;

    let str = this.valueOf();
    let success = false;
    for (let i = 0; i < str.length - keyword.length + 1; i++) {
        if (!str[i].matchKeyChar(keyword[0])) continue;

        let data = new SearchData();
        data.str = str;
        data.key = keyword;
        data.match = str[i];
        data.start = i;
        data.end = i + 1;

        if (keyword.length === 1) return data;
        for (let j = 1; j < keyword.length; j++) {
            if (str[data.end++].matchKeyChar(keyword[j])) {
                if (j === keyword.length - 1) {
                    data.match = str.slice(data.start, data.end);
                    success = true;
                }
            } else break;
        }

        if (success) return data;
    }
    return null;
}

/**
 * @return {String}
 * */
Number.prototype.format = function () {
    let result = this.valueOf().toString().replace(/(?=(\d{3})+$)/g, ",");
    if (result.startsWith(",")) result = result.slice(1);
    return result;
}

function documentLoad() {
    $("#register").click(e => {
        $("#dlRegister").dialog({
            title: "회원가입",
            position: { my: "center", at: "center", of: window },
            resizable: false,
            modal: true,
            open: () => {},
        });
    });

    $("#login").click(e => {
        $("#dlLogin").dialog({
            title: "로그인",
            position: { my: "center", at: "center", of: window },
            resizable: false,
            modal: true,
            open: () => {},
        });
    });
}
