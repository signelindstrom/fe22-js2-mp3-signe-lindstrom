import anime from "../node_modules/animejs/lib/anime.es.js";

const baseUrl = "https://js2-mp3-store-default-rtdb.europe-west1.firebasedatabase.app/";


// empty array for amount from firebase
const amountArray = [];

// get data from firebase
async function getAll() {
    const url = baseUrl + "products.json";

    const response = await fetch(url);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const { name, price, amount, url } = data[i];

        document.querySelector(`#img-${i}`).src = url;
        document.querySelector(`#name-${i}`).innerText = name;
        document.querySelector(`#price-${i}`).innerText = `Price: ${price}kr`;
        document.querySelector(`#amount-${i}`).innerText = `Left in stock: ${amount}`;

        amountArray.push(amount);
    }
}

getAll();


// go to cart + cart animation
document.querySelector("#cartIcon").addEventListener("click", () => {
    setTimeout(() => {
        location.assign("../html/cart.html");
    }, 400)

    anime({
        targets: '#cartIcon',
        translateX: '680',
        duration: 400,
        easing: 'linear'
    })
});


// view localStorage
const appleStorage = localStorage.getItem("apples");
const pearStorage = localStorage.getItem("pears");
const bananaStorage = localStorage.getItem("bananas");
const orangeStorage = localStorage.getItem("oranges");
const mangoStorage = localStorage.getItem("mangos");

const ItemsInCart = localStorage.getItem("itemsInCart");


// if localStorage is null => make sure it's number
let appleCount = Number(appleStorage);
if (appleStorage == null) {
    appleCount = 0;
}

let pearCount = Number(pearStorage);
if (pearStorage == null) {
    pearCount = 0;
}

let bananaCount = Number(bananaStorage);
if (bananaStorage == null) {
    bananaCount = 0;
}

let orangeCount = Number(orangeStorage);
if (orangeStorage == null) {
    orangeCount = 0;
}

let mangoCount = Number(mangoStorage);
if (mangoStorage == null) {
    mangoCount = 0;
}

let totalItems = Number(ItemsInCart);
if (ItemsInCart == null) {
    totalItems = 0;
}


// set localStorage
localStorage.setItem("apples", appleCount);
localStorage.setItem("pears", pearCount);
localStorage.setItem("bananas", bananaCount);
localStorage.setItem("oranges", orangeCount);
localStorage.setItem("mangos", mangoCount);
localStorage.setItem("itemsInCart", totalItems);

const items = document.querySelector("#cartAmount");
items.innerText = `Items in your cart: ${localStorage.getItem("itemsInCart")}`;


// add products to cart + update counters/localStorage
document.querySelector("#btn-0").addEventListener("click", () => {

    if (amountArray[0] !== 0 && appleCount < amountArray[0]) {
        appleCount++;
        localStorage.setItem("apples", appleCount);
        totalItems++;
        localStorage.setItem("itemsInCart", totalItems);
        items.innerText = `Items in your cart: ${localStorage.getItem("itemsInCart")}`;
    } else {
        alert("Out of stock");
    }
});

document.querySelector("#btn-1").addEventListener("click", () => {
    if (amountArray[1] !== 0 && pearCount < amountArray[1]) {
        pearCount++;
        localStorage.setItem("pears", pearCount);
        totalItems++;
        localStorage.setItem("itemsInCart", totalItems);
        items.innerText = `Items in your cart: ${localStorage.getItem("itemsInCart")}`;
    } else {
        alert("Out of stock");
    }
});

document.querySelector("#btn-2").addEventListener("click", () => {
    if (amountArray[2] !== 0 && bananaCount < amountArray[2]) {
        bananaCount++;
        localStorage.setItem("bananas", bananaCount);
        totalItems++;
        localStorage.setItem("itemsInCart", totalItems);
        items.innerText = `Items in your cart: ${localStorage.getItem("itemsInCart")}`;
    } else {
        alert("Out of stock");
    }
});

document.querySelector("#btn-3").addEventListener("click", () => {

    if (amountArray[3] !== 0 && orangeCount < amountArray[3]) {
        orangeCount++;
        localStorage.setItem("oranges", orangeCount);
        totalItems++;
        localStorage.setItem("itemsInCart", totalItems);
        items.innerText = `Items in your cart: ${localStorage.getItem("itemsInCart")}`;
    } else {
        alert("Out of stock");
    }
});

document.querySelector("#btn-4").addEventListener("click", () => {

    if (amountArray[4] !== 0 && mangoCount < amountArray[4]) {
        mangoCount++;
        localStorage.setItem("mangos", mangoCount);
        totalItems++;
        localStorage.setItem("itemsInCart", totalItems);
        items.innerText = `Items in your cart: ${localStorage.getItem("itemsInCart")}`;
    } else {
        alert("Out of stock");
    }
});


// click clear cart btn => clear localStorage
document.querySelector("#clear-btn").addEventListener("click", () => {
    localStorage.clear();
    items.innerText = localStorage.getItem("itemsInCart");
    location.reload();
});