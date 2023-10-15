import { renderPosts } from "../helper/renderPosts.js";
import { getPopularTags } from "../helper/get-popular-tags.js";
import { requestAll } from "../helper/api/request-all.js";
import { allPosts } from "../helper/api/request-object/all-posts.js";
import { followingPosts } from "../helper/api/request-object/following-posts.js";
import { userById } from "../helper/api/request-object/user-by-id.js";
import { renderUserSuggestions } from "../helper/render-user-suggestions.js";
import { ErrorDialog } from "../components/error/error-dialog.js";
import { sortPopularPosts } from "../helper/sort-popular-posts.js";
import Storage from "../helper/storage/index.js";

const sidebar = document.querySelector("app-sidebar");
const requests = [
  allPosts(),
  followingPosts(),
  userById(Storage.get("username")),
];

const renderFeedPage = async () => {
  try {
    const [allPosts, feedPosts, user] = await requestAll(requests);

    if (allPosts.status === "fulfilled") {
      sidebar.renderTags(getPopularTags(allPosts));
    } else {
      sidebar.querySelector("#tags-section").remove();
    }

    if (user.status === "fulfilled") {
      if (user.value.following.length > 0) {
        sidebar.renderFollowing(user.value.following);
      } else {
        renderUserSuggestions();
      }
    } else {
      renderUserSuggestions();
    }

    if (
      feedPosts.status === "fulfilled" &&
      user.status === "fulfilled" &&
      allPosts.status === "fulfilled"
    ) {
      if (feedPosts.value.length > 0) {
        renderPosts(
          feedPosts.value,
          document.querySelector("#posts-list"),
          user.value,
        );
      } else {
        renderPosts(
          sortPopularPosts(allPosts.value),
          document.querySelector("#posts-list"),
          user.value,
        );
      }
    } else {
      const errorMessage =
        "Sorry, we couldn't load the feed at the moment. Please check your internet connection and try again. If the problem persists, please contact our support team for assistance.";
      const error = new ErrorDialog(errorMessage, "feed-error");
      document.querySelector("main").append(error);
    }
  } catch (error) {
    console.log(error);
  }
};

renderFeedPage();
