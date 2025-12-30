
function formatRWF(amount) {
  return amount.toLocaleString("en-US") + " FRW";
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

function openCart() {
  document.getElementById("cartModal").style.display = "flex";
  updateCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  cartItems.innerHTML = "";

  let message = "Hello, I want to order:%0A";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
      <li>
        ${item.name} - ${item.price} Frw x ${item.quantity} = ${itemTotal} Frw
        <button onclick="decreaseQuantity('${item.name}')">-</button>
        <button onclick="increaseQuantity('${item.name}')">+</button>
        <button onclick="removeItem('${item.name}')">Remove</button>
      </li>
    `;

    message += `${index + 1}. ${item.name} - ${item.price} Frw x ${item.quantity} = ${itemTotal} Frw%0A`;
  });

  totalPrice.innerText = "Total: " + total + " Frw";
  message += `%0ATotal: ${total} Frw`;

  const phoneNumber = "250796946062";
  document.getElementById("whatsappBtn").href =
    `https://wa.me/${phoneNumber}?text=${message}`;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item) item.quantity += 1;
  updateCart();
}

function decreaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    removeItem(name);
  }
  updateCart();
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}
