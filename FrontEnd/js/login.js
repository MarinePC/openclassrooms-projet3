// Récupération des données //

const form = document.querySelector("#login form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

const email = document.querySelector("#email").value;
const password = document.querySelector("#password").value;

// incomplet = message erreur //
if (!email || !password) {
  afficherMessageErreur("Veuillez les champs démandés.");
  return;
}

    // Vers API //
try {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
        } else {
        afficherMessageErreur("E-mail ou mot de passe incorrect.");
        }
        } catch (error) {
            afficherMessageErreur("Impossible de se connecter au serveur.");
            console.error("Erreur détectée :", error);
        }
});


function afficherMessageErreur(message) {
  let errorDiv = document.querySelector("#login-error");

  if (!errorDiv) {
    errorDiv = document.createElement("p");
    errorDiv.id = "login-error";
    errorDiv.style.color = "red";
    errorDiv.style.textAlign = "center";
    errorDiv.style.marginTop = "10px";
    document.querySelector("#login").appendChild(errorDiv);
  }

  errorDiv.textContent = message;
}