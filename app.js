let dropdown=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button")

let from=document.querySelector(".from select");
let to=document.querySelector(".to select");
let msg=document.querySelector(".msg");

for (let select of dropdown) {
    for (let Currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = Currcode;
        newOption.value = Currcode;
        select.appendChild(newOption);
    }
}

// Set default values AFTER options are loaded
document.querySelector(".from select").value = "USD";
document.querySelector(".to select").value = "INR";

// Set default flags
changeflag(document.querySelector(".from select"));
changeflag(document.querySelector(".to select"));

// Listen to flag changes
document.addEventListener("change", (event) => {
    if (event.target.tagName === "SELECT") {
        changeflag(event.target);
    }
});


    
function changeflag(element){
  let Currcode=element.value;
  let countryCode=countryList[Currcode];
  let newImg=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
   img.src=newImg;
}

async function updatExchangeRate(){
     let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`;

try {
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
  console.log(rate);
  let finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText = `${amtVal} ${from.value} = ${finalAmount} ${to.value}`;
} catch (err) {
  msg.innerText = "Error fetching currency data.";
  console.error(err);
}
}


btn.addEventListener("click", async (evt)=>{       
    ///  (event) is event when a button is clicked
    evt.preventDefault();
    updatExchangeRate();
} );

window.addEventListener("load",()=>{
   updatExchangeRate();
});
