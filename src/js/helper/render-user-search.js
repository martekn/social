import htmlUtilities from "./html-utilities/index.js";
import { UserSearch } from "../components/user-search.js";

/**
 * Renders user search results by creating and appending user search elements to a parent container.
 *
 * @function
 * @param {Array} users - An array of user data, each containing information about a user.
 * @param {HTMLElement} parent - The parent container element where user search elements will be appended.
 * @param {Object} loggedInUser - An object representing the logged-in user.
 */
export const renderUserSearch = (users, parent, loggedInUser) => {
  const allUsers = [];
  for (const user of users) {
    const li = htmlUtilities.createHTML("li");
    li.append(new UserSearch(user, loggedInUser));
    allUsers.push(li);
  }

  parent.classList.add(..."divide-y divide-light-450 space-y-0".split(" "));
  parent.append(...allUsers);
};
