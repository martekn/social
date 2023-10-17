import htmlUtilities from "../helper/html-utilities/index.js";

/**
 * Represents a `FilterButton` class that creates links for filtering search results on a search page.
 * @class
 */
export class FilterButton extends HTMLElement {
  /**
   * Create a new `FilterButton` instance.
   * @constructor
   * @param {String} buttonText - The text to be displayed on the filter button.
   * @param {String} buttonId - The HTML id attribute for the button.
   * @param {String} buttonType - The action type associated with the button.
   */
  constructor(buttonText, buttonId, buttonType) {
    super();

    this.buttonText = buttonText;
    this.buttonId = buttonId;
    this.buttonType = buttonType;

    this.searchParams = new URLSearchParams(window.location.search);
    this.searchQuery = this.searchParams.get("search") ?? "";
    this.actionQuery = this.searchParams.get("action") ?? "latest";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const classes =
      "w-full border-b border-light-500 p-2 font-accent text-dark-300 transition-all duration-200 ease-in-out hover:rounded-t-md hover:bg-light-450 hover:text-dark-500 data-[active='true']:border-b-2 data-[active='true']:border-primary-400 data-[active='true']:font-medium data-[active='true']:text-dark-500 block text-center";

    const button = htmlUtilities.createHTML("a", classes, this.buttonText, {
      id: this.buttonId,
      href: `/search/?search=${this.searchQuery}&action=${this.buttonType}`,
    });

    if (this.actionQuery === this.buttonType) {
      button.setAttribute("data-active", "true");
    }

    this.classList.add("w-full");
    this.append(button);
  }
}

customElements.define("filter-button", FilterButton);
