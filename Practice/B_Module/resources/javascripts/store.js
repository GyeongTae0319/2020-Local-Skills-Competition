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


