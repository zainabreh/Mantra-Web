
const ConvenienceFee = 99;
let gettingItemData;
onload();
function onload() {
  gettingData();
  calculateSummary();
  displayData();
}

function gettingData() {
 
  gettingItemData = cartItem.map((item) => {
    
    for (let i = 0; i < items.length; i++) {
      if (item == items[i].id) {
        return items[i];
      }
    }
  });  
  
}

function displayData() {
  let itemCards = document.querySelector(".itemCards");
 
  let gettingHtml = "";
  if (!gettingItemData || gettingItemData.length === 0){
    gettingHtml = `<h1 class='no-msg'>No Items Ordered</h1>`;
  }else{
    gettingItemData.forEach((item) => {
      gettingHtml += generateItemHTML(item);
    });
  }
  itemCards.innerHTML = gettingHtml;
 
}

function deleteItem(itemid) {
  
  cartItem = cartItem.filter(item => item !== itemid);
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
  gettingData();
  count.innerText = cartItem.length;
  calculateSummary();
  displayData();
  
}

function generateItemHTML(itemid) {
 
  return `
    <div class="itemCard">
            <div class="delete">
                <i class="fa-solid fa-xmark" onclick="deleteItem(${itemid.id})"></i>
            </div>
            <div class="image">
                <img src="../${itemid.image}" alt="product-image" class="prod-cart-image">
            </div>

            <div class="itemDetail">
                <div class="cart-company-name">
                    ${itemid.company}
                </div>
                
                <div class="cart-item-name">
                ${itemid.item_name}
                </div>
                
                <div class="price">
                    <span class="curr-price">RS ${itemid.current_price}</span>
                    <span class="org-price">RS ${itemid.original_price}</span>
                    <span class="discount">(${itemid.discount_percentage}% OFF)</span>
                </div>

                <div class="cart-return">
                    <span class="return-date">${itemid.return_period} days</span> return available
                </div>

                <div class="cart-delivery">
                    Delivered by <span class="delivery-date">${itemid.delivery_date}</span> 
                </div>

            </div>


        </div>
    `;
    
}

function calculateSummary() {
  let summary = document.querySelector(".summary");

  let totalMRP = 0;
  let totalItems = gettingItemData.length;
  let totalDiscount = 0;

  gettingItemData.forEach((item) => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });

  let totalCharge = totalMRP - totalDiscount + ConvenienceFee;

  summary.innerHTML = `
  <div class="price-detail">

    PRICE DETAILS (${totalItems} Items)
    </div>

    <div class="MRP">
        <span>Total MRP</span>
        <span>Rs ${totalMRP}</span>
    </div>

    <div class="discount-MRP">
        <span>Discount on MRP</span>
        <span>-RS ${totalDiscount}</span>
    </div>

    <div class="convenience-fee">
        <span>Convenience Fee</span>
        <span>Rs ${ConvenienceFee}</span>
    </div>

    <hr/>

    <div class="total">
        <span>Total Amount</span>
        <span>Rs ${totalCharge}</span>
    </div>

    <button class="order-btn">Place Order</button>`;
}
