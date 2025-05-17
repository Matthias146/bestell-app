let menu = document.getElementById("dishes");
let cart = [];
window.onload = render;

function render() {
  renderDishes();
}

function renderDishes() {
  menu.innerHTML = "";
  for (let menus = 0; menus < myDishes.length; menus++) {
    menu.innerHTML += renderDishesTemplate(myDishes[menus], menus);
  }
}

function renderCart() {
  let cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='cart-empty'>Warenkorb ist leer.</p>";
    return;
  }

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const subtotal = item.amount * item.price;
    total += subtotal;

    cartContainer.innerHTML += `
        <div class="cart-item">
          <p class="cart-item-name">${item.name}</p>
          <div class="cart-controls">
          <div class="btn-amount-wrapper">
            <button class="btn-amount" onclick="removeFromCart(${i})">-</button>
            <span class="cart-item-number">${item.amount}</span>
            <span class="btn-amount btn-amount-plus" onclick="increaseAmount(${i})">+</span>
            </div>
             <p>${subtotal.toFixed(2).replace(".", ",")} €</p>
            <button onclick="deleteFromCart(${i})" class="btn-delete">🗑️</button>
          </div>
         
        </div>`;
  }

  const shipping = 5;
  total += shipping;

  cartContainer.innerHTML += `
      <div class="cart-total-container">
      <p class="cart-total">Lieferkosten: <span>${shipping
        .toFixed(2)
        .replace(".", ",")} €</span></p>
      <h4 class="cart-total">Gesamt: <span>${total
        .toFixed(2)
        .replace(".", ",")} €</span</h4>
   </div> `;
}

function decreaseAmount(index) {
  if (cart[index].amount > 1) {
    cart[index].amount--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

function addToCart(index) {
  const dish = myDishes[index];
  const existingItem = cart.find((item) => item.name === dish.name);

  if (existingItem) {
    existingItem.amount++;
  } else {
    cart.push({ name: dish.name, price: dish.price, amount: 1 });
  }

  renderCart();
}

function removeFromCart(index) {
  const item = cart[index];
  if (item.amount > 1) {
    item.amount--;
  } else {
    cart.splice(index, 1);
  }

  renderCart();
}

function deleteFromCart(index) {
  cart.splice(index, 1); // entfernt das ganze Objekt
  renderCart();
}

function increaseAmount(index) {
  cart[index].amount++;
  renderCart();
}
