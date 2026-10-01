let demo = document.getElementById("demo");

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(function(product) {
        return product.name === name;
    });

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart");
}

function buyNow(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = [{
        name: name,
        price: price,
        quantity: 1
    }];

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "cart.html";
}

function buyAll() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    } else {
        let total = 0;
        cart.forEach(function(item) {
            total += item.price * item.quantity;
        });
        alert("Total amount to be paid: ₹" + total);
    }
  }
 
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {
        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Total: ₹${itemTotal}</p>

                <button onclick="decreaseQuantity(${index})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartTotal.innerHTML = "Total: ₹" + total;
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");

    loadCart();
}

if (document.getElementById("cartItems")) {
    loadCart();
}

