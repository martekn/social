import htmlUtilities from "../helper/html-utilities/index.js";

/**
 * Represents a custom loader element that can be small or large.
 * @extends HTMLElement
 */
export class AppLoader extends HTMLElement {
  /**
   * Creates a new instance of the AppLoader.
   * @param {boolean} [isSmall=false] - A boolean indicating whether the loader should be small or large.
   */
  constructor(isSmall = false) {
    super();
    this.isSmall = isSmall;
    this.height = isSmall ? "h-4" : "h-9";
    this.width = isSmall ? "w-4" : "w-9";
    this.borderSize = isSmall ? "border-2" : "border-4";
    this.borderColor = isSmall ? "border-primary-300" : "border-light-500";
    this.borderRightColor = isSmall
      ? "border-r-light-200"
      : "border-r-primary-400";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const wrapper = htmlUtilities.createHTML(
      "div",
      "grid h-full place-items-center",
    );

    const loader = htmlUtilities.createHTML(
      "div",
      `${this.height} ${this.width} ${this.borderSize} ${this.borderColor} ${this.borderRightColor} mx-auto animate-spin rounded-full`,
    );

    wrapper.append(loader);
    this.append(wrapper);
  }
}

customElements.define("app-loader", AppLoader);
