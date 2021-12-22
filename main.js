const income = document.getElementById("income");
const expense  = document.getElementById("expense");
const balance = document.getElementById("balance");
const form = document.getElementById("form");
const list  = document.getElementById("list");
const amount = document.getElementById("amount");
const text  = document.getElementById("text");

// local storage
const localstorageTransactions = JSON.parse(
    localstorage.getItem("transactions")
);

let transactions =
    localstorage.getItem("transactions") !== null ?
    localstorageTransactions: [];

//Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.avalue.trim() === "")
    {
        document.getElementById("error_msg").innerHTML =
           <span>Error: Please describe your transaction and enter its corresponding amount!</span>;
        setTimeout(
          () => (document.getElementById("error_msg").innerHTML =
          ""),
          10000
        );     
    }   else {
        const transaction = {
          id: generateID(),
          text: text.value,
          amount: +amount.value,
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updatelocalstorage();

        text.value = "";
        amount.value = "";
    }
}

//To generate random ID
function generationID() {
    return Math.floor(Math.random() *100000000000);
}

//History
function addTransactionDOM(transaction) {

    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" :
    "plus");
   
    item.innerHTML = {transaction,text}; {sign}{Math.abs(transaction.amount
    )} <button class="delete-button" onclick="removeTransaction({transaction.id})"> X </button>;

    list.appendChild(item);
}

//Update income, expense and balance
function updateValues() {
    const amounts = transactions.map((transaction) =>
    transaction.amount);

    const total = amount.reduce((balance, value) => (balance += value)
    ,0).toFixed(2);

    const income = amounts
       .filter((value) => value > 0)
       .reduce((balance, value) => (balance += value), 0) * -(1).toFixed(2);

    balance.innerText = '$${total}';
    income.innerText = '$${income}';
    expense.innerText = '$${expense}';
}

//Remove a transaction
function removeTransaction(id) {
    transactions= transactions.filter((transaction) => transaction.id !== id);

    updatelocalstorage();

    start();
}

//Update local storage transactions
function updatelocalstorage() {
    localStorage.setItem("transaction", JSON.stringify(transactions));
}

//starting the app
function start() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}
start();
form.addEventListener("submit", addTransaction);