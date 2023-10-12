import { renderPosts } from "../helper/renderPosts.js";
import { profile } from "../const/test-data/profile.js";
import { profilePosts } from "../const/test-data/profile-posts.js";
import { ProfileModal } from "../components/profile/profile-modal.js";
import { tags } from "../const/test-data/tags.js";
import { EditProfile } from "../components/edit-profile.js";
import { ProfileCard } from "../components/profile/profile-card.js";

const main = document.querySelector("main");
const sidebar = document.querySelector("app-sidebar");

sidebar.renderFollowing(profile.following);
sidebar.renderTags(tags);

/**
 * Renders a user's profile card, including follower and following modals, and appends them to the main content area.
 *
 * @param {Object} user - The user object containing profile information.
 * @param {String} user.name - The username of the user.
 * @param {String} user.avatar - The URL to the user's avatar image.
 * @param {String} user.banner - The URL to the user's banner image.
 * @param {Object[]} user.followers - An array of objects, each containing the username and avatar of people who follow the user.
 * @param {Object[]} user.following - An array of objects, each containing the username and avatar of people the user follows.
 * @param {Object} user._count - An object with `followers` and `following` properties representing the number of followers and people the user is following.
 */
const renderProfileCard = (user) => {
  const profile = new ProfileCard(user);

  const followerModal = new ProfileModal(
    "follower",
    "Followers",
    user.followers,
  );
  const followingModal = new ProfileModal(
    "following",
    "Following",
    user.following,
  );

  main.append(...[followerModal, followingModal]);
  main.prepend(profile);
};

/**
 * Renders an edit profile modal based on the user's profile state and appends it to the document body.
 *
 * @param {Object} options - The options for the edit profile modal.
 * @param {String} options.name - The username of the user.
 * @param {String} options.avatar - The URL to the user's avatar image.
 * @param {String} options.banner - The URL to the user's banner image.
 */
const renderEditModal = ({ name, avatar, banner }) => {
  const query = new URLSearchParams(window.location.search).get("r");
  const isNewUser = query === "registered";

  if (isNewUser) {
    const setupProfile = new EditProfile(name, avatar, banner, isNewUser);

    document.body.append(setupProfile);
    setupProfile.querySelector("dialog").showModal();
  }

  const editProfile = new EditProfile(name, avatar, banner);

  document.body.append(editProfile);
};

/**
 * This function is responsible for rendering the user's profile page, including components like the profile card and social media posts.
 *
 * @param {{name, banner, avatar, followers, following, _count}} user  - An object containing user information, including name, banner, avatar, followers, following, and post count.
 * @param {Object[]} posts - An array of objects representing social media posts.
 */
const renderProfile = (user, posts) => {
  renderProfileCard(user);

  posts.sort((a, b) => a.created < b.created);
  renderPosts(posts, document.querySelector("#posts-list"), user);

  renderEditModal(user);
};

renderProfile(profile, profilePosts);
