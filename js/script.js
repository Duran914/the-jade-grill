/******************************************
Window functions
*******************************************/

  //sticky navbar
window.onscroll = function(){stickyNavbar()};

  //closes form modals
window.onclick = function()
    { 
      closeModal(), 
      closeFormModal() 
    };


/******************************************
Navigation Bar functions
*******************************************/

const navBar = document.querySelector(".navigationBar-section");  // navbar
const navLink = document.querySelectorAll('.nav-link'); // navbar links
const navBarUl = document.querySelector('.navbar-collapse'); // navbar when responsive
const sticky = navBar.offsetTop; // sticky navbar

  // Create sticky navbar when reaches navigation bar
function stickyNavbar() {
  if (window.pageYOffset >= sticky || window.pageYOffset > sticky) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
}

  // Closes navbar when link is clicked
navLink.forEach(link => {
  link.addEventListener("click", () => {
      navBarUl.classList.remove('show');
  }); 
});


/******************************************
Smooth scrolling function
*******************************************/

$(document).ready(function(){
  $(".nav-link").on('click', function(event){
    if(this.hash !== ""){
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, function(){
        window.location.hash = hash;
      });
    }
  });
});


/******************************************
Opens video modal
*******************************************/
const videoModalBtn = document.querySelector('#video-modal'); // video play button
videoModalBtn.addEventListener('click', openVideoModal);

// open video modal
function openVideoModal() {
  const modalVideo = document.createElement('div');
  modalVideo.className = 'modal';
  const cookingVideoBtn = document.querySelector('.cooking-video-text');
  let parent = cookingVideoBtn.firstChild;
  document.body.style.overflow = 'hidden';

  modalVideo.innerHTML = `<div class="video-modal-content">
      <span id="close-video-modal" onclick=closeModalByX() class="close">&times;</span>
      <video class="food-video" src="assets/videos/food-video.mp4" controls></video>
    </div>`;

 cookingVideoBtn.insertBefore(modalVideo, parent)
}


/******************************************
Closes video modal by X & window cick
*******************************************/

  // closes modal by clicking outside video-modal
function closeModal() {
  const videoModal = document.querySelector('.modal');
  const foodVideo = document.querySelector('.food-video');
  if (event.target == videoModal) {
    videoModal.remove();
    document.body.style.overflow = 'scroll';
  }
}

  // closes video modal by click on the X
function closeModalByX() {
  const videoModal = document.querySelector('.modal');
  const foodVideo = document.querySelector('.food-video');
  videoModal.remove();
  document.body.style.overflow = 'scroll';
}


/******************************************
Function to add item w/ banner notification
*******************************************/

const menuItem = document.querySelectorAll('#menu-item');
const cartItemsNumber = document.querySelector('#numberOfItems'); // cart number
let cartItems = []; // Cart

let cartNumber = cartItems.length; // number for item in cart for navbar cart button

menuItem.forEach(item => {
  item.addEventListener('click', addMenuItem)
});

function addMenuItem(fooditem) {
  // gets food name
  const foodName = fooditem.target.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
  let foodPrice = fooditem.target.parentElement.previousSibling.previousSibling.innerHTML;
  foodPrice = parseInt(foodPrice.split('').slice(1).join(''))

  let alert = document.createElement('span');
  // let navbar = document.querySelector('.navigationBar-section');
  let parant = navBar.firstChild;

  alert.className = 'added-item-banner';
  alert.innerHTML = `${foodName} added to cart!`;
  navBar.appendChild(alert, parant);

  setTimeout(function () {
    alert.remove();
  }, 2000)

  cartNumber++;
  cartItemsNumber.innerHTML = cartNumber;

  addToCart(foodName, foodPrice);
}


/******************************************
Opens application modal
*******************************************/
const applyBtn = document.querySelector('#joinUsBtn');

const closeFormModalEvent = document.querySelector('#close-form-modal');

applyBtn.addEventListener('click', applyWithUs);

function applyWithUs(){
  const modelForm = document.createElement('div');
  modelForm.className = 'modal-form'
  let coStatements = document.querySelector('.company-statements');
  let parant = coStatements.firstChild;
  document.body.style.overflow = 'hidden';

  modelForm.innerHTML = `
  <div class="form-modal-content">
  <span id="close-form-modal" onclick=closeFormModalByX() class="close">&times;</span>
              <form>
                   <div class="form-group">
                        <label for="first-name">First Name</label>
                        <input type="text" class="form-control" id="first-name" placeholder="First name">
                      </div>
                      <div class="form-group">
                        <label for="last-name">Last Name</label>
                        <input type="text" class="form-control" id="last-name" placeholder="Last name">
                      </div>
                      <div class="form-group">
                              <label for="category">Category</label>
                              <select class="form-control" id="exampleFormControlSelect1">
                                <option value="Choose a Category">Choose a Category</option>
                                <option>Accounting</option>
                                <option>Hospitality</option>
                                <option>Information Technology</option>
                                <option>Marketing</option>
                                <option>Human Resources</option>
                              </select>
                            </div>
                            <div class="form-group">
                                  <label for="upload">Upload a Resume</label>
                                  <input type="file" class="form-control-file" id="file-upload">
                           </div>
                           <div class="form-group">
                                  <label for="cover-letter">Cover Letter</label>
                                  <textarea class="form-control message-field" id="messageField" rows="5"></textarea>
                                </div>
                      <button type="submit" class="btn applyFormBtn">Submit</button>
                    </form>
              </div>`
              coStatements.insertBefore(modelForm, parant);
}

