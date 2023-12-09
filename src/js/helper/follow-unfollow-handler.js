import { UserBadge } from "../components/user-badge.js";
import { followUser } from "./api/putRequests/follow-user.js";
import { unfollowUser } from "./api/putRequests/unfollow-user.js";
import htmlUtilities from "./html-utilities/index.js";
import { stringToBoolean } from "./string-to-boolean.js";
import { renderToast } from "./render-toast.js";

/**
 * Update the state of follow buttons for a specific user in the UI.
 *
 * @param {string} user - The user for whom follow buttons are being updated.
 * @param {boolean} state - The new state of the follow buttons (true for following, false for unfollowing).
 */
const updateFollowButton = (user, state) => {
  const allFollowButtons = Array.from(
    document.querySelectorAll(`[data-user=${user}]`),
  );

  for (const button of allFollowButtons) {
    button.setAttribute("data-following", !state);
  }
};

/**
 * Update the UI elements in a profile card based on the follow state.
 *
 * @param {Element} card - The profile card element to be updated.
 * @param {boolean} state - The follow state (true for following, false for unfollowing).
 * @param {string} name - The name of the user associated with the profile card.
 * @param {string} avatar - The URL of the user's avatar image.
 */
const updateProfileCard = (card, state, name, avatar) => {
  const profileButton = card.querySelector("#card-button");
  profileButton.innerText = state ? "Follow" : "Unfollow";

  const followerCount = card.querySelector("#follower-count");
  const currentCount = Number(followerCount.innerText);
  followerCount.innerText = state ? currentCount - 1 : currentCount + 1;

  const followerModal = document.querySelector("#follower-modal");
  const followerList = followerModal.querySelector("ul");

  if (state) {
    const badge = followerList.querySelector(`[data-badge=${name}]`);
    badge.remove();
  } else {
    const li = htmlUtilities.createHTML("li");
    const userBadge = new UserBadge({
      avatar,
      name,
    });
    li.append(userBadge);
    followerList.append(userBadge);
  }
};

/**
 * Handles the follow/unfollow action triggered by a button click.
 *
 * @param {Event} e - The event object representing the button click.
 */
export const followUnfollowHandler = async (e) => {
  const button = e.target;
  let isFollowing = stringToBoolean(button.getAttribute("data-following"));

  const user = button.getAttribute("data-user");
  const sidebar = document.querySelector("app-sidebar");
  let response = "";
  try {
    if (isFollowing) {
      response = await unfollowUser(user);
      const followFeedbacks = Array.from(
        document.querySelectorAll(`.follow-feedback[data-user=${user}`),
      );
      for (const feedback of followFeedbacks) {
        feedback.remove();
      }
    } else {
      response = await followUser(user);
      if (button.id !== "card-button") {
        const span = htmlUtilities.createHTML(
          "span",
          "follow-feedback data-[following='false']:hidden before:h-1 font-accent p-0 gap-3 align-middle flex text-sm text-dark-300",
          "Following",
          { "data-following": !isFollowing, "data-user": user },
        );

        if (button.id !== `search-follow-${user}`) {
          span.classList.add(
            ..."before:w-1 before:rounded-full before:block before:bg-dark-300 before:self-center text-base".split(
              " ",
            ),
          );
        }
        button.parentNode.append(span);
      }
    }

    sidebar.updateFollowing(response.following);

    const profileCard = document.querySelector("profile-card");
    if (profileCard) {
      updateProfileCard(
        profileCard,
        isFollowing,
        response.name,
        response.avatar,
      );
    }
    updateFollowButton(user, isFollowing);
  } catch (error) {
    console.log(error);
    const errorMessage = isFollowing
      ? "Error: Unable to follow user, try again later"
      : "Error: Unable to unfollow user, try again later";

    renderToast(errorMessage, "follow-error", "error");
  }
};
