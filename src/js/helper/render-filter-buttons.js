import { FilterButton } from "../components/filter-button.js";
import { filterButtonsData } from "../const/filter-buttons-data.js";

/**
 * Renders filter buttons on the page by creating and appending instances of the `FilterButton` class.
 *
 * This function fetches filter button data from the `filterButtonsData` array and appends the buttons to the specified HTML element with the ID "filter-list."
 *
 * @function
 */
export const renderFilterButtons = () => {
  const list = document.querySelector("#filter-list");
  for (const button of filterButtonsData) {
    const filter = new FilterButton(button.text, button.id, button.type);
    list.append(filter);
  }
};
