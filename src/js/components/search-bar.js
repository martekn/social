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

    this.searchParams = new URLSearchParams(window.location.search);
    this.searchQuery = this.searchParams.get("search") ?? "";
    this.actionQuery = this.searchParams.get("action") ?? "latest";
  }

  connectedCallback() {
    this.render();

    const input = this.querySelector("input");
    const button = this.querySelector("button");

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.search(input.value);
      }
    });

    button.addEventListener("click", (e) => {
      this.search(input.value);
    });
  }

  search(value) {
    const url = new URL("/search/", location.href);
    const searchParams = new URLSearchParams();
    searchParams.set("search", value);
    searchParams.set("action", this.actionQuery);
    url.search = searchParams.toString();
    location.href = url.href;
  }

  render() {
    const searchbar = htmlUtilities.createHTML("div", "relative text-dark-200");
    if (this.type === "sidebar-search") {
      searchbar.classList.add("mb-4");
    } else {
      searchbar.classList.add("mx-6", "xs:mx-0");
    }

    const input = htmlUtilities.createHTML("input", null, null, {
      placeholder: "Search",
      type: "search",
      name: "search",
      value: this.searchQuery,
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
