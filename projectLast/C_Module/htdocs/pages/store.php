<article>
    <main>
        <section id="productList">
            <h2 class="title">상품 목록</h2>
            <div class="search-field">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="검색어를 입력하세요." id="search">
            </div>
            <div class="grid-auto list"></div>
            <div class="no-item">일치하는 상품이 없습니다.</div>
        </section>
        <section id="basket">
            <h2 class="title">장바구니</h2>
            <div class="contents">
                <div id="dropArea"></div>
                <div class="list"></div>
                <div class="control">
                    <div class="label-title" id="total">
                        <span class="title">전체</span>
                        <span class="value price">0</span>
                    </div>
                    <button class="button" id="buy">구매</button>
                </div>
            </div>
        </section>
    </main>
</article>

<div style="display: none;" class="dialog" id="buyInfo">
    <lable class="text-input">
        <span class="title">이름</span>
        <input type="text" id="buyName">
    </lable>
    <lable class="text-input">
        <span class="title">주소</span>
        <input type="text" id="buyAddress">
    </lable>
    <button class="button submit">구매</button>
</div>

<div style="display: none;" class="dialog" id="buyResult">
    <canvas id="buyImg"></canvas>
</div>