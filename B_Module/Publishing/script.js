function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "./store/store.json", true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function getHangulCho(str) {
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
        code = str.charCodeAt(i) - 44032;
        if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
        else result += str.charAt(i);
    }
    return result;
}

var store;
loadJSON(function (response) {
    store = JSON.parse(response);

    store.products.forEach((item) => {
        item.cho = getHangulCho(item.name);
    });
});

function listSearch() {
    var input, filter, ul, li, i, txtValue, warning;
    input = document.getElementById("search");
    filter = getHangulCho(input.value.toUpperCase());
    ul = document.getElementById("products");
    li = ul.getElementsByTagName("li");
    warning = document.getElementById("searchWarning");


    var cnt = 0;
    for (i = 0; i < li.length; i++) {
        cho = li[i].getElementsByClassName("cho")[0];
        txtValue = cho.textContent || cho.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
            cnt++;
        }
    }
    console.log(cnt + "/" + ul.childElementCount);
    if (cnt == ul.childElementCount) {
        warning.style.display = "block"
    } else {
        warning.style.display = "none"
    }
}

window.onload = function () {
    this.store.products.forEach((item) => {
        var li = document.createElement("li");
        li.classList.add("item");
        li.style.backgroundColor = item.image;

        var name = document.createElement("span");
        name.classList.add("name");
        name.innerText = item.name;

        var brand = document.createElement("span");
        brand.classList.add("brand");
        brand.innerText = item.brand;

        var prize = document.createElement("span");
        prize.classList.add("prize");
        prize.innerText = item.prize;

        var cho = document.createElement("span");
        cho.classList.add("cho");
        cho.innerText = item.cho;

        li.appendChild(name);
        li.appendChild(brand);
        li.appendChild(prize);
        li.appendChild(cho);

        document.getElementById("products").appendChild(li);
    });
};
