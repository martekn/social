import htmlUtilities from "../helper/html-utilities/index.js";

class FilterButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const classes =
      "w-full border-b border-light-500 p-2 font-accent text-dark-300 transition-all duration-200 ease-in-out hover:rounded-t-md hover:bg-light-450 hover:text-dark-500 data-[active='true']:border-b-2 data-[active='true']:border-primary-400 data-[active='true']:font-medium data-[active='true']:text-dark-500";

    const button = htmlUtilities.createHTML(
      "button",
      classes,
      this.textContent,
    );

    if (this.dataset.active === "true") {
      button.setAttribute("data-active", "true");
    }
    this.textContent = "";

    this.classList.add("w-full");
    this.appendChild(button);
  }
}

customElements.define("filter-button", FilterButton);
