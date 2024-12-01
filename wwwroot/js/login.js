const URL = "http://localhost:4000/MCSPROJECT";
function isLoginPage() {
  return window.location.pathname.includes("login");
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      console.log(JSON.stringify(data));

      const response = await validateLoginForm();

      if (response.success) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        const usuario = JSON.parse(sessionStorage.getItem("user"));
        const role = usuario.role;
        sessionStorage.setItem("role", role);

        showSuccessAlert("Successful login");

        window.location.replace("/candidatos_catalog");
      } else {
        showErrorAlert("Invalid credentials");
      }
    });
  });

  if (!isLoginPage()) {
    $.blockUI({ css: { backgroundColor: "#888", color: "#fff" } });

    const usuario = JSON.parse(sessionStorage.getItem("user"));

    if (!usuario) {
      window.location.replace("login");
    } else {
      $.unblockUI();
    }
  }
});

async function validateLoginForm() {
  const form = document.forms["loginForm"];
  const name = form["name"].value.trim();
  const password = form["password"].value.trim();

  validateFields(name, password);

  const response = await loginUser(name, password);
  return response;
}

const loginUser = async (name, password) => {
  const response = await $.ajax({
    url: `${URL}/login`,
    type: "POST",
    data: { name, password },
    dataType: "json",
  });
  console.log(response);
  return response;
};

function validateFields(name, password) {
  if (name === "") {
    showErrorAlert("Name is required");
    return false;
  }
  if (password === "") {
    showErrorAlert("Password is required");
    return false;
  }
  return true;
}

function showErrorAlert(message) {
  iziToast.error({
    title: "Error",
    message: message,
    position: "topRight",
  });
}

function showSuccessAlert(message) {
  iziToast.success({
    title: "Success",
    message: message,
    position: "topRight",
  });
}
