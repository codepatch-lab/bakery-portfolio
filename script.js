const breads = [
    {
        id: "croissant",
        name: "発酵バタークロワッサン",
        description: "外はさっくり、中はふんわり。",
        price: 280,
        image: "images/croissant.png"
    },
    {
        id: "baguette",
        name: "朝焼きバゲット",
        description: "小麦の香りを楽しむシンプルな一本。",
        price: 320,
        image: "images/baguette.png"
    },
    {
        id: "shokupan",
        name: "こむぎ日和の食パン",
        description: "毎朝食べたくなる、やさしい甘み。",
        price: 420,
        image: "images/shokupan.png"
    },
    {
        id: "melonpan",
        name: "さくさくメロンパン",
        description: "外はさくさく、中はふんわり。",
        price: 220,
        image: "images/melonpan.png"
    },
    {
        id: "anpan",
        name: "ふっくらあんぱん",
        description: "やさしい甘さのあんこがたっぷり。",
        price: 200,
        image: "images/anpan.png"
    },
    {
        id: "shiopan",
        name: "塩バターロール",
        description: "バターの香りとほどよい塩味。",
        price: 180,
        image: "images/shiopan.png"
    }
];

const breadListElement = document.querySelector(".bread-list");

// パンの表示
breads.forEach(function (bread) {
    const article = document.createElement("article");
    article.className = "bread-card";

    article.innerHTML = `
        <img class="bread-image" src="${bread.image}" alt="${bread.name}">
        <h3>${bread.name}</h3>
        <p>${bread.description}</p>
        <span>${bread.price.toLocaleString("ja-JP")}円</span>
        <button type="button" class="favorite-btn"
            data-bread="${bread.id}" aria-pressed="false">
            ＋ 買いたいリストに追加
        </button>
    `;

    breadListElement.appendChild(article);
});


const favoriteBtns = document.querySelectorAll(".favorite-btn");

// 買いたいリストボタン処理
favoriteBtns.forEach(function (btn) {

    // 保存済みのお気に入りを読み込む
    const savedFavorite = localStorage.getItem(btn.dataset.bread);

    if (savedFavorite === "true") {
        btn.textContent = "✓ リストに追加済み";
        btn.setAttribute("aria-pressed", "true");
    }

    // クリックされたときの処理
    btn.addEventListener("click", function () {
        const isFavorite = btn.getAttribute("aria-pressed") === "true";

        if (isFavorite) {
            btn.textContent = "＋ 買いたいリストに追加";
            btn.setAttribute("aria-pressed", "false");
            localStorage.removeItem(btn.dataset.bread);
        } else {
            btn.textContent = "✓ リストに追加済み";
            btn.setAttribute("aria-pressed", "true");
            localStorage.setItem(btn.dataset.bread, "true");
        }

        updateShoppingList();

    });
});


// 買い物リストの表示処理
const selectedBreads = document.querySelector("#selected-breads");

function findBread(breadId) {
    return breads.find(function (bread) {
        return bread.id === breadId;
    });
}

function updateShoppingList() {
    selectedBreads.innerHTML = "";

    let total = 0;

    favoriteBtns.forEach(function (btn) {
        if (btn.getAttribute("aria-pressed") === "true") {
            const breadId = btn.dataset.bread;

            // IDからパンの商品データを取得
            const bread = findBread(breadId);

            const li = document.createElement("li");
            // li.textContent = `${bread.name}　${bread.price.toLocaleString("ja-JP")}円`;
            li.innerHTML = `
                <span>${bread.name}</span>
                <span>${bread.price.toLocaleString("ja-JP")}円</span>
                <button type="button" class="remove-btn"aria-label="${bread.name}をリストから削除">
                    ×
                </button>
            `;

            selectedBreads.appendChild(li);

            // 削除ボタンを取得
            const removeBtn = li.querySelector(".remove-btn");

            // 削除ボタンがクリックされたとき
            removeBtn.addEventListener("click", function () {

                // 商品カードのボタンを元に戻す
                btn.textContent = "＋ 買いたいリストに追加";
                btn.setAttribute("aria-pressed", "false");

                // 保存していたデータを削除
                localStorage.removeItem(breadId);

                // 買いたいリストを再表示
                updateShoppingList();
            });

            total += bread.price;
        }
    });

    document.querySelector("#total-price").textContent =
        "合計：" + total.toLocaleString("ja-JP") + "円";
}

updateShoppingList();

const clearListBtn = document.querySelector("#clear-list");

clearListBtn.addEventListener("click", function () {
    favoriteBtns.forEach(function (btn) {
        btn.textContent = "＋ 買いたいリストに追加";
        btn.setAttribute("aria-pressed", "false");

        localStorage.removeItem(btn.dataset.bread);
    });

    updateShoppingList();
});


// パンスライドの処理
const breadList = document.querySelector(".bread-slider .bread-list");
const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");

nextBtn.addEventListener("click", function () {
    const card = breadList.querySelector(".bread-card");
    const gap = parseFloat(getComputedStyle(breadList).gap) || 0;

    breadList.scrollBy({
        left: card.getBoundingClientRect().width + gap,
        behavior: "smooth"
    });
});

prevBtn.addEventListener("click", function () {
    const card = breadList.querySelector(".bread-card");
    const gap = parseFloat(getComputedStyle(breadList).gap) || 0;

    breadList.scrollBy({
        left: -(card.getBoundingClientRect().width + gap),
        behavior: "smooth"
    });
});


function updateSliderButtons() {
    const maxScroll = breadList.scrollWidth - breadList.clientWidth;

    prevBtn.disabled = breadList.scrollLeft <= 1;
    nextBtn.disabled = breadList.scrollLeft >= maxScroll - 1;
}

breadList.addEventListener("scroll", updateSliderButtons);

window.addEventListener("resize", updateSliderButtons);

updateSliderButtons();