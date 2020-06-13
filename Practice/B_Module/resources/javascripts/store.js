// function stringToCho(str) {
// 	cho = [
// 		"ㄱ",
// 		"ㄲ",
// 		"ㄴ",
// 		"ㄷ",
// 		"ㄸ",
// 		"ㄹ",
// 		"ㅁ",
// 		"ㅂ",
// 		"ㅃ",
// 		"ㅅ",
// 		"ㅆ",
// 		"ㅇ",
// 		"ㅈ",
// 		"ㅉ",
// 		"ㅊ",
// 		"ㅋ",
// 		"ㅌ",
// 		"ㅍ",
// 		"ㅎ",
// 	];
// 	result = "";
// 	for (i = 0; i < str.length; i++) {
// 		code = str.charCodeAt(i) - "가".charCodeAt();
// 		if (code >= 0 && code <= "힣".charCodeAt() - "가".charCodeAt()) {
// 			result +=
// 				cho[
// 					Math.floor(
// 						code / ("깋".charCodeAt() - "가".charCodeAt() + 1)
// 					)
// 				];
// 		} else {
// 			result += str.charAt(i);
// 		}
// 	}
// 	return result;
// }

// function wordHighlight(target, start, end) {
// 	var search = $(target).text().slice(start, end);
// 	$(target).html(
// 		$(target)
// 			.text()
// 			.replace(search, `<span class="highlight">${search}</span>`)
// 	);

// 	return true;
// }

// function searchUpdate(value) {
// 	var items = document.querySelectorAll("#product .list .item");

// 	var is_blank = true;
// 	items.forEach((item) => {
// 		var name = item.querySelector(".name");
// 		var name_cho = item.querySelector(".name-cho");
// 		var brand = item.querySelector(".brand");
// 		var brand_cho = item.querySelector(".brand-cho");

// 		var indexs = {
// 			name: $(name).text().toUpperCase().indexOf(value.toUpperCase()),
// 			name_cho: $(name_cho)
// 				.text()
// 				.toUpperCase()
// 				.indexOf(value.toUpperCase()),
// 			brand: $(brand).text().toUpperCase().indexOf(value.toUpperCase()),
// 			brand_cho: $(brand_cho)
// 				.text()
// 				.toUpperCase()
// 				.indexOf(value.toUpperCase()),
// 		};
// 		var visible = false;
// 		if (indexs.name > -1) {
// 			visible = true;
// 			wordHighlight(name, indexs.name, indexs.name + value.length);
// 		}
// 		if (indexs.name_cho > -1) {
// 			visible = true;
// 			wordHighlight(
// 				name,
// 				indexs.name_cho,
// 				indexs.name_cho + value.length
// 			);
// 		}
// 		if (indexs.brand > -1) {
// 			visible = true;
// 			wordHighlight(brand, indexs.brand, indexs.brand + value.length);
// 		}
// 		if (indexs.brand_cho > -1) {
// 			visible = true;
// 			wordHighlight(
// 				brand,
// 				indexs.brand_cho,
// 				indexs.brand_cho + value.length
// 			);
// 		}

// 		if (visible) {
// 			item.style.display = "flex";
// 			is_blank = false;
// 		} else {
// 			item.style.display = "none";
// 		}
// 	});

// 	$("#product .is-blank").css("display", is_blank ? "flex" : "none");
// }

// /**스토어 페이지 초기화
//  * 상품 목록 생성
//  *   > JSON 불러오기
//  *   > 목록 동적 생성
//  */
// $(function () {
// 	// 상품 목록 생성
// 	$.getJSON("./resources/data/store.json", function (json) {
// 		for (let i = 0; i < json.length; i++) {
// 			$("#product .list").append(`<div class="item">
// 				<div
// 					style="
// 						background-image: url(./resources/images/product/${json[i].photo});
// 					"
// 					class="image"
// 				></div>
// 				<div class="details">
// 					<span class="name"
// 						>${json[i].product_name}</span
// 					>
// 					<span class="name-cho"
// 						>${stringToCho(json[i].product_name)}</span
// 					>
// 					<span class="brand">${json[i].brand}</span>
// 					<span class="brand-cho"
// 						>${stringToCho(json[i].brand)}</span
// 					>
// 					<span class="price">${json[i].price}</span>
// 				</div>
// 			</div>`);
// 		}
// 	});
// });

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
function stringToCho(string) {
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

/**문자열과 검색어가 포괄적으로 일치하는 부분을 반환합니다.
 * - 대소문자가 구분되지 않습니다.
 * - 검색어에는 공백이 필수가 아닙니다.
 * - - 단, 검색어에 공백이 있는 경우 일치해야합니다.
 * - 초성 검색이 가능합니다.
 *
 * @param {String} string
 * @param {String} keyword
 *
 * @returns {Array<String> | Number}
 */
function searchString(string, keyword) {
    var index = -1;

    for (let i = 0; i < keyword.length; i++) {
        var char = keyword.charAt(i);

        if (index === -1) {
            
        }
    }
}
function searchitemsByKeyword(keyword) {
    $("#productList .contents .list")
        .children()
        .each((index, item) => {
            var name = item.querySelector(".name").innerHTML;
            var brand = item.querySelector(".brand").innerHTML;
        });
}

function search(keyword, str, startIndex) {
    var data = str.substr(startIndex); // 검색 기준 문자를 startIndex를 기준으로 자름
    var keywordLength = keyword.length; // 검색어 글자 수
    var dataLength = data.length; // 자른 문자의 글자 수
    var dataCho = ""; // 검색 키워드의 초성
    var count = 0; // 검색어의 첫글자가 검색 기준 문자 안에 몇 개 있는지 저장하는 함수
    var start = -1; // 최초로 탐색된 인덱스
    var index = -1; // 탐색 정보를 저장할 인덱스

    // 초성 데이터 불러오기
    for (var i = 0; i < dataLength; i += 1) {
        dataCho += cho(data.substr(i, 1));
    }

    // 글자 검색 알고리즘 시작
    for (var i = 0; i < keywordLength; i += 1) {
        var char = keyword.substr(i, 1); // 한글자씩 떼서 검색
        var regex = new RegExp(char, "g"); // 검색 기준 문자 안에 현재 탐색중인 키워드가 몇개 있는지 알아내는 정규식
        var compare = data; // 비교 문자

        if (char.match(/[ㄱ-ㅎ]/)) compare = dataCho; // 검색어가 초성이라면 비교 문자도 초성으로 변환

        if (index === -1) {
            // 최초 탐색 시
            if (compare.indexOf(char) > -1) {
                // 현재 찾는 문자가 존재한다면
                count = (compare.match(char) || []).length; // 갯수 반영
                start = index = compare.indexOf(char); // 인덱스와 시작 인덱스 수정
            } else {
                break; // 없으면 반복문 종료
            }
        } else {
            var compareChar = compare.substr(index + 1, 1); // 최초로 찾은 인덱스의 다음 글자를 추출
            if (char === compareChar) {
                // 현재 찾는 글자와 다음 글자가 일치한다면
                index += 1; // 인덱스 증가
            } else {
                start = count > 0 ? search(keyword, data, index + 1) : -1; // 글자가 일치하지 않는 상태인데 이후에 탐색할 글자가 여러개 더 있는 상태라면 재귀함수 실행
                break;
            }
        }
    }

    return start + (startIndex || 0);
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
