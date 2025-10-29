const slides = [
	{image: "slide1.jpg", tagLine: "Impressions tous formats <span>en boutique et en ligne</span>"},
	{image: "slide2.jpg", tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>"},
	{image: "slide3.jpg", tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>"},
	{image: "slide4.png", tagLine: "Autocollants <span>avec découpe laser sur mesure</span>"}
];

const arrowLeft = document.getElementById("arrow_left");
const arrowRight = document.getElementById("arrow_right");
const bannerImg = document.querySelector(".banner-img");
const bannerText = document.querySelector("#banner p");
const dotsContainer = document.querySelector(".dots");

/* points */
for (let i = 0; i < slides.length; i++) {
	const dot = document.createElement("div");
	dot.classList.add("dot");
	if (i === 0) {
		dot.classList.add("dot_selected"); 
	}
	dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

/* Flèche droite */
arrowRight.addEventListener("click", function () {
	console.log("J'ai cliqué sur la flèche droite");
  	currentIndex = currentIndex + 1;
	if (currentIndex >= slides.length) {
    	currentIndex = 0;
  	}

for (let i = 0; i < dots.length; i++) {
	dots[i].classList.remove("dot_selected");
}

dots[currentIndex].classList.add("dot_selected");
bannerImg.src = "./assets/images/slideshow/" + slides[currentIndex].image;
bannerText.innerHTML = slides[currentIndex].tagLine;
});

/* Flèche gauche */
arrowLeft.addEventListener("click", function () {
	console.log("J'ai cliqué sur la flèche gauche");
	currentIndex = currentIndex - 1;

	if (currentIndex < 0) {
    	currentIndex = slides.length - 1;
  	}
  	for (let i = 0; i < dots.length; i++) {
    	dots[i].classList.remove("dot_selected");
  	}
	dots[currentIndex].classList.add("dot_selected");
	bannerImg.src = "./assets/images/slideshow/" + slides[currentIndex].image;
	bannerText.innerHTML = slides[currentIndex].tagLine;
});
