const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransaction = (ID) => {
  transactions = transactions.filter((transition) => transition.id !== ID);
  updateLocalStorage();
  init();
};

const addTransitionIntoDom = (transition) => {
  const operator = transition.amount < 0 ? '-' : '+';
  const CSSClass = transition.amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(transition.amount);
  const li = document.createElement('li');

  li.classList.add(CSSClass);
  li.innerHTML = `
    ${transition.name} <span>R$ ${operator}${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transition.id})">
    x
    </button>
  `;
  transactionsUl.prepend(li);
};

const updateBalanceValue = () => {
  const transactionsAmounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
  const income = transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
  const expense = Math.abs(
    transactionsAmounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => accumulator + value, 0)
  ).toFixed(2);

  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
  transactionsUl.innerHTML = '';

  transactions.forEach(addTransitionIntoDom);
  updateBalanceValue();
};

init();

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const generateID = () => Math.round(Math.random() * 1000);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionsAmount = inputTransactionAmount.value.trim();

  if (transactionName === '' || transactionsAmount === '') {
    alert('Por favor, preencha tanto o nome quanto o valor da transação!');
    return;
  }

  const transaction = {
    id: generateID(),
    name: transactionName,
    amount: Number(transactionsAmount),
  };

  transactions.push(transaction);
  init();
  updateLocalStorage();

  inputTransactionName.value = '';
  inputTransactionAmount.value = '';
});
