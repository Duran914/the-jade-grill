// Variables

const navBar = document.querySelector(".navigationBar-section");  // navbar

const navLink = document.querySelectorAll('.nav-link'); // navbar links

const navBarUl = document.querySelector('.navbar-collapse'); // navbar when responsive

const sticky = navBar.offsetTop; // sticky navbar

const modalCloseX = document.querySelector('#close-video-modal'); // video modal X button

const videoModalBtn = document.querySelector('#video-modal'); // video play button

const cartItemsNumber = document.querySelector('#numberOfItems'); // cart number

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
let cartNumber = 0;
menuItem.forEach(item => {
  item.addEventListener('click', addMenuItem)
});

function addMenuItem(e) {
  // gets food name
  const foodName = e.target.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
   let alert = document.createElement('span');
    // let navbar = document.querySelector('.navigationBar-section');
     let parant = navBar.firstChild;
    
    alert.className = 'added-item-banner';
    alert.innerHTML = `${foodName} added to cart!`;
    navBar.appendChild(alert, parant);
    
    setTimeout( function(){
      alert.remove();
    }, 2000)

    cartNumber++;
    cartItemsNumber.innerHTML = cartNumber;

    addToCart(foodName);
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

cartNavLink.addEventListener('click', openCart);
let cartItems = new Array();
function addToCart(foodName) {
  cartItems.push(foodName)
}

function openCart(e) {
  console.log(cartItems);
    const cart = document.createElement('div');
    cart.className = 'cart';
    let parent = navBar.firstChild;
    document.body.style.overflow = 'hidden';
  
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
          <tr>
            <th scope="row"></th>
            <td>$12</td>
            <td>1</td>
          </tr>
          <tr>
            <th scope="row">Rockfish</th>
            <td>$24</td>
            <td>1</td>
          </tr>
          <tr>
            <th scope="row">Halibut</th>
            <td>$27</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
          </div>
          <div class="row">
            <div class="cartTotal">
            <h4>Total = $23.00</h4>
          </div>
      </div>`;
  
      navBar.insertBefore(cart, parent)

  e.preventDefault();
}


function closeCartByX() {
  document.querySelector('.cart').remove();
  document.body.style.overflow = 'scroll';
}