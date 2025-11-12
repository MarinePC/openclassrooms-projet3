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

// fenetre gallery modale
function WorksModal(works) {
  const modalGallery = document.querySelector(".modal-gallery");
  if (!modalGallery) return;

  modalGallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    // bouton poubelle
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("modal-trash");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    figure.appendChild(img);
    figure.appendChild(deleteButton);
    modalGallery.appendChild(figure);
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

function filterWorksbyCategory(category, works) {
  console.log("Catégorie sélectionnée:", category);
  const filteredWorks = works.filter(
    (work) => work.category.name === category
  );
  console.log("Travaux filtrés:", filteredWorks);
  galleryWorks(filteredWorks);
}

// Menu dynamique //
function generateCategoryMenu(categories, works) {
  const menuContainer = document.querySelector("#menu-categories");

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

async function main() {
  try {
    const works = await apiWorks();
    console.log(works);
    galleryWorks(works);
    const categories = getCategories(works);
    generateCategoryMenu(categories, works);
    WorksModal(works);
  } catch (error) {
    console.error("Une erreur s'est produite.", error);
  }
}
main();

// login ok
const token = localStorage.getItem("token");

if (token) {

// Page edit

  // bannière edit //
  const banner = document.querySelector(".edit-banner");
  banner.style.display = "flex";

  // Cacher les catégories
  const menuCategories = document.querySelector("#menu-categories");
  if (menuCategories) {
    menuCategories.style.display = "none";
  }

  // login vers logout
  const loginLink = document.querySelector('a[href="login.html"]');
  if (loginLink) {
    loginLink.textContent = "logout";
    loginLink.href = "#";

    loginLink.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  }

  // bouton modifier
  const editButton = document.querySelector(".edit-projects");
  if (editButton) {
    editButton.style.display = "flex";
    editButton.addEventListener("click", () => {
      const modal = document.querySelector("#modal");
      if (modal) {
        modal.classList.add("active");
      }
    });
  }
}

// Fermer la modale //
const modal = document.querySelector("#modal");
if (modal) {
  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }
}
