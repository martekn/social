import { decode } from "./decode.js";

/**
 * Creates an HTML element with optional classes, text, and attributes.
 *
 * @param {string} tag - The HTML element tag (e.g., "div", "a").
 * @param {string|string[]|null} [classes] - CSS classes to add to the element (optional).
 * @param {string} [text] - Text content to set for the element (optional).
 * @param {Object|null} [attributes] - Object containing attributes to set on the element (optional).
 *   The attributes object should have keys representing attribute names and values representing attribute values.
 * @returns {HTMLElement} - The created HTML element.
 *
 * @example
 * ```js
// Create a div element with "example-class" and "custom-id" attributes, and text content.
 * const divElement = createHTML("div", "example-class", "Hello, world!", { id: "custom-id" });
 * // The resulting HTML element will be: <div class="example-class" id="custom-id">Hello, world!</div>
 * ```
 */
export const createHTML = (tag, classes, text, attributes) => {
  const elem = document.createElement(tag);

  if (classes) {
    let classArray = classes;
    if (!Array.isArray(classArray)) {
      classArray = classes.split(" ");
    }

    elem.classList.add(...classArray);
  }

  if (text) {
    text = decode(text);
    elem.innerText = text;
  }

  if (attributes) {
    const array = Object.entries(attributes);
    for (const [key, value] of array) {
      elem.setAttribute(key, value);
    }
  }

  return elem;
};
