function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart));
}
function addToCart(name,price,image){
    let cart=getCart();
    let item=cart.find(product=>product.name===name);
    if(item){
        item.quantity++;
    }else{
        cart.push({
            name:name,
            price:price,
            image:image,
            quantity:1
        });
    }
    saveCart(cart);
    showMessage(name+" added to cart");
}
function buyNow(name,price,image){
    let cart=[
        {
            name:name,
            price:price,
            image:image,
            quantity:1
        }
    ];
    saveCart(cart);
    openCheckout();
}
function changeImage(image){
    let mainImage=document.getElementById("mainProductImage");
    if(mainImage){
        mainImage.src=image.src;
    }
    document.querySelectorAll(".thumbnail").forEach(item=>{
        item.classList.remove("active");
    });
    image.classList.add("active");
}
function openCheckout(){
    let modal=document.getElementById("checkoutModal");
    if(modal){
        modal.classList.add("show");
        document.body.style.overflow="hidden";
    }else{
        window.location.href="cart.html";
    }
}
function closeCheckout(){
    let modal=document.getElementById("checkoutModal");
    if(modal){
        modal.classList.remove("show");
        document.body.style.overflow="";
    }
}
const products={
sunscreen:{
name:"Sunscreen",
price:500,
image:"images/Sunscreen.jpg",
images:[
"images/Sunscreen.jpg",
"images/Sunscreen2.jpg",
"images/Sunscreen3.jpg",
"images/Sunscreen4.jpg",
"images/Sunscreen5.jpg"
],
rating:"★★★★★ 4.8/5",
description:"Daily sunscreen that helps protect your skin from harmful UV rays. Lightweight and comfortable for everyday use.",
features:[
"Lightweight formula",
"Suitable for daily use",
"Helps protect from UV rays",
"Non-sticky feel",
"Easy to apply"
]
},
moisturizer:{
name:"Moisturizer",
price:600,
image:"images/Moisturizer.jpg",
images:[
"images/Moisturizer.jpg",
"images/Moisturizer2.jpg",
"images/Moisturizer3.jpg",
"images/Moisturizer4.jpg",
"images/Moisturizer5.jpg"
],
rating:"★★★★★ 4.7/5",
description:"A hydrating moisturizer that helps keep your skin soft, smooth and moisturized throughout the day.",
features:[
"Deep hydration",
"Soft and smooth skin",
"Lightweight texture",
"Suitable for daily use",
"Easy to apply"
]
},
lotion:{
name:"Lotion",
price:450,
image:"images/lotion.jpg",
images:[
"images/lotion.jpg",
"images/lotion2.jpg",
"images/lotion3.jpg",
"images/lotion4.jpg",
"images/lotion5.jpg"
],
rating:"★★★★★ 4.6/5",
description:"A gentle body lotion that helps nourish and moisturize your skin for a soft and comfortable feel.",
features:[
"Daily body care",
"Moisturizing formula",
"Soft skin",
"Lightweight texture",
"Easy absorption"
]
},
serum:{
name:"Serum",
price:800,
image:"images/serum.jpg",
images:[
"images/serum.jpg",
"images/serum2.jpg",
"images/serum3.jpg",
"images/serum4.jpg",
"images/serum5.jpg"
],
rating:"★★★★★ 4.8/5",
description:"A lightweight facial serum designed to complement your daily skincare routine and give your skin a fresh appearance.",
features:[
"Lightweight formula",
"Easy absorption",
"Daily skincare",
"Smooth skin",
"Easy to apply"
]
},
cleanser:{
name:"Cleanser",
price:400,
image:"images/cleanser.jpg",
images:[
"images/cleanser.jpg",
"images/cleanser2.jpg",
"images/cleanser3.jpg",
"images/cleanser4.jpg",
"images/cleanser5.jpg"
],
rating:"★★★★★ 4.7/5",
description:"A gentle cleanser that helps remove dirt, excess oil and everyday impurities from the skin.",
features:[
"Gentle cleansing",
"Removes impurities",
"Helps remove excess oil",
"Suitable for daily use",
"Refreshing feel"
]
},
toner:{
name:"Toner",
price:350,
image:"images/toners.jpg",
images:[
"images/toners.jpg",
"images/toners2.jpg",
"images/toners3.jpg",
"images/toners4.jpg",
"images/toners5.jpg"
],
rating:"★★★★★ 4.6/5",
description:"A refreshing toner that can be used as part of your everyday skincare routine for a clean and refreshed feel.",
features:[
"Refreshing formula",
"Daily skincare",
"Easy application",
"Lightweight feel",
"Suitable for everyday use"
]
}
};
function loadProductPage(){
const params=new URLSearchParams(window.location.search);
const productKey=params.get("product");
if(!productKey||!products[productKey]){
return;
}
const product=products[productKey];
const name=document.getElementById("productName");
const price=document.getElementById("productPrice");
const rating=document.getElementById("productRating");
const description=document.getElementById("productDescription");
const mainImage=document.getElementById("mainProductImage");
const thumbnailContainer=document.getElementById("thumbnailContainer");
const features=document.getElementById("productFeatures");
const addButton=document.getElementById("addCartButton");
const buyButton=document.getElementById("buyNowButton");
if(name){
name.textContent=product.name;
}
if(price){
price.textContent="₹"+product.price;
}
if(rating){
rating.textContent=product.rating;
}
if(description){
description.textContent=product.description;
}
if(mainImage){
mainImage.src=product.images[0];
mainImage.alt=product.name;
}
if(thumbnailContainer){
thumbnailContainer.innerHTML="";
product.images.forEach((image,index)=>{
thumbnailContainer.innerHTML+=`
<img class="thumbnail ${index===0?"active":""}" src="${image}" alt="${product.name}" onclick="changeProductImage(this)">
`;
});
}
if(features){
features.innerHTML="";
product.features.forEach(feature=>{
features.innerHTML+=`<li>${feature}</li>`;
});
}
if(addButton){
addButton.onclick=function(){
addToCart(product.name,product.price,product.image);
};
}
if(buyButton){
buyButton.onclick=function(){
buyNow(product.name,product.price,product.image);
};
}
}
function changeProductImage(image){
const mainImage=document.getElementById("mainProductImage");
if(mainImage){
mainImage.src=image.src;
}
document.querySelectorAll(".thumbnail").forEach(item=>{
item.classList.remove("active");
});
image.classList.add("active");
}
document.addEventListener("DOMContentLoaded",()=>{
loadProductPage();
loadCart();
const checkoutForm=document.getElementById("checkoutForm");
if(checkoutForm){
checkoutForm.addEventListener("submit",submitCheckout);
}
const contactForm=document.getElementById("contactForm");
if(contactForm){
contactForm.addEventListener("submit",submitContact);
}
});
function loadCart(){
    let cart=getCart();
    let cartItems=document.getElementById("cartItems");
    let cartTotal=document.getElementById("cartTotal");
    let cartProductCount=document.getElementById("cartProductCount");
    let cartQuantity=document.getElementById("cartQuantity");
    if(!cartItems||!cartTotal){
        return;
    }
    cartItems.innerHTML="";
    let total=0;
    let quantity=0;
    if(cart.length===0){
        cartItems.innerHTML=`
        <div class="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Add some skincare products to your cart.</p>
            <a href="products.html">Continue Shopping</a>
        </div>`;
        cartTotal.textContent="₹0";
        if(cartProductCount){
            cartProductCount.textContent="0";
        }
        if(cartQuantity){
            cartQuantity.textContent="0";
        }
        return;
    }
    cart.forEach((item,index)=>{
        let itemTotal=item.price*item.quantity;
        total+=itemTotal;
        quantity+=item.quantity;
        let description=getProductDescription(item.name);
        let rating=getProductRating(item.name);
        cartItems.innerHTML+=`
        <div class="cart-item">
            <div class="cart-product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h2>${item.name}</h2>
                <div class="cart-rating">${rating}</div>
                <p class="cart-description">${description}</p>
                <p class="cart-price">Price: ₹${item.price}</p>
                <p class="cart-item-total">Item Total: ₹${itemTotal}</p>
            </div>
            <div class="quantity-section">
                <p>Quantity</p>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
            </div>
            <button class="remove-button" onclick="removeItem(${index})">Remove</button>
        </div>`;
    });
    cartTotal.textContent="₹"+total;
    if(cartProductCount){
        cartProductCount.textContent=cart.length;
    }
    if(cartQuantity){
        cartQuantity.textContent=quantity;
    }
}
function getProductDescription(name){
    let descriptions={
        "Sunscreen":"Daily sunscreen for protection from harmful UV rays. Lightweight and suitable for everyday skincare.",
        "Moisturizer":"Hydrating moisturizer that helps keep your skin soft, smooth and moisturized.",
        "Lotion":"Gentle body lotion that helps moisturize and nourish your skin every day.",
        "Serum":"Lightweight facial serum designed for a fresh, smooth and glowing-looking appearance.",
        "Cleanser":"Gentle cleanser that helps remove dirt, excess oil and impurities from the skin.",
        "Toner":"Refreshing toner that can be included in your everyday skincare routine."
    };
    return descriptions[name]||"Quality skincare product for your daily skincare routine.";
}
function getProductRating(name){
    let ratings={
        "Sunscreen":"★★★★★ 4.8/5",
        "Moisturizer":"★★★★★ 4.7/5",
        "Lotion":"★★★★★ 4.6/5",
        "Serum":"★★★★★ 4.8/5",
        "Cleanser":"★★★★★ 4.7/5",
        "Toner":"★★★★★ 4.6/5"
    };
    return ratings[name]||"★★★★★";
}

