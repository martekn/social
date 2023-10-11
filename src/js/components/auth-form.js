import htmlUtilities from "../helper/html-utilities/index.js";
import { InputGroup } from "./input-group.js";

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
        "text",
        "username",
        "",
        "username",
        "username",
        "Username is required and cant contain punctuation symbols apart from underscore (_)",
        true,
      );
      inputContainer.append(username);
    }

    const email = new InputGroup(
      "Email",
      "email",
      "email",
      "",
      "example@noroff.no",
      "email",
      "Email should end with @stud.noroff.no or @noroff.no",
      true,
    );

    const password = new InputGroup(
      "Password",
      "password",
      "password",
      "",
      "Password",
      "password",
      "Password needs to be 8 characters long",
      true,
    );
    password.setAttribute("minlength", "8");

    const submit = htmlUtilities.createHTML(
      "button",
      "button button-primary w-full p-3",
      this.heading,
      { type: "submit" },
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
