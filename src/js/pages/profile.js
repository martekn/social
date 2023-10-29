import { renderPosts } from "../helper/render-posts.js";
import { ProfileModal } from "../components/profile/profile-modal.js";
import { EditProfile } from "../components/edit-profile.js";
import { ProfileCard } from "../components/profile/profile-card.js";
import Storage from "../helper/storage/index.js";
import { userById } from "../helper/api/request-object/user-by-id.js";
import { userPosts } from "../helper/api/request-object/user-posts.js";
import { allPosts } from "../helper/api/request-object/all-posts.js";
import { requestAll } from "../helper/api/request-all.js";
import { DialogAlert } from "../components/alerts/dialog-alert.js";
import Modal from "../helper/modal/index.js";

const main = document.querySelector("main");

/**
 * Render a user's profile card with follower and following modals.
 *
 * @param {object} user - The user object containing profile information.
 * @property {string} user.name - The name of the user.
 * @property {string} user.avatar - The user's profile picture.
 * @property {string} user.banner - The user's banner image.
 * @property {number} user.following - The number of users this user is following.
 * @property {number} user.followers - The number of followers this user has.
 * @property {number} user._count - An internal count property (private).
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
 * Render an edit profile modal, allowing users to edit their profile information.
 *
 * @param {object} options - Options for rendering the edit profile modal.
 * @param {string} options.name - The user's name.
 * @param {string} options.avatar - The user's profile picture.
 * @param {string} options.banner - The user's banner image.
 */
const renderEditModal = ({ name, avatar, banner }) => {
  const query = new URLSearchParams(window.location.search).get("status");
  const isNewUser = query === "new";

  if (isNewUser) {
    const setupProfile = new EditProfile(name, avatar, banner, isNewUser);

    document.body.append(setupProfile);
    Modal.open(setupProfile.querySelector("dialog"));
  }

  const editProfile = new EditProfile(name, avatar, banner);

  document.body.append(editProfile);
};

/**
 * Render a user's profile with their profile card, edit modal, and posts.
 *
 * @param {Promise} profile - A Promise representing the user's profile data.
 * @param {Promise} profilePosts - A Promise representing the user's posts data.
 * @param {Promise} loggedInUser - A Promise representing the currently logged-in user's data.
 */
const renderProfile = (profile, profilePosts, loggedInUser) => {
  if (profile.status === "fulfilled") {
    document.title = `${profile.value.name} - Social`;
    const profileMetaDescription = `Explore ${profile.value.name}'s profile on Social. Connect and discover their posts and updates.`;
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", profileMetaDescription);

    renderProfileCard(profile.value);
    renderEditModal(profile.value);
    renderProfilePosts(profilePosts, loggedInUser);
  } else {
    const error = new DialogAlert(profile.reason, "profile-error", "error");
    main.append(error);
  }
};

/**
 * Render the posts of a user's profile.
 *
 * @param {Promise} posts - A Promise representing the user's posts data.
 * @param {Promise} user - A Promise representing the user's profile information.
 */
const renderProfilePosts = (posts, user) => {
  const list = document.querySelector("#posts-list");
  if (posts.status === "fulfilled" && posts.value.length > 0) {
    posts.value.sort((a, b) => a.created < b.created);
    renderPosts(posts.value, list, user.value);
  } else if (posts.status === "fulfilled") {
    const errorMessage =
      "It appears that this user currently has no posts to display. Please check back later to see any updates from them.";
    const error = new DialogAlert(errorMessage, "profile-error", "information");
    list.append(error);
  } else {
    const errorMessage =
      "We're sorry, but we were unable to fetch the posts for this user at the moment. Please try again later or contact our support team if the issue persists.";
    const error = new DialogAlert(errorMessage, "profile-error", "error");
    list.append(error);
  }
};

const fetchProfileData = async () => {
  const loggedInUsername = Storage.get("username");
  const usernameQuery = new URLSearchParams(window.location.search).get("u");
  const requests = [allPosts(), userById(loggedInUsername)];
  if (loggedInUsername !== usernameQuery && usernameQuery !== null) {
    requests.push(userPosts(usernameQuery));
    requests.push(userById(usernameQuery));
  } else {
    requests.push(userPosts(loggedInUsername));
  }
  const response = await requestAll(requests);
  const [sidebarPosts, loggedInUser, profilePosts, profileResponse] = response;
  let profile = loggedInUser;
  if (loggedInUsername !== usernameQuery && usernameQuery !== null) {
    profile = profileResponse;
  }

  const sidebar = document.querySelector("app-sidebar");
  sidebar.setup(sidebarPosts, loggedInUser);

  renderProfile(profile, profilePosts, loggedInUser);
};

fetchProfileData();
