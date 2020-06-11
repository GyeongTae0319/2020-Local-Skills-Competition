function stringToCho(str) {
    cho = [
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
    result = "";
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i) - "가".charCodeAt();
        if (code >= 0 && code <= "힣".charCodeAt() - "가".charCodeAt()) {
            result +=
                cho[
                    Math.floor(
                        code / ("깋".charCodeAt() - "가".charCodeAt() + 1)
                    )
                ];
        } else {
            result += str.charAt(i);
        }
    }
    return result;
}

function wordHighlight(target, start, end) {
    var search = $(target).text().slice(start, end);
    $(target).html(
        $(target)
            .text()
            .replace(search, `<span class="highlight">${search}</span>`)
    );

    return true;
}

function searchUpdate(value) {
    var items = document.querySelectorAll("#product .list .item");

    var is_blank = true;
    items.forEach((item) => {
        var name = item.querySelector(".name");
        var name_cho = item.querySelector(".name-cho");
        var brand = item.querySelector(".brand");
        var brand_cho = item.querySelector(".brand-cho");

        var indexs = {
            name: $(name).text().toUpperCase().indexOf(value.toUpperCase()),
            name_cho: $(name_cho)
                .text()
                .toUpperCase()
                .indexOf(value.toUpperCase()),
            brand: $(brand).text().toUpperCase().indexOf(value.toUpperCase()),
            brand_cho: $(brand_cho)
                .text()
                .toUpperCase()
                .indexOf(value.toUpperCase()),
        };
        var visible = false;
        if (indexs.name > -1) {
            visible = true;
            wordHighlight(name, indexs.name, indexs.name + value.length);
        }
        if (indexs.name_cho > -1) {
            visible = true;
            wordHighlight(
                name,
                indexs.name_cho,
                indexs.name_cho + value.length
            );
        }
        if (indexs.brand > -1) {
            visible = true;
            wordHighlight(brand, indexs.brand, indexs.brand + value.length);
        }
        if (indexs.brand_cho > -1) {
            visible = true;
            wordHighlight(
                brand,
                indexs.brand_cho,
                indexs.brand_cho + value.length
            );
        }

        if (visible) {
            item.style.display = "flex";
            is_blank = false;
        } else {
            item.style.display = "none";
        }
    });

    $("#product .is-blank").css("display", is_blank ? "flex" : "none");
}

/**스토어 페이지 초기화
 * 상품 목록 생성
 *   > JSON 불러오기
 *   > 목록 동적 생성
 */
$(function () {
    // 상품 목록 생성
    $.getJSON("./resources/data/store.json", function (json) {
        for (let i = 0; i < json.length; i++) {
            // 아이템 박스 //
            var item = document.createElement("div");
            item.classList.add("item");

            // 상품 이미지
            var image = document.createElement("div");
            image.style.backgroundImage = `url(./resources/images/product/${json[i].photo})`;
            image.classList.add("image");
            item.appendChild(image);

            // 상품 상세 내용
            var details = document.createElement("div");
            details.classList.add("details");
            item.appendChild(details);
            // 이름
            var name = document.createElement("span");
            name.innerText = json[i].product_name;
            name.classList.add("name");
            details.appendChild(name);
            var name_cho = document.createElement("span"); // 초성 검색용
            name_cho.innerText = stringToCho(json[i].product_name);
            name_cho.classList.add("name-cho");
            details.appendChild(name_cho);
            // 브랜드
            var brand = document.createElement("span");
            brand.innerText = json[i].brand;
            brand.classList.add("brand");
            details.appendChild(brand);
            var brand_cho = document.createElement("span"); // 초성 검색용
            brand_cho.innerText = stringToCho(json[i].brand);
            brand_cho.classList.add("brand-cho");
            details.appendChild(brand_cho);
            // 가격
            var price = document.createElement("span");
            price.innerText = json[i].price;
            price.classList.add("price");
            details.appendChild(price);

            // 아이템 추가
            $("#product .list").append(item);
        }
    });
});
