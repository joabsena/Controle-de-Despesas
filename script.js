const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');

const dummyTransitions = [
  {
    id: 1,
    name: 'Bolo de brigadeiro',
    amount: -20,
  },
  {
    id: 2,
    name: 'Salário',
    amount: 300,
  },
  {
    id: 3,
    name: 'Torta de frango',
    amount: -10,
  },
  {
    id: 4,
    name: 'Violão',
    amount: 150,
  },
];

const addTransitionIntoDom = (transition) => {
  const operator = transition.amount < 0 ? '-' : '+';
  const CSSClass = transition.amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(transition.amount);
  const li = document.createElement('li');

  li.classList.add(CSSClass);
  li.innerHTML = `
    ${transition.name} <span>R$ ${operator}${amountWithoutOperator}</span>
    <button class="delete-btn">x</button>
  `;
  transactionsUl.prepend(li);
};

const updateBalanceValue = () => {
  const transactionsAmounts = dummyTransitions.map(
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
  dummyTransitions.forEach(addTransitionIntoDom);
  updateBalanceValue();
};

init();
