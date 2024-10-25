function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    scrollToElement('.header');
});

link2.addEventListener('click', () => {
    // Scroll to the second element with "header" class
    scrollToElement('.header', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.column');
});

document.getElementById('btn-login').addEventListener('click', () => {
    window.location.href = '/login';
});


const myObserver = new IntersectionObserver((entries) => {
    
    entries.forEach((entry) => {
     if(entry.isIntersecting){
         entry.target.classList.add('show')
     } else {
         entry.target.classList.remove('show')
     }
    })
 })
 
 const elements = document.querySelectorAll('.container')
 
 
 elements.forEach((element) => myObserver.observe(element))