/******************************************
Closes application modal by X & window cick
*******************************************/

//closes modal by X
function closeFormModalByX() {
  document.querySelector('.modal-form').remove();
  document.body.style.overflow = 'scroll';
  
}
//closes by window click
function closeFormModal() {
  const applyModal = document.querySelector('.modal-form');
  if (event.target == applyModal) {
    applyModal.remove();
    document.body.style.overflow = 'scroll';
  }
}

/******************************************
 Cart functions
*******************************************/

const cartNavLink = document.querySelector('#navLink-cart');
let cartAmountTotal = 0;
cartNavLink.addEventListener('click', openCart);

function addToCart(foodName, foodPrice) {
  let newItem = {
    'name': foodName,
    'price': foodPrice,
    'quantity': 1
  }
  let add = true; // boolen to determine if item in cart

  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name == newItem.name) {
      add = false; // new object will NOT be added
      cartItems[i].quantity += 1; // increases quantity if item in cart
    }
    // console.log(cartItems[i]);
    
  }
  // console.log(cartAmountTotal);
  

  if (add == true) {
    cartItems.push(newItem) // adds new object to array

  }

}

// OPENS CART

function openCart(e) {

  const cart = document.createElement('div');
  cart.className = 'cart';
  let parent = navBar.firstChild;
  document.body.style.overflow = 'hidden';
  let myItems = ''; // cartItems
  let removeAllButton = ""; // remove all button

  // insert object data into <td> for cart
  for (let item in cartItems) {
    myItems += ` <tr>
        <td class="cart-td-content" id="cartName">${cartItems[item].name}</td>
        <td class="cart-td-content" id="cartPrice">${cartItems[item].price}</td>
        <td class="cart-td-content" id="cartQuantity">${cartItems[item].quantity}</td>
        <td class="cart-td-content" id="removeItem"><button class="btn cartButton delete" onclick=removeItem(event)>Remove</button></td>
      </tr>`;
      let amountAdded = cartItems[item].price * cartItems[item].quantity; // multiples price by quantity
          cartAmountTotal += amountAdded; // adds cart item price to total
  }

// Templete for cart UI

  // display remove all button if cart contains 1 or more items
  if (cartItems.length != 0) {
    removeAllButton = `
        <div class="col-4">
        <div class="removeAll">
        <button id="removeAllButton" class="btn cartButton yellowBtn" onclick=removeAllCartItems()>Remove all items</button>
      </div>
      </div>
      </div>
      <div class="row">
      <div class="col-4">
      <div class="removeAll">
      <button id="checkOutButton" class="btn cartButton greenBtn" onclick=removeAllCartItems()>Check Out</button>
     </div>
    </div>
    </div>`;
  }

  cart.innerHTML = `<div class="cart-content">
        <span id="close-video-modal" onclick=closeCartByX() class="close">&times;</span>
        <div class="container">
        <div class="row">
          <h3>My Cart</h3>
          </div>
        <div class="row">
        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Food Item</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
        ${myItems}
        </tbody>
      </table>
        <br>
          </div>
          <div class="row">
           <div class="col-8"
            <div class="cartTotal">
            <h4 id="cartAmountTotal">Total = $${cartAmountTotal}</h4> 
           </div>
            ${removeAllButton}
      </div>`;

  navBar.insertBefore(cart, parent) //inserts card modal
  e.preventDefault();

}

function closeCartByX() {
  document.querySelector('.cart').remove();
  document.body.style.overflow = 'scroll';
  cartAmountTotal = 0;
}

// Removes items from cart modal
function removeItem(event) {

  let item = event.target.parentElement.parentElement;
  let itemName = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
  let itemQuantity = event.target.parentElement.previousElementSibling;

  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name == itemName) {
      if (cartItems[i].quantity > 1) {
        cartItems[i].quantity--; // removes 1 from quantity in object
        itemQuantity.innerHTML = cartItems[i].quantity; // remove 1 from quantity in UI
      }
      else {
        cartItems.splice(i, 1); // deletes item(object) from cart array
        item.remove();// deletes item(<td>) from cart UI
      }
    }
  }
  cartNumber--; // decrements cart number of items

  if (cartNumber == 0) {
    document.querySelector('#removeAllButton').remove();
  }
  cartItemsNumber.innerHTML = cartNumber;
}

// Removes all items from cart is Remove all button is displayed
function removeAllCartItems(event) {
  const cartItemTd = document.querySelectorAll('.cart-td-content');

  cartItems = [];
  cartNumber = cartItems.length;
  cartItemsNumber.innerHTML = cartNumber;


  cartItemTd.forEach(TdItem => {
    TdItem.remove();   // removes all cart items(<tr>)
  });

  document.querySelector('#removeAllButton').remove();
}