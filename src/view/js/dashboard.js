// Other important pens.
// Map: https://codepen.io/themustafaomar/pen/ZEGJeZq
// Navbar: https://codepen.io/themustafaomar/pen/VKbQyZ

//https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.jsx    
//https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.jshttps://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js

//sair da conta
document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "/login";
});