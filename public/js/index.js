import { showFlashMessages } from "./utils.js";

let selectedMovieId = null;

// Funciones reutilizables
function enableActionButtons(enabled) {
  document.getElementById("btnModify").disabled = !enabled;
  document.getElementById("btnDelete").disabled = !enabled;
}

function handleCardClick(card) {
  document
    .querySelectorAll(".movie-card")
    .forEach((c) => c.classList.remove("selected-card"));

  card.classList.add("selected-card");
  selectedMovieId = card.dataset.movieId;
  enableActionButtons(true);
}

function attachEventListeners() {
  const btnModify = document.getElementById("btnModify");
  const btnDelete = document.getElementById("btnDelete");
  const btnCreate = document.getElementById("btnCreate");

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
