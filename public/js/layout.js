window.showSpinner = function () {
  Swal.fire({
    title: "Cargando...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });
};

window.closeSpinner = function () {
  setTimeout(() => {
    Swal.close();
  }, 100);
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form:not(.no-spinner)").forEach((form) => {
    form.addEventListener("submit", (e) => {
      window.showSpinner();
    });
  });
});
