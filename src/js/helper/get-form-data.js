/**
 * Extracts form data from a form submission event and converts it into an object.
 *
 * @param {SubmitEvent} event - The event object representing a form submission.
 * @returns {Object} An object containing the form data.
 */
export const getFormData = (e) => {
  const form = e.target;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  return user;
};
