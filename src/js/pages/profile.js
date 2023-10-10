import { renderPosts } from "../helper/renderPosts.js";
import { profile } from "../const/test-data/profile.js";
import { profilePosts } from "../const/test-data/profile-posts.js";
import { ProfileModal } from "../components/profile/profile-modal.js";
import { tags } from "../const/test-data/tags.js";

const sidebar = document.querySelector("app-sidebar");
sidebar.renderFollowing(profile.following);
sidebar.renderTags(tags);

/**
 * This function is responsible for rendering the user's profile page, including components like the profile card and social media posts.
 *
 * @param {{name, banner, avatar, followers, following, _count}} user  - An object containing user information, including name, banner, avatar, followers, following, and post count.
 * @param {Object[]} posts - An array of objects representing social media posts.
 */
const renderProfile = (user, posts) => {
  const profile = document.querySelector("profile-card");
  profile.user = user;
  profile.setAttribute("profile-loaded", "true");

  const commentForms = Array.from(document.querySelectorAll(".comment-form"));
  for (const form of commentForms) {
    form.user = user;
    form.setAttribute("profile-loaded", "true");
  }

  posts.sort((a, b) => a.created < b.created);

  renderPosts(posts, document.querySelector("#posts-list"), user);

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

  document.querySelector("main").append(...[followerModal, followingModal]);
};

renderProfile(profile, profilePosts);
