const apiKey = 'ec37479573bdc28e1fae4977';
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultEl = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
async function loadCurrencies() {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    const data = await res.json();
    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach(cur => {
      const option1 = document.createElement('option');
      option1.value = cur;
      option1.textContent = cur;
      fromSelect.appendChild(option1);
      const option2 = document.createElement('option');
      option2.value = cur;
      option2.textContent = cur;
      toSelect.appendChild(option2);
    });
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
  } catch (err) {
    console.error(err);
    alert('Не удалось загрузить валюты.');
  }
}
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;
  if (!amount || isNaN(amount)) {
    alert('Введите корректную сумму');
    return;
  }
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
    const data = await res.json();
    const rate = data.conversion_rates[to];
    const converted = (amount * rate).toFixed(2);
    resultEl.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    console.error(err);
    alert('Ошибка при конвертации валют');
  }
}
convertBtn.addEventListener('click', convertCurrency);
loadCurrencies();
