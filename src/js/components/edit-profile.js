import { updateUser } from "../helper/api/putRequests/update-user.js";
import { getFormData } from "../helper/get-form-data.js";
import htmlUtilities from "../helper/html-utilities/index.js";
import { ErrorDialog } from "./alerts/error-dialog.js";
import { InputGroup } from "./input-group.js";

/**
 * Represents an `EditProfile` class, which is a modal component for editing user avatar and banner links.
 * The modal can be in two states: one for newly registered users and one for general profile updates.
 * @class
 */
export class EditProfile extends HTMLElement {
  /**
   * Create a new `EditProfile` instance.
   * @constructor
   * @param {String} name - The username of the user.
   * @param {String} avatar - The URL to the user's avatar image.
   * @param {String} banner - The URL to the user's banner image.
   * @param {Boolean} [isNewUser=false] - Indicates whether the user is newly registered (default is false).
   */
  constructor(name, avatar, banner, isNewUser = false) {
    super();

    this.name = name;
    this.avatar = avatar ?? "";
    this.banner = banner ?? "";
    this.isNewUser = isNewUser;
    this.dialogId = "edit-modal";
    this.heading = this.isNewUser
      ? `Hello ${this.name}!`
      : "Update your profile";
  }

  connectedCallback() {
    this.render();

    const form = this.querySelector("form");
    form.addEventListener("submit", this.userEditHandler);
  }

  /**
   * Handles user profile editing and updates the user information.
   * @param {SubmitEvent} e - The event object, typically from a form submission.
   */
  userEditHandler = async (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    try {
      const response = await updateUser(formData);

      window.location.href = "/profile/";
    } catch (error) {
      console.log(error);
      const errorMessage = new ErrorDialog(error, "edit-error");
      const inputContainer = this.querySelector("div");
      e.target.insertBefore(errorMessage, inputContainer);
    }
  };

  render() {
    const dialog = htmlUtilities.createHTML("dialog", null, null, {
      id: this.dialogId,
    });

    const container = htmlUtilities.createHTML(
      "form",
      "p-10 grid gap-2",
      null,
      {
        id: `${this.dialogId}_container`,
      },
    );

    dialog.append(container);

    const heading = htmlUtilities.createHTML("h1", null, this.heading);
    container.append(heading);

    if (this.isNewUser) {
      const text = htmlUtilities.createHTML(
        "p",
        null,
        "Welcome! This is where you personalize your profile and banner – your online identity starts here. Enjoy!",
      );
      container.append(text);
    }

    const inputContainer = htmlUtilities.createHTML("div", "py-5 grid gap-5");

    const avatarInput = new InputGroup(
      "Profile picture",
      { for: "avatar" },
      {
        type: "url",
        id: "avatar",
        value: this.avatar,
        name: "avatar",
        placeholder: "https://example.com/",
        title:
          "The link must be a fully formed URL that links to a live and publicly accessible image",
      },
    );

    const bannerInput = new InputGroup(
      "Profile banner",
      { for: "banner" },
      {
        id: "banner",
        type: "url",
        value: this.banner,
        placeholder: "https://example.com/",
        name: "banner",
        title:
          "The link must be a fully formed URL that links to a live and publicly accessible image",
      },
    );

    inputContainer.append(...[avatarInput, bannerInput]);

    const actionContainer = htmlUtilities.createHTML(
      "div",
      "flex justify-end gap-4 pt-3",
    );

    const cancelAction = htmlUtilities.createHTML(
      "button",
      "font-accent font-medium text-primary-400",
      `${this.isNewUser ? "Skip" : "Cancel"}`,
      { id: `${this.dialogId}-cancel` },
    );

    const sendAction = htmlUtilities.createHTML(
      "button",
      "rounded-md bg-primary-400 px-6 py-2 font-accent font-medium text-light-200",
      "Save",
      { id: `${this.dialogId}-save`, type: "submit" },
    );

    actionContainer.append(...[cancelAction, sendAction]);
    container.append(...[inputContainer, actionContainer]);

    dialog.append(container);

    this.append(dialog);
  }
}

customElements.define("edit-profile", EditProfile);
