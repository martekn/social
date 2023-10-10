import htmlUtilities from "../../helper/html-utilities/index.js";

class ProfileCard extends HTMLElement {
  static get observedAttributes() {
    return ["profile-loaded"];
  }
  constructor() {
    super();
    this.user = {};
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "profile-loaded" && newValue === "true") {
      const { name, banner, avatar, followers, following, _count } = this.user;

      this.name = name;
      this.banner = banner;
      this.avatar = avatar;
      this.followers = followers;
      this.following = following;
      this.count = _count;

      this.render();
    }
  }

  openModal = (type) => {
    const modal = document.querySelector(`#${type}-modal`);
    modal.showModal();
  };

  render() {
    const profile = htmlUtilities.createHTML(
      "div",
      "rounded-md bg-light-200 shadow-sm",
    );

    const bannerImg = htmlUtilities.createHTML(
      "img",
      "aspect-[5/2] w-full rounded-t-md object-cover",
      null,
      {
        src: this.banner
          ? this.banner
          : "/assets/images/banner-placeholder.jpg",
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
      "absolute bottom-0 aspect-square w-full object-cover rounded-full border-4 border-light-200 sm:-bottom-12",
      null,
      {
        src: this.avatar
          ? this.avatar
          : "/assets/images/avatar-placeholder.jpg",
        alt: this.name,
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
      "border-b space-x-1 border-light-200 font-accent text-sm hover:border-dark-500",
    );
    followerButton.addEventListener("click", (e) => {
      this.openModal("follower");
    });

    const followerCount = htmlUtilities.createHTML(
      "span",
      "font-medium",
      `${this.count.followers}`,
    );
    const followerText = htmlUtilities.createHTML(
      "span",
      "text-dark-300",
      "Followers",
    );
    followerButton.append(...[followerCount, followerText]);

    const followingButton = htmlUtilities.createHTML(
      "button",
      "border-b space-x-1 border-light-200 font-accent text-sm hover:border-dark-500",
    );
    followingButton.addEventListener("click", (e) => {
      this.openModal("following");
    });

    const followingCount = htmlUtilities.createHTML(
      "span",
      "font-medium",
      `${this.count.following}`,
    );
    const followingText = htmlUtilities.createHTML(
      "span",
      "text-dark-300",
      "Following",
    );
    followingButton.append(...[followingCount, followingText]);

    userStats.append(...[followerButton, followingButton]);

    const followButton = htmlUtilities.createHTML(
      "button",
      "button button-primary w-fit sm:self-start",
      "Follow",
    );

    userDetail.append(...[username, userStats]);
    userDetailWrapper.append(...[userDetail, followButton]);
    profileContent.append(...[avatarWrapper, userDetailWrapper]);
    profile.append(...[bannerImg, profileContent]);
    this.append(profile);
  }
}

customElements.define("profile-card", ProfileCard);
