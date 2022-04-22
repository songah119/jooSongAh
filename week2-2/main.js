const $ = (selector) => document.querySelector(selector);
const $A=(selector) => document.querySelectorAll(selector);

function burgerAdd(cartList,burgerName,burgerPrice){ //add burger items in the cart
    const cartClassList=document.createElement('div');
    cartClassList.innerHTML = `
    <h3 class="cart__list--burger-name">${burgerName}</h3>
    <input type="number" value="1" min="1" class="cart__list--amount cart__list-${burgerName}--amount" />
    <p class="cart__list--price">${burgerPrice}</p>
    <button type="button" class="cart__list--remove-btn">⚔️</button>`;

    cartClassList.querySelector(`.cart__list-${burgerName}--amount`).addEventListener("change", () => {
        calcTotalPrice(cartList);
    });
    cartClassList.querySelector('button.cart__list--remove-btn').addEventListener("click", (e) => { // click X btn -> remove item
        removeItem(cartList, e.target);
    });
    cartList.appendChild(cartClassList);
}

function removeItem(cartList, btn) { // remove target item
    btn.parentElement.remove();
    calcTotalPrice(cartList);
}

function parsePriceToNumber(price) {
    const removedComma = price.replace(/\D/g, "");
    return +removedComma;
}

function calcTotalPrice(cartList){ //calculate totalPrice
    let totalPrice = 0;
    const cartListChild=cartList.childNodes;
    cartListChild.forEach((cartClassList)=>{
        const currentPrice = parsePriceToNumber(cartClassList.querySelector('.cart__list--price').innerText);
        const currentAmount =cartClassList.querySelector('.cart__list--amount').value;
        totalPrice += currentPrice*currentAmount;
    });

    $('p.total-price').innerText = totalPrice.toLocaleString();
}

function burgerExsist(cartList,burgerName){ //checking the burger is already in cartList 
    const cartListChild=cartList.childNodes;
    let bool=false;
    cartListChild.forEach((cartClassList)=>{
        if(burgerName === cartClassList.querySelector('.cart__list--burger-name').innerText) bool=true;
    });
    return bool;
    
}

function attachEvent({cartList,burgerCardList,orderBtn,cancelBtn}){
    burgerCardList.forEach((burgerCard) =>{ //click the burger for adding
        burgerCard.addEventListener('click', () =>{
        const burgerName = burgerCard.querySelector(".burger-name").innerText;
        const burgerPrice = burgerCard.querySelector(".burger-price").innerText;
        if(burgerExsist(cartList,burgerName)) $(`.cart__list-${burgerName}--amount`).value++;
        else burgerAdd(cartList,burgerName, burgerPrice);
        calcTotalPrice(cartList); //total price change
        }
        )
    });

    orderBtn.addEventListener('click',(e)=>{ //click the order btn, show modal
        showModal();
    });    

    cancelBtn.addEventListener('click',(e)=>{ //click the cancel btn 
        cancelBurger(cartList);
    });

}

function cancelBurger(cartList){ //cancel initializing totalPrice, burgerlist
    const cartListChild=cartList.childNodes;
    cartListChild.forEach((cartClassList)=>{
        cartList.remove(cartClassList);
    });
    calcTotalPrice(cartList);
}

function showModal(){ //show modal which has confirm, cancel btn
    const modal= $('.modal');
    const modalCancelBtn= $('.no-btn');

    modal.classList.remove('hide');
    modalCancelBtn.addEventListener('click', () =>{
        modal.classList.add('hide');
    })
}

function cartManager(burgerInfo){ //attachEvent, init
    //const {burgerTotalPrice}=burgerInfo;
    //init(burgerTotalPrice);
    attachEvent(burgerInfo);
}

window.onload =()=>{ //onload
    cartManager({
        burgerCardList: $A('.burger-card'),
        cartList: $('ul.cart__list'),
        orderBtn: $('button.cart-btn--order'),
        cancelBtn: $('button.cart-btn--cancel'),
    });
};