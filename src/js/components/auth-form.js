import htmlUtilities from "../helper/html-utilities/index.js";
import { InputGroup } from "./input-group.js";
import { getFormData } from "../helper/get-form-data.js";
import { login } from "../helper/api/authRequests/login.js";
import { register } from "../helper/api/authRequests/register.js";
import { DialogAlert } from "./alerts/dialog-alert.js";
import { AppLoader } from "./app-loader.js";
import Storage from "../helper/storage/index.js";

/**
 * Represents an `AuthForm` class that creates a form for user registration or login based on the query of the site.
 * If the query is set to "register," the form is configured for user registration; otherwise, it creates a login form.
 * @class
 */
export class AuthForm extends HTMLElement {
  constructor() {
    super();

    this.method = "POST";
    this.isRegisterForm =
      new URLSearchParams(window.location.search).get("auth") === "register";

    this.action = this.isRegisterForm
      ? "/social/auth/register"
      : "/social/auth/login";
    this.formId = this.isRegisterForm ? "register" : "login";
    this.heading = this.isRegisterForm ? "Sign up" : "Log in";
    this.authToggleText = this.isRegisterForm
      ? "Already have an account?"
      : "Dont have an account?";
    this.authToggleHref = this.isRegisterForm
      ? "/?auth=login"
      : "/?auth=register";
    this.authToggleLink = this.isRegisterForm ? "Log in" : "Sign up";
    this.searchParams = new URLSearchParams(window.location.search);
    this.error = this.searchParams.get("error") ?? "";
    this.tokenErrorMessage =
      "Oops! Something went wrong with your login. Please try again, and if the issue persists, contact support for assistance.";
  }

  connectedCallback() {
    this.render();

    const form = this.querySelector("form");

    form.addEventListener("submit", (e) => {
      AuthForm.onSubmit(e, this.isRegisterForm);
    });

    if (this.error === "token") {
      Storage.remove("accessToken");
      let errorMessage = form.querySelector("#auth-error");
      if (errorMessage) {
        errorMessage.remove();
      }
      errorMessage = new DialogAlert(
        this.tokenErrorMessage,
        "auth-error",
        "error",
      );
      form.insertBefore(errorMessage, form.querySelector("#container"));
    }
  }
  /**
   * Handles the form submission.
   *
   * @param {Event} e - The submit event.
   * @param {boolean} isRegisterForm - Indicates whether the form is for registration.
   * @throws {Error} If there's an error during the submission process.
   */
  static async onSubmit(e, isRegisterForm) {
    e.preventDefault();
    const form = e.target;
    const loader = new AppLoader(true);
    const button = form.querySelector(`button`);
    button.prepend(loader);
    try {
      const user = getFormData(e);
      if (isRegisterForm) {
        await register(user);
      } else {
        await login(user);
      }
    } catch (error) {
      let errorMessage = form.querySelector("#auth-error");
      if (errorMessage) {
        errorMessage.remove();
      }
      errorMessage = new DialogAlert(error, "auth-error", "error");
      form.insertBefore(errorMessage, form.querySelector("#container"));
    } finally {
      loader.remove();
    }
  }

  render() {
    this.classList.add(
      "grid",
      "min-h-full",
      "flex-1",
      "place-items-center",
      "p-5",
    );
    const form = htmlUtilities.createHTML(
      "form",
      "container rounded-md bg-light-200 px-5 py-16 shadow-sm sm:max-w-lg sm:p-16",
      null,
      { action: this.action, method: this.method, id: this.formId },
    );

    const heading = htmlUtilities.createHTML(
      "h2",
      "text-3xl font-bold",
      this.heading,
    );

    const inputContainer = htmlUtilities.createHTML(
      "div",
      "grid gap-5 pb-3 pt-5",
      null,
      { id: "container" },
    );

    if (this.isRegisterForm) {
      form.setAttribute("autocomplete", "off");
      const username = new InputGroup(
        "Username",
        { for: "username" },
        {
          id: "username",
          type: "text",
          placeholder: "username",
          name: "name",
          required: "true",
          pattern: /^[A-Za-z0-9_]+$/.source,
          autocomplete: "off",
          title:
            "Username can only contain letters, numbers, and underscores (_)",
          maxlength: "20",
        },
      );
      inputContainer.append(username);
    }

    const email = new InputGroup(
      "Email",
      { for: "email" },
      {
        id: "email",
        type: "email",
        placeholder: "example@noroff.no",
        name: "email",
        required: "true",
        pattern: /^[\w\-.]+@(stud\.)?noroff\.no$/.source,
        autocomplete: "off",
        title:
          "Invalid email format. It should end with @stud.noroff.no or @noroff.no",
      },
    );

    const password = new InputGroup(
      "Password",
      { for: "password" },
      {
        id: "password",
        type: "password",
        placeholder: "password",
        name: "password",
        required: "true",
        autocomplete: "off",
        title: "Password must be 8 characters long",
        minlength: "8",
      },
    );

    const submit = htmlUtilities.createHTML(
      "button",
      "button button-primary flex gap-2 justify-center w-full p-3",
      this.heading,
    );

    inputContainer.append(...[email, password, submit]);

    const authToggle = htmlUtilities.createHTML(
      "div",
      "text-dark-300 flex gap-1",
    );
    const text = htmlUtilities.createHTML("span", null, this.authToggleText);
    const link = htmlUtilities.createHTML(
      "a",
      "link link-primary ml-1 p-0",
      this.authToggleLink,
      { href: this.authToggleHref },
    );

    authToggle.append(...[text, link]);
    form.append(...[heading, inputContainer, authToggle]);
    this.append(form);
  }
}

customElements.define("authentication-form", AuthForm);
