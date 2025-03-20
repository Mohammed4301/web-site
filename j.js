var cartIcon=document.querySelector("#cart-icon");
var cart=document.querySelector(".cart");
var closeIcon=document.querySelector(".fa-times");


cartIcon.onclick=()=>{
    cart.classList.add("active")
}
closeIcon.onclick=()=>{
    cart.classList.remove("active")
};

if(document.readyState='loading'){
    document.addEventListener("click", ready)
}else{
    ready()
};

function ready(){
    var removeIcon=document.querySelectorAll(".fa-trash");
    for (var i=0; i<removeIcon.length; i++){
        var button=removeIcon[i];
        button.addEventListener("click", removeIconItem)
    }
};

function removeIconItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updateCartCount(-1);
    updateTotalPrice();
    
};

//addtocart
var cartContent=document.querySelector(".cart-content")
var addToCartButtons=document.querySelectorAll(".add-cart");
addToCartButtons.forEach(button=>{
    button.addEventListener("click", event=>{
        var singleProduct=event.target.closest(".box-1");
        addToCart(singleProduct)
    })
});

 addToCart=(singleProduct)=>{
    var singleProductImg=singleProduct.querySelector("img").src;
    var singleProductPrice=singleProduct.querySelector(".product-price").textContent;
    var singleProductTitle=singleProduct.querySelector(".single-product-title").textContent;


    var cartBox=document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML=`
    
    <img src="${singleProductImg}" alt="">
            <div class="detials">
                <h4 class="cart-title-product">${singleProductTitle}</h4>
                <span class="cart-price">${singleProductPrice}</span>
                <div class="cart-quantity">
                    <button id="biyog">-</button>
                    <span class="number">1</span>
                    <button id="plus">+</button>
                </div>
            </div>
            <i class="fa fa-trash"></i>
    
    
    
    
    `;
cartContent.appendChild(cartBox);

cartBox.querySelector(".cart-quantity").addEventListener("click", event=>{
    var numberElement=cartBox.querySelector(".number");
    var biyogButton=cartBox.querySelector("#biyog");
    let quantity=numberElement.textContent;

    if(event.target.id==="biyog"  && quantity>1){
        quantity--;
        if(quantity===1){
            biyogButton.style.color==="#999"
        }
    }else if(event.target.id==="plus"){
        quantity++;
        biyogButton.style.color==="#333"
    }
    numberElement.textContent=quantity;

    updateTotalPrice()
});
updateCartCount(1)

   updateTotalPrice()

};

var updateTotalPrice=()=>{
    var totalPriceElement=document.querySelector(".total-price");
    var cartBoxes=cartContent.querySelectorAll(".cart-box");
    let total=0;


 cartBoxes.forEach(cartBox=>{
    var priceElement=cartBox.querySelector(".cart-price");
    var quantityElement=cartBox.querySelector(".number");
    var price=priceElement.textContent.replace("$", "");
    var quantity=quantityElement.textContent;
    total+=price*quantity
 });
 totalPriceElement.textContent=`$${total}`
};

let cartItemCount=0;
var updateCartCount=change=>{
    var cartItemCountBadge=document.querySelector(".cart-count-number");
    cartItemCount+=change;
    if(cartItemCount>0){
        cartItemCountBadge.style.visivility="visible";
        cartItemCountBadge.textContent=cartItemCount;
    }else{
        cartItemCountBadge.style.visivility="hidden";
        cartItemCountBadge.textContent="";
    }
}