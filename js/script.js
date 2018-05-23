// Variables

const navBar = document.querySelector(".navigationBar-section");  // navbar

const navLink = document.querySelectorAll('.nav-link'); // navbar links

const navBarUl = document.querySelector('.navbar-collapse'); // navbar when responsive

const sticky = navBar.offsetTop; // sticky navbar

const modalCloseX = document.querySelector('#close-video-modal'); // video modal X button

const videoModalBtn = document.querySelector('#video-modal'); // video play button

const videoModal = document.querySelector('.modal'); // video modal

const foodVideo = document.querySelector('.food-video');// video


// Window functions
window.onscroll = function() {stickyNavbar()};
window.onclick = function(){closeModal()};


// Event listeners 
modalCloseX.addEventListener('click', closeModalByX);
videoModalBtn.addEventListener('click', openVidoeModal);


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
// open modals
function openVidoeModal() {  
  videoModal.style.display = "block";
}

// closes modal by clicking outside video-modal
function closeModal() {
  if (event.target == videoModal) {
    videoModal.style.display = "none";
    foodVideo.pause();
  }
}

// closes video modal by click on the X
function closeModalByX() {
    videoModal.style.display = "none";
    foodVideo.pause();
}

