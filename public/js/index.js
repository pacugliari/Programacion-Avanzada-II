import { showFlashMessages } from "./utils.js";

let selectedMovieId = null;

// Funciones reutilizables
function enableActionButtons(enabled) {
  document.getElementById("btnModify").disabled = !enabled;
  document.getElementById("btnDelete").disabled = !enabled;
  const btnBlock = document.getElementById("btnBlock");
  if (btnBlock) {
    btnBlock.disabled = !enabled;
  }
}

function handleCardClick(card) {
  document
    .querySelectorAll(".movie-card")
    .forEach((c) => c.classList.remove("selected-card"));
  card.classList.add("selected-card");
  selectedMovieId = card.dataset.movieId;
  enableActionButtons(true);

  const blocked =
    card.dataset.blocked === "true" || card.dataset.blocked === "1";

  const btnBlock = document.getElementById("btnBlock");
  if (btnBlock) {
    if (blocked) {
      btnBlock.innerHTML = `<span class="material-icons">lock_open</span> Desbloquear`;
    } else {
      btnBlock.innerHTML = `<span class="material-icons">lock</span> Bloquear`;
    }
  }
}

function attachEventListeners() {
  const btnModify = document.getElementById("btnModify");
  const btnDelete = document.getElementById("btnDelete");
  const btnCreate = document.getElementById("btnCreate");
  const btnBlock = document.getElementById("btnBlock");

  document.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation();
      handleCardClick(card);
    });

    card.addEventListener("dblclick", () => {
      window.showSpinner();
      window.location.href = `/movies/${card.dataset.movieId}`;
    });
  });

  btnModify.addEventListener("click", () => {
    if (!selectedMovieId) return;
    window.showSpinner();
    window.location.href = `/movies/edit/${selectedMovieId}`;
  });

  if (btnBlock) {
    btnBlock.addEventListener("click", () => {
      if (!selectedMovieId) return;
      window.showSpinner();
      window.location.href = `/movies/block/${selectedMovieId}`;
    });
  }

  btnDelete.addEventListener("click", () => {
    if (!selectedMovieId) return;

    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar esta película?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.showSpinner();
        window.location.href = `/movies/delete/${selectedMovieId}`;
      }
    });
  });

  btnCreate.addEventListener("click", () => {
    window.showSpinner();
    window.location.href = `/movies/create`;
  });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  enableActionButtons(false);
  attachEventListeners();
  showFlashMessages("/movies");
});
