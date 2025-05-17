function renderDishesTemplate(dish, index) {
  return `<div class="card-menu">
  <div class="card-menu-text">
    <h3>${dish.name}</h3>
    <p>${dish.description}</p>
        <p class="card-price">${dish.price.toFixed(2).replace(".", ",")} €</p>
    </div>
    <div class="btn-container" onclick="addToCart(${index})">
    <button class="btn">+</button>
    </div>
    </div>`;
}
