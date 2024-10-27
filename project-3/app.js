window.addEventListener("scroll", function() {
  const header = document.getElementById("header");
  
  if (window.scrollY > 50) { // Скрол більше 50px
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
