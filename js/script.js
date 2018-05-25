// Variables

const navBar = document.querySelector(".navigationBar-section");  // navbar

const navLink = document.querySelectorAll('.nav-link'); // navbar links

const navBarUl = document.querySelector('.navbar-collapse'); // navbar when responsive

const sticky = navBar.offsetTop; // sticky navbar

const modalCloseX = document.querySelector('#close-video-modal'); // video modal X button

const videoModalBtn = document.querySelector('#video-modal'); // video play button

const videoModal = document.querySelector('.modal'); // video modal

// const foodVideo = document.querySelector('.food-video');// video


// Window functions
window.onscroll = function(){stickyNavbar()};

window.onclick = function()
    { 
      closeModal(), 
      closeFormModal() 
    };


// Event listeners 

// modalCloseX.addEventListener('click', closeModalByX);
videoModalBtn.addEventListener('click', openVideoModal);


// Create sticky navbar when reaches navigation bar
function stickyNavbar() {
  if (window.pageYOffset >= sticky || window.pageYOffset > sticky) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
}

// Closes navbar when line is click
navLink.forEach(link => {
  link.addEventListener("click", () =>{
      navBarUl.classList.remove('show');
  }); 
});


// Smooth scrolling function
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

// open video modal
function openVideoModal() {  
  videoModal.style.display = "block";
  videoModal.innerHTML = `
  <div class="video-modal-content">
  <span id="close-video-modal" onclick=closeModalByX() class="close">&times;</span>
  <video class="food-video" src="assets/videos/food-video.mp4" controls></video>
</div>`;
  
}

// closes modal by clicking outside video-modal
function closeModal() {
  if (event.target == videoModal) {
    const foodVideo = document.querySelector('.food-video');
    videoModal.style.display = "none";
    foodVideo.pause();
  }
}

// closes video modal by click on the X
function closeModalByX() {
  const foodVideo = document.querySelector('.food-video');
    videoModal.style.display = "none";
    foodVideo.pause();
}

const menuItem = document.querySelector('#menu-item');

menuItem.addEventListener('click', addMenuItem)

function addMenuItem() {
    let alert = document.createElement('span');
    alert.innerHTML = "Item added";
    let test = document.querySelector('.breakfest');
    let parant = test.firstChild;
    test.insertBefore(alert, parant)
}



const applyBtn = document.querySelector('#joinUsBtn');

const applyModal = document.querySelector('.modal-form');

const closeFormModalEvent = document.querySelector('#close-form-modal');

// closeFormModalEvent.addEventListener('click', closeFormModalByX)
applyBtn.addEventListener('click', applyWithUs);

// opens modal

function applyWithUs(){
   applyModal.style.display = "block";
  // let form = document.createElement('div');
  applyModal.innerHTML = `<div class="form-modal-content">
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
}
//closes modal by X
function closeFormModalByX() {
  applyModal.style.display = "none";
  // applyModal.remove();
}
//closes modal by click outside modal
function closeFormModal() {
  if (event.target == applyModal) {
    applyModal.style.display = "none";
  }
}