// const BASE_URL =  "https://currency-exchange.p.rapidapi.com/listquotes";
const BASE_URL =  "https://currency-converter13.p.rapidapi.com/convert?from=";
// https://currency-converter13.p.rapidapi.com/convert?from=USD&to=BRL&amount=1

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector(".ex-btn");

for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("click", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = document.querySelectorAll("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    const amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '2df09075a1msh3b4cac5554c0e28p1c028bjsnedcedf400e05',
        'x-rapidapi-host': 'currency-converter13.p.rapidapi.com',
      },
    };
    const URL = `${BASE_URL}${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}`;
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase}/${toCurr.value.toLowerCase}.json`;
    let response = await fetch(URL,options);
    let data = await response.json();
        let finalAmt = data.amount;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

    // let data = await response.json;
    // let rate = data[toCurr.value.toLowerCase()];
    // let finalAmt = amtVal * rate;
    // msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
  });
