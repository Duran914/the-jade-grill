// Variables

const navBar = document.querySelector(".navigationBar-section");  // navbar

const navLink = document.querySelectorAll('.nav-link'); // navbar links

const navBarUl = document.querySelector('.navbar-collapse'); // navbar when responsive

const sticky = navBar.offsetTop; // sticky navbar

const modalCloseX = document.querySelector('#close-video-modal'); // video modal X button

const videoModalBtn = document.querySelector('#video-modal'); // video play button

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

menuItem.forEach(item => {
  item.addEventListener('click', addMenuItem)
});

function addMenuItem(e) {
  // gets food name
  let foodName = e.target.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
   let alert = document.createElement('span');
    let navbar = document.querySelector('.navigationBar-section');
     let parant = navbar.firstChild;
    
    alert.className = 'added-item-banner';
    alert.innerHTML = `${foodName} added to cart!`;
    navbar.appendChild(alert, parant);
    
    setTimeout( function(){
      alert.remove();
    }, 2000)
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