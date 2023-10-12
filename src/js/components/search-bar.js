import htmlUtilities from "../helper/html-utilities/index.js";

/**
 * Represents a `SearchBar` class that creates a search bar with a search button for a specific type of search.
 * @class
 */
export class SearchBar extends HTMLElement {
  /**
   * Create a new `SearchBar` instance.
   * @constructor
   * @param {string} [type] - The type of search (optional). When set to "sidebar-search," a specific class is added.
   */
  constructor(type) {
    super();
    this.type = type || this.getAttribute("type") || "";
  }

  connectedCallback() {
    this.render();

    const input = this.querySelector("input");
    const button = this.querySelector("button");

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        this.search(input.value);
      }
    });

    button.addEventListener("click", (e) => {
      this.search(input.value);
    });
  }

  search(value) {
    location.href = `/search/?search=${value}`;
  }

  render() {
    const searchbar = htmlUtilities.createHTML("div", "relative text-dark-200");
    if (this.type === "sidebar-search") {
      searchbar.classList.add("mb-4");
    }

    const input = htmlUtilities.createHTML("input", null, null, {
      placeholder: "Search",
      type: "search",
      name: "search",
    });

    const buttonClasses =
      "absolute inset-y-0 right-0 flex items-center rounded-r-md border border-l-0 border-dark-200 bg-light-200 px-4 text-lg text-dark-300 hover:text-dark-500 focus-visible:text-dark-500 focus-visible:ring-1 focus-visible:hover:bg-primary-300 focus-visible:hover:text-light-200";

    const button = htmlUtilities.createHTML("button", buttonClasses);
    const icon = htmlUtilities.createHTML("i", ["bi", "bi-search"]);

    button.append(icon);
    searchbar.append(...[input, button]);

    this.append(searchbar);
  }
}

customElements.define("search-bar", SearchBar);
