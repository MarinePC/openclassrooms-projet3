// ajout api //
async function apiWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

// Afficher la galerie //
function galleryWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}


// Ajout des catégories //
function getCategories(works) {
    const categories = new Set();
    works.forEach((work) => {
        categories.add(work.category.name);
    });
 return Array.from(categories);
}

async function main(){
    try {
        const works = await apiWorks();
        console.log(works);
        galleryWorks(works); 

        const categories = getCategories(works);
        generateCategoryMenu(categories, works);
    } catch (error) {
    console.error("Une erreur c'est produite.", error);
  }
}
main();

// Menu dynamique //
  function generateCategoryMenu(categories, works) {
  const menuContainer = document.querySelector("#menu-categories"); // La boîte vide où on mettra les boutons

    // Bouton "tous" //
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.addEventListener("click", () => {
        galleryWorks(works);
    });
    menuContainer.appendChild(allButton);

    // Boutons par categorie //
    categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.addEventListener("click", () => {
        filterWorksByCategory(category, works);
    });
    menuContainer.appendChild(button);
    });
  }
