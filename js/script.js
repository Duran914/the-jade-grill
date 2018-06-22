/******************************************
Window functions
*******************************************/

  //sticky navbar
window.onscroll = function(){stickyNavbar()};

  //closes form modals
window.onclick = function()
    { 
      closeModal(), 
      closeFormModal(),
      closeCart()
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

  setTimeout(() => {
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
              <form onsubmit=submitEmpForm(event)>
                   <div class="form-group">
                        <label for="first-name">First Name*</label><span class="err fname"></span>
                        <input type="text" class="form-control" id="first-name" onkeyup=checkFirstName(event) placeholder="First name">
                      </div>
                      <div class="form-group">
                        <label for="last-name">Last Name*</label><span class="err lname"></span>
                        <input type="text" class="form-control" id="last-name" onkeyup=checkLastName(event) placeholder="Last name">
                      </div>
                      <div class="form-group">
                              <label for="category">Category*</label><span class="err select"></span>
                              <select class="form-control" id="jobCategorySelect">
                                <option value="Choose a Category">Choose a Category</option>
                                <option value="Accounting">Accounting</option>
                                <option value="Hospitality">Hospitality</option>
                                <option value="IT">Information Technology</option>
                                <option value="Marketing">Marketing</option>
                                <option HR>Human Resources</option>
                              </select>
                            </div>
                            <div class="form-group">
                                  <label for="upload">Upload a Resume*</label><span class="err fileUpload"></span>
                                  <input type="file" class="form-control-file" id="file-upload">
                           </div>
                           <div class="form-group">
                                  <label for="cover-letter">Cover Letter</label><span class="err coverLetter"></span>
                                  <textarea class="form-control message-field" id="cover-letter" onkeyup=checkCoverLetter() rows="5"></textarea>
                                </div>
                      <input type="submit" class="btn applyFormBtn" value="Submit">
                    </form>
              </div>`;
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

// adds food item object to array function
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
      cartItems[i].quantity += 1; // increases quantity becuase the same item is present in cart
    }
  }
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

  // displays check-out and remove all buttons if cart contains 1 or more items
  if (cartItems.length != 0) {
    removeAllButton = `
      <div class="row">
      <div class="col-6">
      <div class="checkOut">
      <button id="checkOutBtn" class="btn cartButton greenBtn" onclick=submitOrder()>Check Out</button>
     </div>
    </div>
    <div class="col-6">
    <div class="removeAll">                                                      
    <button id="removeAllBtn" class="btn cartButton yellowBtn" onclick=removeAllCartItems()>Clear Cart</button>
  </div>
  </div>
    </div>`;
  }

  cart.innerHTML = `<div class="cart-content">
        <span id="close-video-modal" onclick=closeCartByX() class="close">&times;</span>
        <div id="cartContainer" class="container">
        <div class="row">
          <h3>My Cart</h3>
          </div>
        <div class="row">
        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Item</th>
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
            <h4>Total = $<span id="cartTotalValue">${cartAmountTotal}</span>.00</h4> 
            </div>
           </div>
            ${removeAllButton}`;

  navBar.insertBefore(cart, parent) //inserts card modal
  e.preventDefault();
}

function closeCartByX() {
  document.querySelector('.cart').remove();
  document.body.style.overflow = 'scroll';
  cartAmountTotal = 0; //empty cart object
}

function closeCart() {
  if (event.target == document.querySelector('.cart')) {
    document.querySelector('.cart').remove()
    document.body.style.overflow = 'scroll';
    cartAmountTotal = 0; //empty cart object
  }
}

// Removes items from cart modal
function removeItem(event) {
  
  let item = event.target.parentElement.parentElement;
  let itemName = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
  let itemQuantity = event.target.parentElement.previousElementSibling;

  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name == itemName) {
      cartAmountTotal -= cartItems[i].price; // subtracts item price from cart total
       document.querySelector('#cartTotalValue').innerHTML = cartAmountTotal; // updates cart UI

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
    clearCart();
  }
  cartItemsNumber.innerHTML = cartNumber;
}

// Removes all items from cart is Remove all button is displayed
function removeAllCartItems() {
  const cartItemTd = document.querySelectorAll('.cart-td-content');

  cartItems = [];
  cartNumber = cartItems.length;
  cartItemsNumber.innerHTML = cartNumber;
  cartAmountTotal = 0;
  document.querySelector('#cartTotalValue').innerHTML = cartAmountTotal;

  cartItemTd.forEach(TdItem => {
    TdItem.remove();   // removes all cart items(<tr>)
  });
  clearCart();
}

// removes cart buttons 
clearCart = () => {
  document.querySelectorAll('.btn.cartButton').forEach(btn => {
    btn.remove();
  });
}

// displays order submmited on cart
function submitOrder(){
  document.querySelector('#cartContainer').innerHTML = `<div class="row">
    <div class="col-12 text-center">
    <h2>Thank You!</h2>
    <i class="far fa-check-circle"></i>
    <h3>Your Order Has Been Placed</h3>
    </div>
  </div>`;
  removeAllCartItems(); // clears cart
}


/******************************************
Regular expressions
*******************************************/

function checkFirstName(){

  const RegEx = /^[a-zA-Z- ]{2,25}$/;
  const fnameErr = document.querySelector('.err.fname');
  const firstName = document.querySelector('#first-name');

  if (!RegEx.test(firstName.value)) {
      firstName.classList.add('is-invalid');
      firstName.style.border = '2px solid #af2d2d';
      fnameErr.innerHTML = 'Please enter your first name';
      fnameErr.style.color = '#af2d2d';
  } else {
      firstName.classList.remove('is-invalid');
      firstName.style.border = '';
      fnameErr.innerHTML = '';
  } 
}

function checkLastName(){

  const RegEx = /^[a-zA-Z- ]{2,25}$/;
  const lnameErr = document.querySelector('.err.lname');
  const lastName = document.querySelector('#last-name');

  if (!RegEx.test(lastName.value)) {
      lastName.classList.add('is-invalid');
      lastName.style.border = '2px solid #af2d2d';
      lnameErr.innerHTML = 'Please enter your last name';
      lnameErr.style.color = '#af2d2d';
  } else {
      lastName.classList.remove('is-invalid');
      lastName.style.border = '';
      lnameErr.innerHTML = '';
  } 
}

function checkCoverLetter(){

  const RegEx = /^[a-zA-Z0-9\.\,\$\-?!' ]{0,250}$/;
  const coverLetterErr = document.querySelector('.err.coverLetter')
  const coverLetter = document.querySelector('#cover-letter');

  if (!RegEx.test(coverLetter.value)) {
      coverLetter.classList.add('is-invalid');
      coverLetter.style.border = '2px solid #ff5050';
      coverLetterErr.innerHTML = 'Only letters, numbers and punctuation.';
      coverLetterErr.style.color = '#af2d2d';
      }
     else {
      coverLetter.classList.remove('is-invalid');
      coverLetter.style.border = '';
      coverLetterErr.innerHTML = '';
  }
}

function submitEmpForm(event){
  const fileInputErr = document.querySelector('.err.fileUpload');
  const selectInputErr = document.querySelector('.err.select');

  if(document.querySelector('#file-upload').value == ''){
    fileInputErr.innerHTML = 'Please upload a file';
    fileInputErr.style.color = "#af2d2d";

  }

  if (document.querySelector('#jobCategorySelect').value == 'Choose a Category') {
    selectInputErr.innerHTML = 'Please select a category';
    selectInputErr.style.color = "#af2d2d";
  }

  event.preventDefault();
}