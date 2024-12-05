const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
let input = document.querySelector("input");
const from_curr = document.querySelector(".from select");
const to_curr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let selects of dropdowns){
    for(curr_code in countryList){
        let new_option = document.createElement("option");

        new_option.innerText = curr_code;
        new_option.value = curr_code;

        if(selects.name === "from" && curr_code === "USD"){
            new_option.selected = "selected";
        }
        else if(selects.name === "to" && curr_code === "PKR"){
            new_option.selected = "selected";
        } 

        selects.append(new_option);
    }

    selects.addEventListener("change", (evt)=>{
        update_flag(evt.target);
    })
}

const update_flag = (element)=>{
    let curr_code = element.value;
    let country_code = countryList[curr_code];
    let new_src = `https://flagsapi.com/${country_code}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = new_src;
}

const get_exchange_rate =async ()=>{
    let input_val = input.value;

    if(input_val <1 || input_val === ""){
        input.value = "1";
        input_val = 1;
    }

    const URL = `${BASE_URL}/${from_curr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    const data = await response.json();
    let rate = data[from_curr.value.toLowerCase()][to_curr.value.toLowerCase()];


    let final_amount = rate * input_val; 
    msg.innerText = `${input_val} ${from_curr.value} = ${final_amount} ${to_curr.value}`;
}

button.addEventListener("click", (evt)=>{
    evt.preventDefault();
    get_exchange_rate();
})

window.addEventListener("load", ()=>{
    get_exchange_rate();
})