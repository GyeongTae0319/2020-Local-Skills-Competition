<div class="container-xl">
<div class="row mt40">
    <div class="col-12">
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="검색어를 입력해주세요." aria-label="검색어를 입력해주세요." onkeyup="onSearch(this.value)">
    </div>
    </div>
</div>
<div class="row mt40">
    <div class="col-8">
    <h2 class="display-5 mb-5">모든 상품 리스트</h2>
    <div class="card-deck" id="product-list">
    </div>
    <div id="msg-empty">일치하는 상품이 없습니다.</div>
    </div>
    <div class="col-4">
    <h2 class="display-5 mb-5">장바구니</h2>
    <div id="basket">
        <div class="col-12">
        <div id="drop-area">이곳에 상품을 놓아주세요.</div>
        <div id="basket-list">
        </div>
        <div class="text-right mb-3">
            총 합계 <span id="total-sum">0</span>원
        </div>
        </div>
        <button type="button" class="btn btn-primary btn-lg btn-block" onclick="openBuyPopup()">구매하기</button>
    </div>
    </div>
</div>
</div>
<div id="popup-buy" title="구매자 정보">
    <form>
        <fieldset>
        <div class="row mb-2">
            <div class="col-3"><label for="name">이름</label></div>
            <div class="col-9"><input type="text" name="name" id="name" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-3"><label for="address">주소</label></div>
            <div class="col-9"><input type="text" name="address" id="address" class="form-control"></div>
        </div>
        </fieldset>
    </form>
</div>

<div id="popup-receipt">
<canvas id="receipt"></canvas>
</div>
<script src="resources/js/store.js"></script>