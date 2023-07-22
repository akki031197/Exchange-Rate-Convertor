const currency_oneEx = document.getElementById("currency-one");
const amount_oneInput = document.getElementById("amount-one");
const currency_twoEx = document.getElementById("currency-two");
const amount_twoInput = document.getElementById("amount-two");
const container = document.querySelector("container");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

currency_oneEx.addEventListener("change", calculate);
currency_twoEx.addEventListener("change", calculate);
amount_oneInput.addEventListener("input", calculate);
amount_twoInput.addEventListener("input", calculate);

function calculate() {
  const currency_one = currency_oneEx.value;
  const currency_two = currency_twoEx.value;

  const amount_one = amount_oneInput.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(
    (res) =>
      res.json().then((data) => {
        const rate = data.rates[currency_two] * amount_one;
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amount_twoInput.value = rate.toFixed(2);
      })
  );
}

swap.addEventListener("click", () => {
  const temp = currency_oneEx.value;
  currency_oneEx.value = currency_twoEx.value;
  currency_twoEx.value = temp;
  calculate();
});
calculate();
