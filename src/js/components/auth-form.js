import htmlUtilities from "../helper/html-utilities/index.js";
import { InputGroup } from "./input-group.js";

/**
 * Represents an `AuthForm` class that creates a form for user registration or login based on the query of the site.
 * If the query is set to "register," the form is configured for user registration; otherwise, it creates a login form.
 * @class
 */
export class AuthForm extends HTMLElement {
  constructor() {
    super();

    this.method = "GET";
    this.query = new URLSearchParams(window.location.search).get("auth");

    if (this.query === "register") {
      this.action = "/profile/?r=registered";
      this.formId = "register";
      this.heading = "Sign up";
      this.authToggleText = "Already have an account?";
      this.authToggleHref = "/?auth=login";
      this.authToggleLink = "Log in";
    } else {
      this.action = "/profile/";
      this.formId = "login";
      this.heading = "Log in";
      this.authToggleText = "Dont have an account?";
      this.authToggleHref = "/?auth=register";
      this.authToggleLink = "Sign up";
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.classList.add(
      ..."grid min-h-full flex-1 place-items-center p-5".split(" "),
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
    );

    if (this.query === "register") {
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
      "button button-primary w-full p-3",
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
      "link link-primary ml-1 p-0 font-semibold",
      this.authToggleLink,
      { href: this.authToggleHref },
    );

    authToggle.append(...[text, link]);
    form.append(...[heading, inputContainer, authToggle]);
    this.append(form);
  }
}

customElements.define("authentication-form", AuthForm);