function increaseQuantity(index){
    let cart=getCart();
    if(!cart[index]){
        return;
    }
    cart[index].quantity++;
    saveCart(cart);
    loadCart();
}
function decreaseQuantity(index){
    let cart=getCart();
    if(!cart[index]){
        return;
    }
    if(cart[index].quantity>1){
        cart[index].quantity--;
    }else{
        cart.splice(index,1);
    }
    saveCart(cart);
    loadCart();
}
function removeItem(index){
    let cart=getCart();
    if(!cart[index]){
        return;
    }
    let productName=cart[index].name;
    cart.splice(index,1);
    saveCart(cart);
    loadCart();
    showMessage(productName+" removed from cart");
}
function clearCart(){
    localStorage.removeItem("cart");
    loadCart();
    showMessage("Cart cleared");
}
function getCartTotal(){
    let cart=getCart();
    return cart.reduce((total,item)=>{
        return total+(item.price*item.quantity);
    },0);
}
function buyAll(){
    let cart=getCart();
    if(cart.length===0){
        showMessage("Your cart is empty");
        return;
    }
    openCheckout();
}
function submitCheckout(event){
    event.preventDefault();
    let name=document.getElementById("customerName");
    let phone=document.getElementById("customerPhone");
    let address=document.getElementById("customerAddress");
    let city=document.getElementById("customerCity");
    let state=document.getElementById("customerState");
    let pincode=document.getElementById("customerPincode");
    if(!name||!phone||!address||!city||!state||!pincode){
        showMessage("Shipping form not found");
        return;
    }
    name=name.value.trim();
    phone=phone.value.trim();
    address=address.value.trim();
    city=city.value.trim();
    state=state.value.trim();
    pincode=pincode.value.trim();
    if(name===""){
        showMessage("Please enter your name");
        return;
    }
    if(!/^[0-9]{10}$/.test(phone)){
        showMessage("Enter a valid 10 digit mobile number");
        return;
    }
    if(address===""){
        showMessage("Please enter your address");
        return;
    }
    if(city===""){
        showMessage("Please enter your city");
        return;
    }
    if(state===""){
        showMessage("Please enter your state");
        return;
    }
    if(!/^[0-9]{6}$/.test(pincode)){
        showMessage("Enter a valid 6 digit pincode");
        return;
    }
    let cart=getCart();
    if(cart.length===0){
        showMessage("Your cart is empty");
        closeCheckout();
        return;
    }
    let total=getCartTotal();
    let orderNumber="SK"+Date.now().toString().slice(-8);
    let order={
        orderNumber:orderNumber,
        name:name,
        phone:phone,
        address:address,
        city:city,
        state:state,
        pincode:pincode,
        items:cart,
        total:total,
        date:new Date().toLocaleString()
    };
    localStorage.setItem("lastOrder",JSON.stringify(order));
    localStorage.removeItem("cart");
    closeCheckout();
    showOrderSuccess(orderNumber,total);
}
function showOrderSuccess(orderNumber,total){
    let successModal=document.getElementById("successModal");
    let orderMessage=document.getElementById("orderMessage");
    if(successModal){
        if(orderMessage){
            orderMessage.innerHTML="Order ID: <strong>"+orderNumber+"</strong><br>Total Amount: <strong>₹"+total+"</strong>";
        }
        successModal.classList.add("show");
        document.body.style.overflow="hidden";
    }else{
        showMessage("Order placed successfully!");
    }
}
function closeSuccess(){
    let modal=document.getElementById("successModal");
    if(modal){
        modal.classList.remove("show");
    }
    document.body.style.overflow="";
    window.location.href="products.html";
}
function submitContact(event){
    event.preventDefault();
    let name=document.getElementById("name");
    let email=document.getElementById("email");
    let message=document.getElementById("message");
    if(!name||!email||!message){
        return;
    }
    if(name.value.trim()===""){
        showMessage("Please enter your name");
        return;
    }
    if(email.value.trim()===""){
        showMessage("Please enter your email");
        return;
    }
    if(message.value.trim()===""){
        showMessage("Please enter your message");
        return;
    }
    showMessage("Message sent successfully!");
    event.target.reset();
}
function showMessage(message){
    let messageBox=document.getElementById("messageBox");
    if(!messageBox){
        messageBox=document.createElement("div");
        messageBox.id="messageBox";
        document.body.appendChild(messageBox);
    }
    messageBox.textContent=message;
    messageBox.classList.add("show");
    clearTimeout(window.messageTimer);
    window.messageTimer=setTimeout(()=>{
        messageBox.classList.remove("show");
    },2000);
}
document.addEventListener("DOMContentLoaded",()=>{
    loadCart();
    let checkoutForm=document.getElementById("checkoutForm");
    if(checkoutForm){
        checkoutForm.addEventListener("submit",submitCheckout);
    }
    let contactForm=document.getElementById("contactForm");
    if(contactForm){
        contactForm.addEventListener("submit",submitContact);
    }
    let modal=document.getElementById("checkoutModal");
    if(modal){
        modal.addEventListener("click",event=>{
            if(event.target===modal){
                closeCheckout();
            }
        });
    }
    let successModal=document.getElementById("successModal");
    if(successModal){
        successModal.addEventListener("click",event=>{
            if(event.target===successModal){
                closeSuccess();
            }
        });
    }
});
