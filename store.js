if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}
//pressing add to cart
function purchaseClicked() {
  // alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  if (!cartItems.hasChildNodes()) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }
  alert("Thank you for your purchase");
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  sessionStorage.clear();
  updateCartTotal();
}

// location.remove();

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
//add to cart
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  const previousCart = sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart"))
    : [];
  console.log({ title, price, imageSrc });
  console.log(previousCart);
  sessionStorage.setItem(
    "cart",
    JSON.stringify([...previousCart, { title, price, imageSrc }])
  );
  addItemToCart(title, price, imageSrc);

  updateCartTotal();
}
//this is also for adding to the cart
function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }

  var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}
function fillCart() {
  console.log("fillCart");
  let cartItems = sessionStorage.getItem("cart");
  console.log({ cartItems });
  if (!cartItems) return;
  cartItems = JSON.parse(cartItems);
  cartItems.forEach((item) => {
    addItemToCart(item.title, item.price, item.imageSrc);
  });
}
fillCart();
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

//Bying a Ticket from the HTML
function myFunction() {
  // Get input values
  const name = document.getElementsByClassName("tour-item tour-date")[0].value;
  const email = document.getElementsByClassName("tour-item tour-city")[0].value;
  const ticketType = document.getElementsByClassName("tour-item tour-arena")[0]
    .value;
  // const quantity = document.getElementsByClassName("quantity").value;

  // Validate input values
  if (!name || !email || !ticketType) {
    alert("Please fill in all fields");
    return;
  }

  // Calculate total price
  const ticketPrice = getTicketPrice(ticketType);
  // const totalPrice = ticketPrice * quantity;

  // Confirm purchase
  const confirmation = confirm(
    `Confirm purchase of ${quantity} ${ticketType} ticket(s) for a total of $${totalPrice}?`
  );
  if (confirmation) {
    alert("Purchase confirmed!");
    // Here you could add code to actually process the purchase (e.g. make an API call, update a database, etc.)
  }
}

function getTicketPrice(ticketType) {
  // Here you could add code to look up the price for the given ticket type (e.g. from an API or database)
  // For this example, let's just use some hard-coded prices
  switch (ticketType) {
    case "standard":
      return 10;
    case "vip":
      return 20;
    case "premium":
      return 30;
    default:
      return 0;
  }
}

// 2 Purchase a ticket
/*Minimum and maximum number of tickets allowed*/
var minTickets = 1;
var maxTickets = 3;

/*
var contactInfo = document.getElementById("contactInfo");
var timer = document.getElementById("timer");
var ticketCost = 5.5;
var inputTicketQuantity = document.getElementById("inputTicketQuantity");
var totalTicketCost = document.getElementById("totalTicketCost");
var totalTicketCostValueFormated = "5.50";
var inputEmail = document.getElementById("inputEmail");
*/

/*variables for the ticket cost*/
var costPerTicket = 5.5;

/*Countdown timer*/
var timeLeft;
var mins;
var sec;
var r;
var start = Date.now();
var myTime = setInterval(function () {
  timeLeft = 600000 - (Date.now() - start);
  if (timeLeft <= 0) {
    clearInterval(myTime);
    alert(
      "Sorry, you did not complete the form in 10:00 minutes. \n Try again if you need tickets."
    );
    window.location.href = "index.html";
  }
  mins = timeLeft / 60000;
  r = mins % 1;
  sec = Math.floor(r * 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  mins = Math.floor(mins);
  document.getElementById("timer").innerHTML = mins + ":" + sec;
  timeLeft = timeLeft - 1000;
}, 1000);

/*Deal with number of tickets and total cost as well as errors*/

var totalTicketCost;

function calculateTotal() {
  var x = parseInt(
    document.forms["formPurchaseTickets"]["inputTicketQuantity"].value,
    10
  );
  console.log("x is =>", x);
  var error;

  /*If a non numeric is entered*/
  if (isNaN(x)) {
    error = true;
    document.getElementById("contactInfo").style.display = "none";
    document.getElementById("ticketsError").innerHTML =
      "Enter a valid number between " +
      minTickets.toString() +
      " and " +
      maxTickets.toString() +
      " please";

    errorColor("inputTicketQuantity", error);
  } else {
    /*If a number <1 or >3 is entered*/
    x = parseInt(x);

    if (x < minTickets || x > maxTickets) {
      error = true;
      document.getElementById("contactInfo").style.display = "none";
      document.getElementById("ticketsError").innerHTML =
        "You can only buy between " +
        minTickets.toString() +
        " and " +
        maxTickets.toString() +
        " tickets.";

      errorColor("inputTicketQuantity", error);
    } else {
      /*If information is valid display total and open contact information*/
      error = false;
      errorColor("inputTicketQuantity", error);
      document.getElementById("ticketsError").innerHTML = "";
      document.getElementById("contactInfo").style.display = "block";
      totalTicketCost = x * costPerTicket;
      console.log(totalTicketCost);
      document.getElementById("totalTicketCost").innerHTML =
        parseFloat(totalTicketCost).toFixed(2);
    }
  }
}

/*Color change on error*/
function errorColor(String, error) {
  if (error == true) {
    document.getElementById(String).style.backgroundColor = "yellow";
    error = false;
  } else {
    document.getElementById(String).style.backgroundColor = "#efefef";
  }
}
