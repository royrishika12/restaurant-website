
let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalBill = document.getElementById("totalBill");
  const cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  totalBill.textContent = `Total: ₹${total}`;
  cartCount.textContent = count;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  document.getElementById("checkoutForm").scrollIntoView({ behavior: "smooth" });
}

function toggleCart() {
  document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
}

function filterCategory(category) {
  const items = document.querySelectorAll(".menu-item");
  items.forEach(item => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  document.getElementById("checkoutMessage").textContent =
    "🎉 Order placed successfully! Thank you for ordering from The Haveli.";
  document.getElementById("checkoutMessage").style.color = "lightgreen";

  cart = [];
  updateCart();
  this.reset();
});