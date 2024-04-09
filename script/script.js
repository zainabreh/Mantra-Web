let hamicon = document.querySelector('.hamburger');
let navLinks = document.querySelector('.nav_links');

hamicon.addEventListener('click',()=>{
    navLinks.classList.toggle('active');
})