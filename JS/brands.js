let images = document.querySelectorAll(".card-image img");
let h2 = document.querySelectorAll(".details-unhidden h2");
let prices = document.querySelectorAll(".details-unhidden span");
let removeProducts = document.querySelectorAll(".product-cancel");
console.log(removeProducts);
let addCarts = document.querySelectorAll(".addcart h3");
let cartButton = document.querySelector(".sidebar-cart");
let backButton = document.querySelector(".back");
// const endpoint = "http://localhost:3456/addedToCart";
const endpoint = "https://6210bfd64cd3049e1783e6c5.mockapi.io/api/cart";

// async function getAPI() {
//     const response = await fetch(endpoint);
//     const data = await response.json();
//     console.log(data);
// }

// getAPI();
async function addProduct({ srcImg, h2Text, priceText }) {
    await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
            srcImg,
            h2Text,
            priceText
        }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
}

async function getProducts() {
    const response = await fetch(endpoint);
    const data = await response.json();
    // Cho cái list chứa khoá học rỗng trước
    document.querySelector(".cart-product").innerHTML = "";
    if (data.length > 0 && Array.isArray(data) && data.length < 4) {
        for (let item of data) {
            let template = `
                        <div class="product">
                            <div class="product-image"><img src="${item.srcImg}" alt=""></div>
                            <div class="product-details">
                                <h2>${item.h2Text}</h2>
                                <span>${item.priceText}</span>
                            </div>
                            <div class="icon-wrapper"><ion-icon name="close-circle" class="product-cancel" data-id="${item.id}"></ion-icon></div>
                    </div>`;
            document.querySelector(".cart-product").insertAdjacentHTML("beforeend", template);
        }
    }
}

async function deleteProduct(id) {
    await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
    });
}

addCarts.forEach((item) => item.addEventListener("click", async function(event) {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length > 2) {
        document.querySelector(".alert-fully").classList.add("show");
        setTimeout(function() {
            document.querySelector(".alert-fully").classList.remove("show");
        }, 1000);
        document.querySelector(".sidebar-cart .count").textContent = 3;
    } else {
        document.querySelector(".alert").classList.add("show");
        setTimeout(function() {
            document.querySelector(".alert").classList.remove("show");
        }, 1000);
        images.forEach((item) => {
            if (item.dataset.num == event.target.dataset.num) { srcImg = item.getAttribute("src"); }
        })
        h2.forEach((item) => {
            if (item.dataset.num == event.target.dataset.num) { h2Text = item.textContent; }
        })
        prices.forEach((item) => {
            if (item.dataset.num == event.target.dataset.num) { priceText = item.textContent; }
        })

        const product = { srcImg, h2Text, priceText }
        await addProduct(product);
        document.querySelector(".sidebar-cart .count").textContent = data.length + 1;
    }
}))

cartButton.addEventListener("click", async function(event) {
    await getProducts();
    document.querySelector(".wrapper").classList.toggle("show");

})
backButton.addEventListener("click", function(event) {
    document.querySelector(".wrapper").classList.toggle("show");
})

document.addEventListener("click", async function(event) {
    if (event.target.matches(".product-cancel")) {
        const id = +event.target.dataset.id;
        await deleteProduct(id);
        await getProducts();
        const response = await fetch(endpoint);
        const data = await response.json();
        document.querySelector(".sidebar-cart .count").textContent = data.length;
    }
})