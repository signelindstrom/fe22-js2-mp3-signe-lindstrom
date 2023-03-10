import mathSum from "../node_modules/math-sum/index.js";

const baseUrl =
    "https://js2-mp3-store-default-rtdb.europe-west1.firebasedatabase.app/";

const divContainer = document.querySelector("#cart-container");
const h1 = document.querySelector("#cart-message");

// click clear cart btn => clear localStorage
document.querySelector('#clear-btn').addEventListener('click', () => {
    localStorage.clear();
    divContainer.innerHTML = 'Cart is empty'
});

// go back to store btn
document.querySelector("#back-btn").addEventListener("click", () => {
    location.assign("../index.html");
});


// prices for products
const arrPrices = [];
let applePrice;
let pearPrice;
let bananaPrice;
let orangePrice;
let mangoPrice;

// get data from firebase
async function getData() {
    const url = baseUrl + "products.json";

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

getData().then(displayAll);

// set prices for products
function displayAll(data) {
    for (let i = 0; i < data.length; i++) {
        const { price } = data[i];

        if (i == 0) {
            applePrice = price;
        } else if (i == 1) {
            pearPrice = price;
        } else if (i == 2) {
            bananaPrice = price;
        } else if (i == 3) {
            orangePrice = price;
        } else if (i == 4) {
            mangoPrice = price;
        }
        arrPrices.push(price);
    }

    const arrSum = [];
    const div = document.createElement("div");

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        let sum;

        // only if you have an item in cart it will be shown
        if (value != 0 && key != 'itemsInCart') {
            const productName = document.createElement("h2");
            productName.innerText = key.charAt(0).toUpperCase() + key.slice(1);

            const productAmount = document.createElement("h3");
            productAmount.innerText = `Number of items: ${value}`;

            const productPrice = document.createElement("p");
            const productSum = document.createElement("p");

            div.append(productName, productAmount, productPrice, productSum);
            divContainer.append(div);

            // show item name, amount, price and total price
            if (key == "apples") {
                productPrice.innerText = `Price per item: ${applePrice}:-`;
                sum = applePrice * value;
                productSum.innerText =
                    `Price for all ${key}: ${sum}:-`;


            } else if (key == "pears") {
                productPrice.innerText = `Price per item: ${pearPrice}:-`;
                sum = pearPrice * value;
                productSum.innerText =
                    `Price for all ${key}: ${sum}:-`;


            } else if (key == "bananas") {
                productPrice.innerText = `Price per item: ${bananaPrice}:-`;
                sum = bananaPrice * value;
                productSum.innerText =
                    `Price for all ${key}: ${sum}:-`;

            } else if (key == "oranges") {
                productPrice.innerText = `Price per item: ${orangePrice}:-`;
                sum = orangePrice * value;
                productSum.innerText =
                    `Price for all ${key}: ${sum}:-`;

            } else if (key == "mangos") {
                productPrice.innerText = `Price per item: ${mangoPrice}:-`;
                sum = mangoPrice * value;
                productSum.innerText =
                    `Price for all ${key}: ${sum}:-`;

            }

            // pushes total sum for each product to array
            arrSum.push(sum);
        }
    }

    // imported function mathSum returns total sum of array
    let total = mathSum(arrSum);
    const totalText = document.createElement('h3');
    totalText.innerText = `Your total: ${total}kr`;
    if (total != 0) {
        div.append(totalText);
    }

    // if items in cart is more than 0 => show products in cart + adds "buy"-btn
    if (localStorage.getItem("itemsInCart") > 0) {
        h1.innerText = 'Your products';
        const buyBtn = document.createElement("button");
        divContainer.append(buyBtn);
        buyBtn.innerText = 'BUY';
        buyBtn.classList.add('button-17')
        purchaseComplete(buyBtn);
    }
}

if (localStorage.getItem("itemsInCart") == 0) {
    divContainer.innerHTML = 'Cart is empty'
}

// when user clicks "buy"-btn
function purchaseComplete(btn) {
    btn.addEventListener('click', () => {
        // gets values of localStorage and puts in array
        const applesBought = localStorage.getItem('apples');
        const pearsBought = localStorage.getItem('pears');
        const bananasBought = localStorage.getItem('bananas');
        const orangesBought = localStorage.getItem('oranges');
        const mangosBought = localStorage.getItem('mangos');

        const amountArray = [Number(applesBought), Number(pearsBought), Number(bananasBought), Number(orangesBought), Number(mangosBought)];


        const url = baseUrl + `products.json`
        fetch(url)
            .then(response => response.json())
            .then(getCurrentAmount);

        // creates array to push in amount from firebase
        let currentAmountArray = [];
        function getCurrentAmount(data) {
            for (let i = 0; i < data.length; i++) {
                currentAmountArray.push(Number(data[i].amount));
            }

            // substracts the bought amount from amount-value in firebase
            for (let j = 0; j < amountArray.length; j++) {
                const newAmount = {
                    amount: Number(currentAmountArray[j] - amountArray[j])
                }


                // patch new amount to firebase
                replaceAmount(newAmount);
                async function replaceAmount(obj) {
                    const amountUrl = baseUrl + `products/${j}.json`;

                    const init = {
                        method: 'PATCH',
                        body: JSON.stringify(obj),
                        headers: {
                            'Content-type': "application/json; charset=UTF-8"
                        }
                    }

                    const response = await fetch(amountUrl, init);
                    const data = await response.json();
                }
            }
        }

        // when "purchase" has been made => clears localStorage + "successful"-message shows up
        localStorage.clear()
        setTimeout(() => {
            divContainer.innerHTML = ''
            const confirmedPurchase = document.createElement('h1');
            divContainer.append(confirmedPurchase);
            confirmedPurchase.innerText = 'Your purchase was successful! Enjoy your fruit!';
        }, 1000);

    })
}