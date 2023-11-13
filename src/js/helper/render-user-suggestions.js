import { request } from "./api/request.js";
import { baseApiPath } from "../const/base-url.js";

/**
 * Render user suggestions in the sidebar's "People you may know" section.
 * Fetches user suggestions from the server and updates the sidebar with the suggestions.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the suggestions are rendered or rejects on error.
 */
export const renderUserSuggestions = async () => {
  const sidebar = document.querySelector("app-sidebar");
  const sidebarSection = sidebar.querySelector("#following-section");
  try {
    const users = await request(`${baseApiPath}/profiles`, null, true);
    const userSuggestion = users.sort(() => Math.random() - 0.5).splice(0, 5);

    sidebarSection.querySelector(" h2").innerText = "People you may know";
    sidebar.renderFollowing(userSuggestion);
  } catch (error) {
    sidebarSection.remove();
  }
};
