const URL = "http://localhost:4000/proyectoMCS";

// Función para saber si el usuario está en la página de login
function isLoginPage() {
  return window.location.pathname.includes("login");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      console.log(JSON.stringify(data));

      const formType = e.target.getAttribute("data-form-type");
      if (formType === "register") {
        if (await validateRegisterForm()) {
          const email = data.email;
          const response = await checkEmail(email);
          if (response) {
            showErrorAlert("Email is already registered");
          } else {
            await RegisterForm();
            showSuccessAlert("Successful registration");
            window.location.href = "login";
          }
        }
      } else if (formType === "login") {
        const response = await validateLoginForm();

        if (response.success) {
          sessionStorage.setItem("user", JSON.stringify(response.user));

          const usuario = JSON.parse(sessionStorage.getItem("user"));
          const menus = await getMenusByRole(usuario.roles);
          sessionStorage.setItem("menus", JSON.stringify(menus.response));

          showSuccessAlert("Successful login");
          window.location.href = "/";
        } else {
          showErrorAlert("Invalid credentials");
        }
      }
    });
  });

  // Solo bloquea la UI si el usuario no está en la página de login
  if (!isLoginPage()) {
    $.blockUI({ css: { backgroundColor: '#888', color: '#fff' } });

    const usuario = JSON.parse(sessionStorage.getItem("user"));

    if (!usuario) {
      window.location.replace("login");
    } else {
      // Desbloquear la UI cuando la página esté lista y el usuario esté autenticado
      $.unblockUI();
    }
  }
});

async function validateRegisterForm() {
  const form = document.forms["registerForm"];
  const fName = form["fName"].value.trim();
  const lName = form["lName"].value.trim();
  const email = form["email"].value.trim();
  const password = form["password"].value.trim();
  const cPassword = form["cPassword"].value.trim();

  return validateFields(fName, lName, email, password, cPassword);
}

async function RegisterForm() {
  const form = document.forms["registerForm"];
  const fName = form["fName"].value.trim();
  const lName = form["lName"].value.trim();
  const email = form["email"].value.trim();
  const password = form["password"].value.trim();

  const response = await registerUser(fName, lName, email, password);
  return response;
}

const registerUser = async (fName, lName, email, password) => {
  const response = await $.ajax({
    url: `${URL}/register`,
    type: "POST",
    data: {
      fName,
      lName,
      email,
      password,
    },
    dataType: "json",
  });
  return response;
};

async function validateLoginForm() {
  const form = document.forms["loginForm"];
  const email = form["email"].value.trim();
  const password = form["password"].value.trim();

  validateFields(null, null, email, password, null);

  const response = await loginUser(email, password);
  return response;
}

async function checkEmail(email) {
  const response = await $.ajax({
    url: `${URL}/users/getEmail`,
    type: "POST",
    data: { email },
    dataType: "json",
  });
  console.log(response);
  return response;
}

const loginUser = async (email, password) => {
  const response = await $.ajax({
    url: `${URL}/login`,
    type: "POST",
    data: { email, password },
    dataType: "json",
  });
  console.log(response);
  return response;
};

function validateFields(fName, lName, email, password, cPassword) {
  if (fName && fName === "") {
    showErrorAlert("First Name is required");
    return false;
  }
  if (lName && lName === "") {
    showErrorAlert("Last Name is required");
    return false;
  }
  if (email === "") {
    showErrorAlert("Email Address is required");
    return false;
  }
  if (password === "") {
    showErrorAlert("Password is required");
    return false;
  }
  if (cPassword !== null && password !== cPassword) {
    showErrorAlert("Passwords do not match");
    return false;
  }
  return true;
}

async function getMenusByRole(id) {
  try {
    const response = await $.ajax({
      url: `${URL}/roles/getAllRelMenus`,
      type: "POST",
      data: { id },
      dataType: "json",
    });
    return response;
  } catch (error) {
    console.error("Error fetching menus by role:", error);
    throw new Error("Error fetching menus");
  }
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

function showConfirmationQuestion(message, callback) {
  iziToast.question({
    title: "Confirmation",
    message: message,
    position: "center",
    timeout: false,
    close: false,
    overlay: true,
    buttons: [
      [
        "<button><b>Yes</b></button>",
        function (instance, toast) {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          if (callback) callback(true);
        },
        true,
      ],
      [
        "<button>No</button>",
        function (instance, toast) {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          if (callback) callback(false);
        },
      ],
    ],
  });
}


