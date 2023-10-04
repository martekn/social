import htmlUtilities from "../helper/html-utilities/index.js";

class SearchBar extends HTMLElement {
  constructor() {
    super();
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
    const searchBar = htmlUtilities.createHTML("div", "relative text-dark-200");
    searchBar.classList.add(...this.classList);
    this.className = "";

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
    htmlUtilities.appendArray([input, button], searchBar);

    this.appendChild(searchBar);
  }
}

customElements.define("search-bar", SearchBar);
