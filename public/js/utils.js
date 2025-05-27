export function showFlashMessages(path) {
  if (flashMessages.successMessage) {
    Swal.fire({
      icon: "success",
      title: "¡Éxito!",
      text: flashMessages.successMessage,
      confirmButtonText: "Aceptar",
    }).then(() => {
      window.location.href = path;
    });
  }

  if (flashMessages.errorMessage && flashMessages.errorCode) {
    Swal.fire({
      icon: "error",
      title: `Error: ${flashMessages.errorCode}`,
      html: flashMessages.errorMessage,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#d33",
    }).then(() => {
      window.location.href = path;
    });
  }
}