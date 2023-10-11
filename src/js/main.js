import "./components/index.js";
const createPostButton = document.querySelector("#create-button");

if (createPostButton) {
  createPostButton.addEventListener("click", (e) => {
    document.querySelector("#modal_post-creation").showModal();
  });
}
