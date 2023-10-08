import htmlUtilities from "../helper/html-utilities/index.js";

class FilterButton extends HTMLElement {
  constructor(buttonText, isCurrent) {
    super();

    this.buttonText = buttonText ?? this.getAttribute("text") ?? "";
    this.isCurrent = isCurrent ?? this.getAttribute("is-current") ?? "false";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const classes =
      "w-full border-b border-light-500 p-2 font-accent text-dark-300 transition-all duration-200 ease-in-out hover:rounded-t-md hover:bg-light-450 hover:text-dark-500 data-[active='true']:border-b-2 data-[active='true']:border-primary-400 data-[active='true']:font-medium data-[active='true']:text-dark-500";

    const button = htmlUtilities.createHTML("button", classes, this.buttonText);

    if (this.isCurrent === "true") {
      button.setAttribute("data-active", "true");
    }

    this.classList.add("w-full");
    this.append(button);
  }
}

customElements.define("filter-button", FilterButton);
