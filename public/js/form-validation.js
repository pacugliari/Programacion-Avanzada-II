// form-validation.js

// Validación Bootstrap
(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          if (window.closeSpinner) window.closeSpinner();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("category_id");
  const temporadasInput = document.getElementById("cantidadTemporadas");

  function updateTemporadasInput() {
    const selectedOption = categorySelect.options[categorySelect.selectedIndex];
    const categoria = selectedOption.textContent.trim().toLowerCase();

    if (categoria === "serie") {
      temporadasInput.disabled = false;
      temporadasInput.required = true;
    } else {
      temporadasInput.disabled = true;
      temporadasInput.required = false;
      temporadasInput.value = "";
    }
  }

  updateTemporadasInput();

  categorySelect.addEventListener("change", updateTemporadasInput);
});

document.addEventListener("DOMContentLoaded", function () {
  const posterInput = document.getElementById("poster");
  const posterPreview = document.getElementById("posterPreview");
  const defaultPosterSrc =
    "https://res.cloudinary.com/doypmjt76/image/upload/v1748286735/image-default_lkeqa2.png";

  posterInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImageTypes.includes(fileType)) {
        posterPreview.src = defaultPosterSrc;
        posterInput.value = "";
        if (window.Swal) {
          Swal.fire({
            icon: "error",
            title: "Archivo no válido",
            text: "Por favor, selecciona un archivo de imagen (JPG, PNG, GIF).",
          });
        } else {
          alert("Archivo no válido. Por favor, selecciona un archivo de imagen (JPG, PNG, GIF).");
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        posterPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      posterPreview.src = defaultPosterSrc;
    }
  });
});
