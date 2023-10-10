const query = new URLSearchParams(window.location.search).get("auth");
const loginForm = document.querySelector("#login");
const registerForm = document.querySelector("#register");

if (query === "register") {
  loginForm.setAttribute("data-active", "false");
  registerForm.setAttribute("data-active", "true");
} else {
  loginForm.setAttribute("data-active", "true");
  registerForm.setAttribute("data-active", "false");
}
