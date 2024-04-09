let hamicon = document.querySelector(".hamburger");
let navLinks = document.querySelector(".nav_links");
let count = document.querySelector(".count");
let itemsContainer = document.querySelector(".items-container");

hamicon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
let cartItem;
let bagItemstr =localStorage.getItem('cartItem')
cartItem = bagItemstr ? JSON.parse(bagItemstr) : [];

function addTocart(id){
    cartItem.push(id);
    localStorage.setItem('cartItem',JSON.stringify(cartItem))
    updateCartCount();
}

let updateCartCount = ()=>{
    if(cartItem.length > 0){
        count.style.visibility = 'visible';
        count.innerText = cartItem.length;
    }else{
        count.style.visibility = 'hidden';
    }
}
let item_Collection = '';

items.forEach(item=>{
    item_Collection += `<div class="item-container">
    <img src="${item.image}" alt="product-picture" class="prod-image"/>
    
    <div class="ratings">
        ${item.rating.stars} ⭐ | ${item.rating.count}
    </div>
    
    <div class="company-name">
        ${item.company}
    </div>
    
    <div class="item-name">
        ${item.item_name}
    </div>
    
    <div class="price">
        <span class="curr-price">RS ${item.current_price}</span>
        <span class="org-price">RS ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    
    <button class="add-btn" onclick="addTocart(${item.id})">Add to Cart</button>
    
    </div>`;
})
itemsContainer.innerHTML = item_Collection;
