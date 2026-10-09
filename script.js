
const favoriteBtns = document.querySelectorAll(".favorite-btn");

favoriteBtns.forEach(function (btn) {
    
    // 保存済みのお気に入りを読み込む
    const savedFavorite = localStorage.getItem(btn.dataset.bread);

    if (savedFavorite === "true") {
        btn.textContent = "♥ お気に入り済み";
        btn.setAttribute("aria-pressed", "true");
    }

    // クリックされたときの処理
    btn.addEventListener("click", function () {
        const isFavorite = btn.getAttribute("aria-pressed") === "true";

        if (isFavorite) {
            btn.textContent = "♡ お気に入り";
            btn.setAttribute("aria-pressed", "false");
            localStorage.removeItem(btn.dataset.bread);
        } else {
            btn.textContent = "♥ お気に入り済み";
            btn.setAttribute("aria-pressed", "true");
            localStorage.setItem(btn.dataset.bread, "true");
        }

    });
});
