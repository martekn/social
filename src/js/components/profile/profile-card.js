import { followUnfollowHandler } from "../../helper/follow-unfollow-handler.js";
import htmlUtilities from "../../helper/html-utilities/index.js";
import Storage from "../../helper/storage/index.js";
import Modal from "../../helper/modal/index.js";
import Jwt from "../../helper/jwt/index.js";

/**
 * Represents a `ProfileCard` class that displays details about a user on the profile page, including their image, banner, username, and stats.
 * The content and behavior of the card vary depending on whether the user is viewing their own profile or someone else's.
 * @class
 */
export class ProfileCard extends HTMLElement {
  /**
   * Create a new `ProfileCard` instance.
   * @constructor
   * @param {Object} userData - The user data object.
   * @param {String} userData.name - The username of the user.
   * @param {String} userData.banner - The URL to the user's banner image.
   * @param {String} userData.avatar - The URL to the user's avatar image.
   * @param {Object[]} userData.followers - An array of objects, each containing the username and avatar of people who follow the user.
   * @param {Object[]} userData.following - An array of objects, each containing the username and avatar of people the user follows.
   * @param {Object} userData._count - An object with `followers` and `following` properties representing the number of followers and people the user is following.
   */
  constructor({ name, banner, avatar, followers, following, _count }) {
    super();
    this.name = name;
    this.banner = banner;
    this.avatar = avatar;
    this.followers = followers;
    this.following = following;
    this.count = _count;
    this.loggedInUser = Jwt.getPayloadValue(Storage.get("accessToken"), "name");
    this.isLoggedInUser = this.name === this.loggedInUser;
    this.isFollowing = this.followers.some(
      (user) => user.name === this.loggedInUser,
    );
    this.followUnfollowText = this.isFollowing ? "Unfollow" : "Follow";
    this.cardButtonText = this.isLoggedInUser
      ? "Edit"
      : this.followUnfollowText;
  }

  connectedCallback() {
    this.render();

    const cardButton = this.querySelector("#card-button");

    if (this.isLoggedInUser) {
      cardButton.addEventListener("click", (e) => {
        Modal.open(document.querySelector("#edit-modal"));
      });
    }
  }

  render() {
    const profile = htmlUtilities.createHTML(
      "div",
      "xs:rounded-md bg-light-200 shadow-sm",
    );

    const bannerImg = htmlUtilities.createHTML(
      "img",
      "aspect-[5/2] bg-light-400 w-full xs:rounded-t-md object-cover",
      null,
      {
        src: this.banner
          ? this.banner
          : "/assets/images/banner-placeholder.jpg",
        onerror:
          "this.onerror=null;this.src='/assets/images/banner-placeholder.jpg';",
        alt: "",
      },
    );

    const profileContent = htmlUtilities.createHTML(
      "div",
      "flex w-full flex-col items-center gap-2 p-6 sm:items-stretch",
    );

    const avatarWrapper = htmlUtilities.createHTML(
      "div",
      "relative h-12 w-40 sm:h-0",
    );
    const avatarImg = htmlUtilities.createHTML(
      "img",
      "absolute bg-light-400 bottom-0 bg-light-400 aspect-square w-full object-cover rounded-full border-4 border-light-200 sm:-bottom-12",
      null,
      {
        src: this.avatar
          ? this.avatar
          : "/assets/images/avatar-placeholder.jpg",
        alt: this.name,
        onerror:
          "this.onerror=null;this.src='/assets/images/avatar-placeholder.jpg';",
      },
    );
    avatarWrapper.append(avatarImg);

    const userDetailWrapper = htmlUtilities.createHTML(
      "div",
      "flex flex-col items-center gap-4 text-center sm:flex-row sm:text-start",
    );

    const userDetail = htmlUtilities.createHTML(
      "div",
      "flex w-full flex-col items-center gap-4 sm:items-start sm:pt-12",
    );
    const username = htmlUtilities.createHTML("h1", null, this.name);

    const userStats = htmlUtilities.createHTML("div", "flex gap-4");
    const followerButton = htmlUtilities.createHTML(
      "button",
      "border-b space-x-1 border-light-200 transition-all font-accent text-sm hover:border-dark-500",
      null,
    );
    followerButton.addEventListener("click", (e) => {
      Modal.open(document.querySelector("#follower-modal"));
    });

    const followerCount = htmlUtilities.createHTML(
      "span",
      "font-medium",
      `${this.count.followers}`,
      { id: "follower-count" },
    );
    const followerText = htmlUtilities.createHTML(
      "span",
      "text-dark-300 hover:text-dark-500 transition-all",
      "Followers",
    );
    followerButton.append(...[followerCount, followerText]);

    const followingButton = htmlUtilities.createHTML(
      "button",
      "border-b space-x-1 border-light-200 transition-all font-accent text-sm hover:border-dark-500",
    );

    followingButton.addEventListener("click", (e) => {
      Modal.open(document.querySelector("#following-modal"));
    });

    const followingCount = htmlUtilities.createHTML(
      "span",
      "font-medium",
      `${this.count.following}`,
    );
    const followingText = htmlUtilities.createHTML(
      "span",
      "text-dark-300 hover:text-dark-500 transition-all",
      "Following",
    );
    followingButton.append(...[followingCount, followingText]);

    userStats.append(...[followerButton, followingButton]);

    const cardButton = htmlUtilities.createHTML(
      "button",
      "button button-primary w-fit sm:self-start",
      this.cardButtonText,
      {
        id: "card-button",
        "data-user": this.name,
        "data-following": this.isFollowing.toString(),
      },
    );

    if (!this.isLoggedInUser) {
      cardButton.addEventListener("click", followUnfollowHandler);
    }

    userDetail.append(...[username, userStats]);
    userDetailWrapper.append(...[userDetail, cardButton]);
    profileContent.append(...[avatarWrapper, userDetailWrapper]);
    profile.append(...[bannerImg, profileContent]);
    this.append(profile);
  }
}

customElements.define("profile-card", ProfileCard);
