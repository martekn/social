import { decode } from "./decode.js";

/**
 * Creates an html element
 * @param {String} tag html tag
 * @param {String|String[]} [classes] string or array of classes
 * @param {String} [text] Text to be set as innerText
 * @param {Object} [attributes] Key/value pair where the key is the attribute name and the value is the value of the attribute
 * @returns Returns an html element
 * @example
 * ```js
 * const div = createHTML("div", ["bg-red", "border-radius"], "Hello world", {id: "uniqueId"})
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
    const object = Object.entries(attributes);
    for (const [key, value] of object) {
      elem.setAttribute(key, value);
    }
  }

  return elem;
};
