import { ToastAlert } from "../components/alerts/toast-alert.js";
import htmlUtilities from "./html-utilities/index.js";

/**
 * Renders a toast alert with the specified message, ID, and type.
 *
 * @param {string} message - The message to display in the toast alert.
 * @param {string} id - The ID for the toast alert element.
 * @param {string} type - The type of the toast alert (e.g., "information", "success", "error").
 */
export const renderToast = (message, id, type) => {
  const errorAlert = new ToastAlert(message, id, type);
  const list = document.querySelector("#toasts-list");

  const li = htmlUtilities.createHTML("li");
  li.append(errorAlert);
  list.append(li);
};
