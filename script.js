const API = "https://nova88-backend.onrender.com/api";

let games = [];
let modalMode = "login";

const grid = document.getElementById("gameGrid");

function render(filter = "all") {
  const filtered = games.filter(
    game => filter === "all" || game.category === filter
  );

  if (!filtered.length) {
    grid.innerHTML = "<p>No games available.</p>";
    return;
  }

  grid.innerHTML = filtered.map(game => `
    <article class="game">
      <div class="game-art">${game.icon || "🎮"}</div>

      <div class="game-info">
        <h3>${game.name}</h3>
        <p>${game.description || ""}</p>
        <span class="tag">${game.category}</span>
      </div>
    </article>
  `).join("");
}


async function loadGames() {
  try {
    const response = await fetch(`${API}/games`);

    if (!response.ok) {
      throw new Error("Failed to load games");
    }

    games = await response.json();
    render();

  } catch (error) {
    grid.innerHTML = "<p>Unable to load games.</p>";
  }
}

loadGames();


/* GAME FILTER */

document.querySelectorAll(".filter").forEach(button => {

  button.onclick = () => {

    document
      .querySelectorAll(".filter")
      .forEach(item => item.classList.remove("active"));

    button.classList.add("active");

    render(button.dataset.filter);
  };

});


/* MODAL */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const form = document.getElementById("demoForm");
const formMsg = document.getElementById("formMsg");


document.querySelectorAll("[data-modal]").forEach(button => {

  button.onclick = () => {

    modalMode = button.dataset.modal;

    modalTitle.textContent =
      modalMode === "login"
        ? "Login"
        : "Create Account";

    modalSubtitle.textContent =
      modalMode === "login"
        ? "Login to continue to your account."
        : "Create your account to get started.";

    formMsg.textContent = "";
    formMsg.className = "form-msg";


    const inputs = form.querySelectorAll("input");

    const nameInput = inputs[0];
    const emailInput = inputs[1];
    const passwordInput = inputs[2];


    if (modalMode === "login") {

      nameInput.style.display = "none";
      nameInput.required = false;

      emailInput.style.display = "";
      passwordInput.style.display = "";

    } else {

      nameInput.style.display = "";
      nameInput.required = true;

      emailInput.style.display = "";
      passwordInput.style.display = "";

    }


    modal.classList.add("open");
  };

});


/* CLOSE MODAL */

document.getElementById("close").onclick = () => {
  modal.classList.remove("open");
};


modal.onclick = event => {

  if (event.target === modal) {
    modal.classList.remove("open");
  }

};


/* LOGIN / REGISTER */

form.onsubmit = async event => {

  event.preventDefault();


  const inputs = form.querySelectorAll("input");

  const name = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const password = inputs[2].value;


  formMsg.textContent = "Please wait...";
  formMsg.className = "form-msg";


  try {

    let response;


    /* REGISTER */

    if (modalMode === "register") {

      response = await fetch(`${API}/auth/register`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password
        })

      });

    }


    /* LOGIN */

    else {

      response = await fetch(`${API}/auth/login`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })

      });

    }


    const data = await response.json();


    if (!response.ok) {
      throw new Error(
        data.error || "Something went wrong"
      );
    }


    /* LOGIN SUCCESS */

    if (modalMode === "login") {

      localStorage.setItem(
        "nova88_token",
        data.token
      );

      formMsg.textContent = "Login successful!";

      formMsg.className = "form-msg success";

      setTimeout(() => {

        window.location.href = "dashboard.html";

      }, 700);

      return;
    }


    /* REGISTER SUCCESS */

    formMsg.textContent =
      "Account created successfully!";

    formMsg.className = "form-msg success";


    form.reset();


    /*
      If backend returns a token after registration,
      save it automatically.
    */

    if (data.token) {

      localStorage.setItem(
        "nova88_token",
        data.token
      );

      setTimeout(() => {

        window.location.href = "dashboard.html";

      }, 700);

    } else {

      /*
        If registration doesn't return a token,
        send user to login after successful registration.
      */

      setTimeout(() => {

        modalMode = "login";

        modalTitle.textContent = "Login";

        modalSubtitle.textContent =
          "Account created. Please login to continue.";

        const inputs = form.querySelectorAll("input");

        inputs[0].style.display = "none";
        inputs[0].required = false;

        formMsg.textContent =
          "Account created successfully. Please login.";

      }, 1000);

    }


  } catch (error) {

    formMsg.textContent =
      error.message || "Something went wrong.";

    formMsg.className = "form-msg error";

  }

};


/* MOBILE MENU */

document.getElementById("menuBtn").onclick = () => {

  const nav = document.getElementById("nav");

  nav.style.display =
    nav.style.display === "flex"
      ? "none"
      : "flex";

  nav.style.position = "absolute";
  nav.style.top = "76px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.padding = "20px";
  nav.style.background = "#0b0d12";
  nav.style.flexDirection = "column";

};
