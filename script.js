/*=========================================
  GOD'S GOODNESS VENTURE
  Premium Website JavaScript
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      LOADER
    =========================================*/

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

        }, 1200);

    });

    /*=========================================
      SCROLL PROGRESS BAR
    =========================================*/

    const progressBar = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {

        const scrollTop =
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / scrollHeight) * 100;

        progressBar.style.width =
            progress + "%";

    });

    /*=========================================
      MOBILE MENU
    =========================================*/

    const hamburger =
        document.querySelector(".hamburger");

    const navLinks =
        document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        hamburger.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");
                hamburger.classList.remove("active");

            });

        });

    /*=========================================
      NAVBAR SCROLL EFFECT
    =========================================*/

    const header =
        document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background =
                "rgba(0,0,0,.92)";

            header.style.padding =
                "0";

        }

        else {

            header.style.background =
                "rgba(0,0,0,.45)";

        }

    });

});
/*=========================================
  REVIEW FORM
=========================================*/

const reviewForm = document.getElementById("reviewForm");

const reviewContainer =
document.querySelector(".review-container");

reviewForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    document.getElementById("name").value.trim();

    const rating =
    document.getElementById("rating").value;

    const message =
    document.getElementById("message").value.trim();

    if(name === "" || message === ""){

        alert("Please complete the review form.");

        return;

    }

    const reviewCard =
    document.createElement("div");

    reviewCard.className = "review-card";

    reviewCard.innerHTML = `

        <div class="stars">

            ${rating}

        </div>

        <p>

            "${message}"

        </p>

        <h4>

            - ${name}

        </h4>

    `;

    reviewContainer.prepend(reviewCard);

    reviewForm.reset();

    alert("Thank you for your review!");

});

/*=========================================
  GALLERY LIGHTBOX
=========================================*/

const galleryImages =
document.querySelectorAll(".gallery-grid img");

const lightbox =
document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML =

`<span id="close-lightbox">&times;</span>

<img id="lightbox-img">`;

document.body.appendChild(lightbox);

const lightboxImg =
document.getElementById("lightbox-img");

galleryImages.forEach(image=>{

    image.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImg.src=image.src;

    });

});

document.getElementById("close-lightbox")

.addEventListener("click",()=>{

    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});

/*=========================================
  SCROLL REVEAL
=========================================*/

const revealElements =
document.querySelectorAll(

".about,.products,.gallery,.reviews,.contact"

);

const revealSection = ()=>{

    revealElements.forEach(section=>{

        const top =

        section.getBoundingClientRect().top;

        if(top < window.innerHeight-120){

            section.classList.add("show");

        }

    });

};

window.addEventListener("scroll",revealSection);

revealSection();

/*=========================================
  SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

anchor.addEventListener("click",

function(e){

e.preventDefault();

document.querySelector(

this.getAttribute("href")

).scrollIntoView({

behavior:"smooth"

});

});

});
/*=========================================
  ACTIVE NAVIGATION LINK
=========================================*/

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/*=========================================
  BUTTON HOVER EFFECT
=========================================*/

const buttons = document.querySelectorAll(
".primary-btn,.secondary-btn,.nav-btn"
);

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-6px) scale(1.03)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0) scale(1)";

    });

});


/*=========================================
  GALLERY IMAGE HOVER ANIMATION
=========================================*/

document.querySelectorAll(".gallery-grid img")

.forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.filter = "brightness(1.1)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.filter = "brightness(1)";

    });

});


/*=========================================
  PRODUCT CARD ANIMATION
=========================================*/

const productCards =
document.querySelectorAll(".product-card");

productCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.transform =
            `perspective(1000px)
             rotateY(${(x - rect.width / 2) / 30}deg)
             rotateX(${-(y - rect.height / 2) / 30}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/*=========================================
  FLOATING WHATSAPP PULSE
=========================================*/

const whatsapp =
document.querySelector(".floating-whatsapp");

setInterval(() => {

    whatsapp.classList.add("pulse");

    setTimeout(() => {

        whatsapp.classList.remove("pulse");

    }, 1000);

}, 3500);


/*=========================================
  CURRENT YEAR
=========================================*/

const year = new Date().getFullYear();

const copyright =
document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${year} God's Goodness Venture. All Rights Reserved.`;

}


/*=========================================
  END OF SCRIPT
=========================================*/
