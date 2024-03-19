const base_url = "https://api.exchangerate-api.com/v4/latest";

let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
});

for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } 
        if (select.name === "To" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newsrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {    
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const new_url = `${base_url}/${fromCurr.value}`;
    let response = await fetch(new_url);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    let finalRate = rate * amtVal;
    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalRate.toFixed(2)} ${toCurr.value}`;
};
